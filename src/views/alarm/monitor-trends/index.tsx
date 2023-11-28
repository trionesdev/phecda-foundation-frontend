import React, { useEffect, useMemo, useState } from 'react';
import styles from './index.module.less';
import { VPanel } from '@moensun/antd-react-ext';
import GridTable from '@components/grid-table';
import { useRequest, useUpdateEffect } from 'ahooks';
import { deviceDataApi } from '@/apis';
import { Button, DatePicker, Empty, Form, Select, Space, Tag } from 'antd';
import { TableParams } from '@/constants/types';
import { formatDateTimeSeconds } from '@/commons/util/date.utils';
import { findOptionsLabel } from '@/commons/util/findOptionsLabel';
import dayjs from 'dayjs';
import _ from 'lodash';
import { isNilEmpty } from '@/commons/util/isNilEmpty';
import { Line, LineConfig } from '@ant-design/charts';
import useQueryDevicePropertiesData from '@/hooks/useOptions/useQueryDevicePropertiesData';
import useQueryProductsList from '@/hooks/useOptions/useQueryProductsList';
import useQueryDeviceByParams from '@/hooks/useOptions/useQueryDeviceByParams';

const MonitorTrends: React.FC = () => {
    const [tableParams, setTableParams] = useState<TableParams>({
        pageSize: 10,
        pageNum: 1,
    });
    const [form] = Form.useForm();
    const [deviceName, setDeviceName] = useState<string>();
    const { deviceData, queryDeviceList } = useQueryDeviceByParams();
    const { productOptions } = useQueryProductsList();
    const [deviceOptions, setDeviceOptions] = useState<any>();
    const { devicePropertiesOptions } =
        useQueryDevicePropertiesData(deviceName);
    const startTime = dayjs().isBefore(
        dayjs().hour(12).set('minute', 0).set('second', 0)
    )
        ? dayjs().hour(0).set('minute', 0).set('second', 0)
        : dayjs().hour(12).set('minute', 0).set('second', 0);
    const endTime = startTime
        .add(11, 'hour')
        .add(59, 'minute')
        .add(59, 'second');

    const {
        data: tableData,
        loading: tableDataLoading,
        run: fetchTableData,
    } = useRequest(
        (tableParams: TableParams) =>
            deviceDataApi.queryDeviceDatasPage(tableParams),
        { manual: true }
    );

    const { data: lineData, run: fetchLineData } = useRequest(
        (param: any) => deviceDataApi.queryDeviceDatasList(param),
        {
            manual: true,
        }
    );

    const handlePageChange = (pageNum: number, pageSize: number) => {
        setTableParams({ ...tableParams, pageNum, pageSize });
    };

    const handleSearch = () => {
        const value = form.getFieldsValue(true);

        const [start, end] = value.date ?? [undefined, undefined];
        const dataIsEmpty = isNilEmpty(value.date);

        const areaValue = {
            startTime: dataIsEmpty ? undefined : dayjs(start).valueOf(),
            endTime: dataIsEmpty ? undefined : dayjs(end).valueOf(),
            ...value,
        };
        _.unset(areaValue, 'date');
        const tableValue = {
            ...areaValue,
            pageSize: 10,
            pageNum: 1,
        };
        fetchLineData(areaValue);
        setTableParams(tableValue);
    };

    useUpdateEffect(() => {
        fetchTableData(tableParams);
    }, [fetchTableData, tableParams]);

    const handleProductChange = (value: string) => {
        queryDeviceList({
            productId: value,
        });
    };

    const handleDeviceChange = (value: string) => {
        setDeviceName(value);
    };

    useEffect(() => {
        const options = deviceData?.map((item: any) => {
            return {
                label: item.remarkName,
                value: item?.name,
                ...item,
            };
        });
        setDeviceOptions(options);
    }, [deviceData]);

    const lineConfig: LineConfig = useMemo(() => {
        return {
            data: lineData,
            xField: 'time',
            yField: 'value',
            xAxis: {
                label: {
                    formatter: (time) => {
                        return formatDateTimeSeconds(Number(time));
                    },
                },
            },
            tooltip: {
                title: (title) => formatDateTimeSeconds(Number(title)),
                fields: ['field', 'value'],
                formatter: (datum) => {
                    return {
                        name: findOptionsLabel(
                            devicePropertiesOptions,
                            datum.field
                        ),
                        value: datum.value,
                    };
                },
            },
        };
    }, [lineData]);

    const columns = [
        {
            title: '时间',
            dataIndex: 'time',
            render: (value: number) => {
                return formatDateTimeSeconds(value);
            },
        },
        {
            title: '监控指标',
            dataIndex: 'field',
            render: (field: string) => {
                return (
                    <Tag key={field}>
                        {findOptionsLabel(devicePropertiesOptions, field)}
                    </Tag>
                );
            },
        },
        {
            title: '实时数据',
            dataIndex: 'value',
        },
    ];

    return (
        <Form
            form={form}
            className={styles.wrapper}
            initialValues={{ date: [startTime, endTime] }}
        >
            <VPanel
                header={
                    <div className={styles.headerWrapper}>
                        <div className={styles.formWrapper}>
                            <Form.Item name="date">
                                <DatePicker.RangePicker
                                    showTime
                                    allowClear={false}
                                />
                            </Form.Item>
                            <Form.Item name="productId" label={`产品`}>
                                <Select
                                    style={{ width: 230 }}
                                    options={productOptions}
                                    onChange={handleProductChange}
                                />
                            </Form.Item>
                            <Form.Item name="deviceName" label={`设备`}>
                                <Select
                                    style={{ width: 230 }}
                                    options={deviceOptions}
                                    onChange={handleDeviceChange}
                                />
                            </Form.Item>

                            <Form.Item name="field" label="监控指标">
                                <Select
                                    options={devicePropertiesOptions}
                                    style={{ width: 230 }}
                                />
                            </Form.Item>
                            <Form.Item className={styles.buttons}>
                                <Space>
                                    <Button
                                        type="primary"
                                        onClick={() => handleSearch()}
                                    >
                                        查询
                                    </Button>
                                    <Button
                                        onClick={() => {
                                            form.resetFields();
                                            form.setFieldValue(
                                                ['date'],
                                                [startTime, endTime]
                                            );
                                        }}
                                    >
                                        重置
                                    </Button>
                                </Space>
                            </Form.Item>
                        </div>
                        <div className={styles.chartWrapper}>
                            {lineData == undefined ? (
                                <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
                            ) : (
                                <Line {...lineConfig} />
                            )}
                        </div>
                    </div>
                }
            >
                <GridTable
                    style={{ padding: '8px', backgroundColor: 'white' }}
                    fit
                    size="small"
                    scroll={{ y: 'max-content' }}
                    rowKey="id"
                    columns={columns}
                    dataSource={tableData?.rows}
                    loading={tableDataLoading}
                    pagination={{
                        ...tableParams,
                        onChange: handlePageChange,
                    }}
                />
            </VPanel>
        </Form>
    );
};

export default MonitorTrends;
