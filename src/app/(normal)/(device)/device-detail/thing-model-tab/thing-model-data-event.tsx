import React, { useEffect, useMemo, useState } from 'react';
import { GridTable, VPanel } from '@trionesdev/antd-react-ext';
import { useRequest } from 'ahooks';
import { loggingApi } from '@apis';
import { DatePicker, Form, Select } from 'antd';
import { TableParams } from '@/constants/types';
import { formatDateTime } from '@/commons/util/date.utils';
import dayjs from 'dayjs';
import { eventTypeConfig } from '@/constants/consts';

const ThingModelDataEvent: React.FC<{
    deviceData: Record<string, any>;
}> = ({ deviceData }) => {
    const initDateValue = [dayjs().add(-1, 'h'), dayjs()];
    const [tableParams, setTableParams] = useState<TableParams>({
        pageSize: 10,
        pageNum: 1,
        startTime: dayjs(initDateValue[0]).valueOf(),
        endTime: dayjs(initDateValue[1]).valueOf(),
    });

    /** 请求表格 */
    const {
        data: tableData,
        loading: tableDataLoading,
        run: fetchTableData,
    } = useRequest(
        (tableParams: TableParams) =>
            loggingApi.queryDevicesEventLogPage(tableParams),
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
        <VPanel>
            <GridTable
                style={{ padding: '8px', backgroundColor: 'white' }}
                toolbar={
                    <>
                        {/*<SearchToolbar*/}
                        {/*    formItems={tableParamsFormItems}*/}
                        {/*    onSearch={(values) => {*/}
                        {/*        const [start, end] = values.date ?? [*/}
                        {/*            undefined,*/}
                        {/*            undefined,*/}
                        {/*        ];*/}
                        {/*        const dataIsEmpty = isNilEmpty(values.date);*/}
                        {/*        setTableParams({*/}
                        {/*            pageNum: 1,*/}
                        {/*            pageSize: 10,*/}
                        {/*            startTime: dataIsEmpty*/}
                        {/*                ? undefined*/}
                        {/*                : dayjs(start).valueOf(),*/}
                        {/*            endTime: dataIsEmpty*/}
                        {/*                ? undefined*/}
                        {/*                : dayjs(end).valueOf(),*/}
                        {/*            eventType: values?.eventType,*/}
                        {/*            // ...v,*/}
                        {/*        });*/}
                        {/*    }}*/}
                        {/*/>*/}
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

export default ThingModelDataEvent;
