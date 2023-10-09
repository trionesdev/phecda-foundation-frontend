import React, { useEffect, useMemo, useState } from 'react';
import styles from './index.module.less';
import { VPanel } from '@moensun/antd-react-ext';
import GridTable from '@components/grid-table';
import { useRequest } from 'ahooks';
import { systemApi } from '@/apis';
import { Button, DatePicker, Divider, Form, Select, Space } from 'antd';
import { TableParams } from '@/constants/types';
import { formatDateTime } from '@/commons/util/date.utils';
import dayjs from 'dayjs';
import { isNilEmpty } from '@/commons/util/isNilEmpty';
const DeviceData: React.FC = () => {
    const [tableParams, setTableParams] = useState<TableParams>({
        pageSize: 10,
        pageNum: 1,
    });

    /** 请求表格 */
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
    const columns = [
        {
            title: '时间',
            dataIndex: 'createdAt',
            render: (value: number) => {
                return formatDateTime(value);
            },
        },
        {
            title: '设备类型',
            dataIndex: 'code',
        },
        {
            title: '数据类型',
            dataIndex: 'code',
        },

        {
            title: '操作',
            dataIndex: 'id',
            render: (id: string, record: any) => {
                return (
                    <Space split={<Divider type={`vertical`} />}>
                        <Button key={`view-btn`} size={`small`} type={`link`}>
                            下载
                        </Button>
                    </Space>
                );
            },
        },
    ];
    const tableParamsFormItems = useMemo(
        () => (
            <>
                <Form.Item name="date">
                    <DatePicker.RangePicker showTime allowClear={false} />
                </Form.Item>
                <Form.Item name="name" label="生产设备类型">
                    <Select style={{ width: 230 }} />
                </Form.Item>
                <Form.Item name="name" label="数据类型">
                    <Select style={{ width: 230 }} />
                </Form.Item>
            </>
        ),
        []
    );
    return (
        <VPanel className={styles.wrapper}>
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
    );
};

export default DeviceData;
