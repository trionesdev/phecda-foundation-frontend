import React, { useEffect, useMemo, useState } from 'react';
import { GridTable, SearchToolbar, VPanel } from '@trionesdev/antd-react-ext';
import { useRequest } from 'ahooks';
import { deviceDataApi } from '@apis';
import { DatePicker, Form, Select } from 'antd';
import { formatDateTime } from '@/commons/util/date.utils';
import dayjs from 'dayjs';
import { eventTypeConfig } from '@/constants/consts';
import { ThingModelEventSelect } from './ThingModelEventSelect';

const ThingModelDataEvent: React.FC<{
    deviceData: Record<string, any>;
}> = ({ deviceData }) => {
    const initDateValue = [dayjs().add(-1, 'h'), dayjs()];
    const [params, setParams] = useState<{
        pageNum: number;
        pageSize: number;
        [key: string]: any;
    }>({
        pageSize: 10,
        pageNum: 1,
        startTime: dayjs(initDateValue[0]).valueOf(),
        endTime: dayjs(initDateValue[1]).valueOf(),
    });
    const [rows, setRows] = useState<any>([]);
    const [total, setTotal] = useState<number>(0);

    /** 请求表格 */
    const { loading: tableDataLoading, run: fetchEventLogs } = useRequest(
        () => {
            return deviceDataApi
                .queryEventLogsPage(params)
                .then((res: any) => res);
        },
        {
            manual: true,
            onSuccess: (res: any) => {
                setRows(res?.rows);
                setTotal(res?.total);
            },
        }
    );

    const handlePageChange = (pageNum: number, pageSize: number) => {
        setParams({ ...params, pageNum, pageSize });
    };
    useEffect(() => {
        fetchEventLogs();
    }, [params]);
    const columns = [
        {
            title: '时间',
            dataIndex: 'createdAt',
            render: (value: number) => {
                return formatDateTime(value);
            },
        },
        {
            title: '标识符',
            dataIndex: 'eventIdentifier',
        },
        {
            title: '事件名称',
            dataIndex: 'eventName',
        },
        {
            title: '事件类型',
            dataIndex: 'eventType',
            render: (eventType: keyof typeof eventTypeConfig) => {
                return eventTypeConfig?.[eventType];
            },
        },
        {
            title: '输出参数',
            dataIndex: 'outputData',
            render: (outputData: Record<string, any>) => {
                return JSON.stringify(outputData);
            },
        },
    ];
    const tableParamsFormItems = useMemo(
        () => (
            <>
                <Form.Item name="date" initialValue={initDateValue}>
                    <DatePicker.RangePicker showTime allowClear={false} />
                </Form.Item>
                <Form.Item name="eventType" label="事件类型">
                    <Select
                        options={[
                            {
                                label: '信息',
                                value: 'INFO',
                            },
                            {
                                label: '告警',
                                value: 'WARN',
                            },
                            {
                                label: '故障',
                                value: 'ERROR',
                            },
                        ]}
                        allowClear
                        style={{ width: 230 }}
                    />
                </Form.Item>
            </>
        ),
        // eslint-disable-next-line react-hooks/exhaustive-deps
        []
    );
    return (
        <GridTable
            style={{ padding: '8px', backgroundColor: 'white' }}
            toolbar={
                <SearchToolbar
                    items={[
                        {
                            label: '事件',
                            name: 'eventIdentifier',
                            children: (
                                <ThingModelEventSelect
                                    productId={deviceData?.productId}
                                />
                            ),
                        },
                    ]}
                />
            }
            fit
            size="small"
            scroll={{ y: 'max-content' }}
            rowKey="id"
            columns={columns}
            dataSource={rows}
            loading={tableDataLoading}
            pagination={{
                current: params?.pageNum,
                pageSize: params?.pageSize,
                total,
                onChange: handlePageChange,
            }}
        />
    );
};

export default ThingModelDataEvent;
