import React, { useEffect, useState } from 'react';
import styles from './index.module.less';
import { VPanel } from '@moensun/antd-react-ext';
import GridTable from '@components/grid-table';
import { useRequest } from 'ahooks';
import { systemApi } from '@/apis';
import { Button, DatePicker, Form, Select, Space } from 'antd';
import { TableParams } from '@/constants/types';
import { formatDate, formatDateTime } from '@/commons/util/date.utils';
import { useForm } from 'antd/es/form/Form';
import useQueryAssetsAll from '@/hooks/useQueryAssetsAll';
import { findOptionsLabel } from '@/commons/util/findOptionsLabel';
const MonitorTrends: React.FC = () => {
    const [tableParams, setTableParams] = useState<TableParams>({
        pageSize: 10,
        pageNum: 1,
    });
    const [form] = useForm();
    const { allAssetsOptions } = useQueryAssetsAll();

    /** 请求表格（TODO） */
    const {
        data: tableData,
        loading: tableDataLoading,
        run: fetchTableData,
    } = useRequest(
        (tableParams: TableParams) =>
            systemApi.queryDictionaryTypesPage(tableParams),
        { manual: true }
    );

    const handlePageChange = (pageNum: number, pageSize: number) => {
        setTableParams({ ...tableParams, pageNum, pageSize });
    };
    useEffect(() => {
        fetchTableData(tableParams);
    }, [fetchTableData, tableParams]);
    //TODO:table字段对接
    const columns = [
        {
            title: '日期',
            dataIndex: 'createdAt',
            render: (value: number) => {
                return formatDate(value);
            },
        },
        {
            title: '时间',
            dataIndex: 'createdAt',
            render: (value: number) => {
                return formatDateTime(value);
            },
        },
        {
            title: '监控指标',
            dataIndex: '-',
        },
        {
            title: '设备名称',
            dataIndex: 'assetSn',
            render: (assetSn: string) => {
                return findOptionsLabel(allAssetsOptions, assetSn);
            },
        },
        {
            title: '设备编号',
            dataIndex: '-',
        },
        {
            title: '实时数据',
            dataIndex: '-',
        },
    ];

    return (
        <Form form={form} className={styles.wrapper}>
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
                            <Form.Item name="assetSn" label="生产设备">
                                <Select
                                    options={allAssetsOptions}
                                    style={{ width: 230 }}
                                />
                            </Form.Item>

                            <Form.Item name="--" label="监控指标">
                                <Select style={{ width: 230 }} />
                            </Form.Item>
                            <Form.Item className={styles.buttons}>
                                <Space>
                                    <Button
                                        type="primary"
                                        htmlType="submit"
                                        onClick={() => {
                                            const value =
                                                form.getFieldsValue(true);
                                            const [start, end] = value.date ?? [
                                                undefined,
                                                undefined,
                                            ];
                                            const newValue = {
                                                startTime: start,
                                                endTime: end,
                                                assetSn: value?.assetSn,
                                                //...
                                            };
                                            //TODO:查询
                                        }}
                                    >
                                        查询
                                    </Button>
                                    <Button
                                        htmlType="button"
                                        onClick={() => {
                                            form.resetFields();
                                            //TODO:重置
                                        }}
                                    >
                                        重置
                                    </Button>
                                    <Button
                                        type="primary"
                                        htmlType="submit"
                                        onClick={() => {
                                            //TODO:导出
                                        }}
                                    >
                                        导出
                                    </Button>
                                </Space>
                            </Form.Item>
                        </div>
                        <div className={styles.chartWrapper}>TODO://图表</div>
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
