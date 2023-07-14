import React, { useEffect, useMemo, useState } from 'react';
import styles from './index.module.less';
import { VPanel } from '@moensun/antd-react-ext';
import GridTable from '@components/grid-table';
import { useRequest } from 'ahooks';
import { alarmApi } from '@/apis';
import {
    Button,
    DatePicker,
    Divider,
    Form,
    Popconfirm,
    Select,
    Space,
} from 'antd';
import SearchToolbar from '@/components/search-toolbar';
import { TableParams } from '@/constants/types';
import { formatDateTime } from '@/commons/util/date.utils';
import dayjs from 'dayjs';
import AlarmLogOverview from '../compoents/alarm-log-overview';
import { isNilEmpty } from '@/commons/util/isNilEmpty';
import {
    AlarmLevelConfig,
    DealStatusConfig,
    DealStatusOptions,
} from '@/constants/consts';
import { ALARM_LEVEL, DEAL_STATUS } from '@/constants/enums';
import AlarmModal from './AlarmModal';
const AlarmLog: React.FC = () => {
    const [tableParams, setTableParams] = useState<TableParams>({
        pageSize: 10,
        pageNum: 1,
    });
    const [modalOpen, setModalOpen] = useState(false);
    const [currentData, setCurrentData] = useState();

    /** 请求表格 */
    const {
        data: tableData,
        loading: tableDataLoading,
        run: fetchTableData,
        refresh: refreshFetchTableData,
    } = useRequest(
        (tableParams: TableParams) => alarmApi.queryAlarmLogsPage(tableParams),
        { manual: true }
    );

    /** 删除设备 */
    const { run: deleteAlarmLogData } = useRequest(
        (id) => alarmApi.deleteAlarmLogById(id),
        {
            manual: true,
            onSuccess() {
                // afterSubmitForm();
                refreshFetchTableData();
            },
        }
    );
    const handlePageChange = (pageNum: number, pageSize: number) => {
        setTableParams({ ...tableParams, pageNum, pageSize });
    };
    useEffect(() => {
        fetchTableData(tableParams);
    }, [fetchTableData, tableParams]);
    const columns = [
        {
            title: `告警名称`,
            dataIndex: 'title',
        },
        {
            title: `告警等级`,
            dataIndex: 'level',
            render: (level: ALARM_LEVEL) => {
                return AlarmLevelConfig?.[level];
            },
        },
        {
            title: `告警设备`,
            dataIndex: 'deviceName',
        },

        {
            title: '告警时间',
            dataIndex: 'alarmTime',
            render: (value: number) => {
                return formatDateTime(value);
            },
        },

        {
            title: `告警状态`,
            dataIndex: 'dealStatus',
            render: (dealStatus: DEAL_STATUS) => {
                return DealStatusConfig?.[dealStatus];
            },
        },
        {
            title: '操作',
            dataIndex: 'id',
            render: (id: string, record: any) => {
                return (
                    <Space split={<Divider type={`vertical`} />}>
                        <Button
                            size={`small`}
                            type={`link`}
                            onClick={() => {
                                setModalOpen(true);
                                setCurrentData(record);
                            }}
                        >
                            {record.dealStatus === DEAL_STATUS.PENDING
                                ? '处理'
                                : '查看处理结果'}
                        </Button>
                        <Popconfirm
                            title={`确定删除 ${record.title}？`}
                            onConfirm={() => {
                                deleteAlarmLogData(id);
                            }}
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
                <Form.Item name="dealStatus" label={`告警状态`}>
                    <Select
                        options={DealStatusOptions}
                        style={{ width: 230 }}
                    />
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
                                const [start, end] = values?.date ?? [
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
                                    dealStatus: values?.dealStatus,
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
            <AlarmModal
                modalOpen={modalOpen}
                setModalOpen={(op) => {
                    setModalOpen(op);
                }}
                currentData={currentData}
                onSuccess={() => {
                    refreshFetchTableData();
                }}
            />
        </VPanel>
    );
};

export default AlarmLog;
