import React, { useEffect, useState } from 'react';
import styles from './index.module.less';
import { VPanel } from '@moensun/antd-react-ext';
import GridTable from '@components/grid-table';
import { useRequest, useUpdateEffect } from 'ahooks';
import { deviceDataApi } from '@/apis';
import { Button, DatePicker, Empty, Form, Select, Space } from 'antd';
import { TableParams } from '@/constants/types';
import { formatDateTime } from '@/commons/util/date.utils';
import useQueryAssetsAll from '@/hooks/useQueryAssetsAll';
import { findOptionsLabel } from '@/commons/util/findOptionsLabel';
import dayjs from 'dayjs';
import _, { values } from 'lodash';
import { isNilEmpty } from '@/commons/util/isNilEmpty';
import { Area, AreaConfig } from '@ant-design/charts';
import useQueryDeviceRelatedByAsset from '@/hooks/useQueryDeviceRelatedByAsset';
import useQueryDevicePropertiesData from '@/hooks/useQueryDevicePropertiesData';
const MonitorTrends: React.FC = () => {
    const [tableParams, setTableParams] = useState<TableParams>({
        pageSize: 10,
        pageNum: 1,
    });
    const [areaParams, setAreaParams] = useState<any>();
    const [form] = Form.useForm();
    const [assetSn, setAssetSn] = useState<string>();
    const [deviceId, setDeviceId] = useState<string>();
    const { allAssetsOptions } = useQueryAssetsAll();
    const { deviceOptions } = useQueryDeviceRelatedByAsset(assetSn);
    const { devicePropertiesOptions } = useQueryDevicePropertiesData(deviceId);
    const startTime = dayjs().isBefore(dayjs().hour(12))
        ? dayjs().hour(0)
        : dayjs().hour(12);
    const endTime = startTime.add(12, 'hour');

    const {
        data: tableData,
        loading: tableDataLoading,
        run: fetchTableData,
    } = useRequest(
        (tableParams: TableParams) =>
            deviceDataApi.queryDeviceDatasPage(tableParams),
        { manual: true }
    );

    const {
        data: areaData,
        loading: areaDataLoading,
        run: fetchAreaData,
    } = useRequest((param: any) => deviceDataApi.queryDeviceDatasList(param), {
        manual: true,
    });

    const handlePageChange = (pageNum: number, pageSize: number) => {
        setTableParams({ ...tableParams, pageNum, pageSize });
    };

    const handleSearch = () => {
        const value = form.getFieldsValue(true);

        const [start, end] = value.date ?? [undefined, undefined];
        const dataIsEmpty = isNilEmpty(value.date);

        const lineValue = _.assign(value, {
            startTime: dataIsEmpty ? undefined : dayjs(start).valueOf(),
            endTime: dataIsEmpty ? undefined : dayjs(end).valueOf(),
            date: undefined,
        });
        const tableValue = _.assign(lineValue, {
            pageSize: 10,
            pageNum: 1,
        });

        setAreaParams(lineValue);
        setTableParams(tableValue);
    };

    useUpdateEffect(() => {
        fetchTableData(tableParams);
        fetchAreaData(areaParams);
    }, [fetchTableData, tableParams, fetchAreaData, areaParams]);

    const handleAssetChange = (value: string) => {
        setAssetSn(value);
    };

    const handleDeviceChange = (value: string) => {
        setDeviceId(value);
    };

    const areaConfig: AreaConfig = {
        data: areaData,
        xField: 'time',
        yField: 'value',
    };

    const columns = [
        {
            title: '时间',
            dataIndex: 'time',
            render: (value: number) => {
                return formatDateTime(value);
            },
        },
        {
            title: '监控指标',
            dataIndex: 'field',
        },
        {
            title: '设备名称',
            dataIndex: 'assetName',
            render: (text: string, record: any) => {
                return findOptionsLabel(allAssetsOptions, record.assetSn);
            },
        },
        {
            title: '设备编号',
            dataIndex: 'assetSn',
        },
        {
            title: '实时数据',
            dataIndex: 'value',
        },
    ];

    return (
        <Form form={form} className={styles.wrapper}>
            <VPanel
                header={
                    <div className={styles.headerWrapper}>
                        <div className={styles.formWrapper}>
                            <Form.Item
                                name="date"
                                initialValue={[startTime, endTime]}
                            >
                                <DatePicker.RangePicker
                                    showTime
                                    allowClear={false}
                                />
                            </Form.Item>
                            <Form.Item name="assetSn" label="生产设备">
                                <Select
                                    options={allAssetsOptions}
                                    style={{ width: 230 }}
                                    onChange={handleAssetChange}
                                />
                            </Form.Item>

                            <Form.Item name="deviceName" label="设备">
                                <Select
                                    options={deviceOptions}
                                    style={{ width: 230 }}
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
                                        htmlType="submit"
                                        onClick={() => handleSearch()}
                                    >
                                        查询
                                    </Button>
                                    <Button
                                        htmlType="button"
                                        onClick={() => {
                                            form.resetFields();
                                        }}
                                    >
                                        重置
                                    </Button>
                                </Space>
                            </Form.Item>
                        </div>
                        <div className={styles.chartWrapper}>
                            {areaData == undefined ? (
                                <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
                            ) : (
                                <Area {...areaConfig} />
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
