import React, { useEffect, useMemo, useState } from 'react';
import styles from './index.module.less';
import { VPanel } from '@moensun/antd-react-ext';
import GridTable from '@components/grid-table';
import { useRequest } from 'ahooks';
import { systemApi } from '@/apis';
import {
    Button,
    DatePicker,
    Divider,
    Form,
    Input,
    Popconfirm,
    Select,
    Space,
} from 'antd';
import SearchToolbar from '@/components/search-toolbar';
import { TableParams } from '@/constants/types';
import { formatDateTime } from '@/commons/util/date.utils';
import dayjs from 'dayjs';
import AlarmLogOverview from '../compoents/alarm-log-overview';
import _ from 'lodash';
import { isNilEmpty } from '@/commons/util/isNilEmpty';
const AlarmLog: React.FC = () => {
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
            title: '序号',
            dataIndex: 'code',
        },

        {
            title: `告警名称`,
            dataIndex: 'name',
        },
        {
            title: `告警等级`,
            dataIndex: 'remark',
        },
        {
            title: `告警设备`,
            dataIndex: 'remark',
        },
        {
            title: `设备编号`,
            dataIndex: 'remark',
        },
        {
            title: '告警时间',
            dataIndex: 'createdAt',
            render: (value: number) => {
                return formatDateTime(value);
            },
        },
        {
            title: `负责岗位`,
            dataIndex: 'remark',
        },
        {
            title: `告警状态`,
            dataIndex: 'remark',
        },
        {
            title: '操作',
            dataIndex: 'id',
            render: (id: string, record: any) => {
                return (
                    <Space split={<Divider type={`vertical`} />}>
                        <Button key={`view-btn`} size={`small`} type={`link`}>
                            处理
                        </Button>
                        <Popconfirm
                            key={`del-btn`}
                            title={`确定删除 ${record.name}？`}
                            onConfirm={() => {}}
                        >
                            <Button size={`small`} type={`link`} danger={true}>
                                删除
                            </Button>
                        </Popconfirm>
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
                <Form.Item name="name" label={`告警状态`}>
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
                toolbar={
                    <>
                        <AlarmLogOverview />
                        <SearchToolbar
                            formItems={tableParamsFormItems}
                            onSearch={(values) => {
                                const [start, end] = values.date ?? [
                                    undefined,
                                    undefined,
                                ];
                                const dataIsEmpty = isNilEmpty(values.date);
                                setTableParams({
                                    pageNum: 1,
                                    pageSize: 10,
                                    beginTime: dataIsEmpty
                                        ? undefined
                                        : dayjs(start).valueOf(),
                                    endTime: dataIsEmpty
                                        ? undefined
                                        : dayjs(end).valueOf(),
                                    // ...v,
                                });
                            }}
                        />
                    </>
                }
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

export default AlarmLog;
