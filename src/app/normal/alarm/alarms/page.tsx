import { GridTable, Layout } from '@trionesdev/antd-react-ext';
import React, { useEffect, useState } from 'react';
import { useRequest } from 'ahooks';
import { alarmApi } from '@apis/tenant';
import styles from './alarms.module.less';
import { dateParse, formatDateTimeSeconds } from '@/commons/util/date.utils';
import { Button, DatePicker, Input, Select, Space } from 'antd';
import SearchToolbar from '@components/search-toolbar/index';
import _ from 'lodash';
import { ALARM_STATUS } from '@/app/normal/alarm/internal/alarm.enums';
import { AlarmStatusOptions } from '@/app/normal/alarm/internal/alarm.constants';
import { AlarmTypeSelect } from '@/app/normal/alarm/alarms/AlarmTypeSelect';
import { AlarmLevelSelect } from '@/app/normal/alarm/alarms/AlarmLevelSelect';

export const AlarmsPage = () => {
    const [pageNum, setPageNum] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [searchParams, setSearchParams] = useState({});
    const [rows, setRows] = useState([]);
    const [total, setTotal] = useState(0);

    const { run: handleQueryAlarmsExtPage, loading } = useRequest(
        () => {
            let params = { pageNum, pageSize };
            return alarmApi.queryAlarmsExtPage(_.assign(params, searchParams));
        },
        {
            manual: true,
            onSuccess: (res: any) => {
                if (res) {
                    setRows(res.rows || []);
                    setTotal(res.total || 0);
                }
            },
        }
    );

    const columns = [
        {
            title: '时间',
            dataIndex: 'createdAt',
            width: 180,
            render: (text: any) => {
                return formatDateTimeSeconds(text);
            },
        },
        {
            title: '告警类型',
            dataIndex: 'typeLabel',
            width: 120,
        },
        {
            title: '告警级别',
            dataIndex: 'levelLabel',
            width: 120,
        },
        {
            title: '产品',
            dataIndex: 'productName',
            width: 120,
        },
        {
            title: 'deviceName',
            dataIndex: 'deviceName',
            width: 200,
        },
        {
            title: '告警值',
            dataIndex: 'eventData',
            width: 150,
            render: (text: any) => {
                return (
                    <Space direction={`vertical`}>
                        {text?.map((item?: any) => {
                            return (
                                <div key={item?.identifier}>
                                    {item?.label} : {item?.value}
                                </div>
                            );
                        })}
                    </Space>
                );
            },
        },
        {
            title: '描述',
            dataIndex: 'description',
        },
        {
            title: '状态',
            dataIndex: 'status',
            width: 120,
            render: (text: any) => {
                switch (text) {
                    case ALARM_STATUS.UN_PROCESSED:
                        return <span style={{ color: 'red' }}>未处理</span>;
                    case ALARM_STATUS.MISREPORT:
                        return <span>误报</span>;
                    case ALARM_STATUS.PROCESSED:
                        return <span style={{ color: 'green' }}>已处理</span>;
                    default:
                        return '';
                }
            },
        },
        {
            title: '操作',
            width: 120,
            render: (text: any, record: any) => {
                if (record.status === ALARM_STATUS.UN_PROCESSED) {
                    return (
                        <Button size={`small`} type={`link`}>
                            处理
                        </Button>
                    );
                } else {
                    return null;
                }
            },
        },
    ];

    useEffect(() => {
        handleQueryAlarmsExtPage();
    }, [pageNum, pageSize]);

    return (
        <Layout direction={`vertical`} className={styles.alarmsPage}>
            <Layout.Item style={{ backgroundColor: 'white' }}>
                <SearchToolbar
                    labelCol={{ span: 8, offset: 0 }}
                    items={[
                        {
                            label: '状态',
                            name: 'status',
                            children: (
                                <Select
                                    allowClear
                                    options={AlarmStatusOptions}
                                />
                            ),
                        },
                        {
                            label: '告警类型',
                            name: 'type',
                            children: <AlarmTypeSelect allowClear />,
                        },
                        {
                            label: '告警级别',
                            name: 'level',
                            children: <AlarmLevelSelect allowClear />,
                        },
                        {
                            label: '产品KEY',
                            name: 'productKey',
                            children: <Input allowClear />,
                        },
                        {
                            label: 'deviceName',
                            name: 'deviceName',
                            children: <Input allowClear />,
                        },
                        {
                            label: '开始时间',
                            name: 'startTime',
                            children: (
                                <DatePicker
                                    style={{ width: '100%' }}
                                    showTime
                                    allowClear
                                />
                            ),
                        },
                        {
                            label: '结束时间',
                            name: 'endTime',
                            children: (
                                <DatePicker
                                    style={{ width: '100%' }}
                                    showTime
                                    allowClear
                                />
                            ),
                        },
                    ]}
                    onSearchParamsChange={(values: any) => {
                        setSearchParams({
                            ...values,
                            startTime: dateParse(values.startTime),
                            endTime: dateParse(values.endTime),
                        });
                    }}
                    onSearch={(values: any) => {
                        handleQueryAlarmsExtPage();
                    }}
                    onReset={() => {
                        setSearchParams({});
                    }}
                />
            </Layout.Item>
            <Layout.Item auto={true}>
                <GridTable
                    style={{ backgroundColor: 'white' }}
                    fit={true}
                    size={`small`}
                    columns={columns}
                    dataSource={rows}
                    rowKey={`id`}
                    loading={loading}
                    pagination={{
                        total,
                        onChange: (pageNum, pageSize) => {
                            setPageNum(pageNum);
                            setPageSize(pageSize);
                        },
                    }}
                />
            </Layout.Item>
        </Layout>
    );
};
