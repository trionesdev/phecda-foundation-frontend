import { Button, Card, Space, Table } from 'antd';
import React, { useEffect, useState } from 'react';
import { useRequest } from 'ahooks';
import { alarmApi } from '@apis';
import _ from 'lodash';
import { formatDateTimeSeconds } from '@commons/util/date.utils';
import { ALARM_STATUS } from '../alarm/internal/alarm.enums';

export const AlarmTable = () => {
    const [rows, setRows] = useState([]);

    const { run: handleQueryAlarmsExt, loading } = useRequest(
        () => {
            let params = { limit: 20 };
            return alarmApi.queryAlarmsExtList(_.assign({}, params));
        },
        {
            onSuccess: (res: any) => {
                if (res) {
                    setRows(res || []);
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

    return (
        <Card size={`small`} title={`告警列表`}>
            <Table
                style={{ backgroundColor: 'white' }}
                size={`small`}
                columns={columns}
                dataSource={rows}
                rowKey={`id`}
                loading={loading}
                scroll={{ y: 400 }}
                pagination={false}
            />
        </Card>
    );
};
