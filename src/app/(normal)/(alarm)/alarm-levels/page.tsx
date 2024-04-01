import { GridTable, TableToolbar } from '@trionesdev/antd-react-ext';
import { useState } from 'react';
import styles from './alarm-levels.module.less';
import { Button, message, Popconfirm, Space, Switch } from 'antd';
import { useRequest } from 'ahooks';
import { alarmApi } from '@apis';
import { ReloadOutlined } from '@ant-design/icons';
import { AlarmLevelForm } from '@/app/(normal)/(alarm)/alarm-levels/AlarmLevelForm';

export const AlarmLevelsPage = () => {
    const [rows, setRows] = useState([]);

    const { run, loading, refreshAsync } = useRequest(
        () => alarmApi.queryAlarmLevels(),
        {
            onSuccess: (data: any) => {
                setRows(data);
            },
        }
    );

    const columns = [
        {
            title: '报警等级',
            dataIndex: 'name',
            width: 200,
        },
        {
            title: '报警等级标识',
            dataIndex: 'identifier',
            width: 200,
        },
        {
            title: '报警级别描述',
            dataIndex: 'description',
        },
        {
            title: '状态',
            dataIndex: 'enabled',
            width: 100,
            render: (text: any, record: any) => {
                return (
                    <Switch
                        checkedChildren="启用"
                        unCheckedChildren="禁用"
                        defaultChecked={text}
                        onChange={(checked: boolean) => {
                            alarmApi
                                .changeAlarmLevelEnabled(record.id, checked)
                                .then(async () => {
                                    run();
                                    message.success(`修改成功`);
                                })
                                .catch();
                        }}
                    />
                );
            },
        },
        {
            title: '操作',
            dataIndex: 'id',
            width: 200,
            render: (text: any, record: any) => {
                return (
                    <Space>
                        <AlarmLevelForm id={text} onRefresh={refreshAsync}>
                            <Button type={`link`}>编辑</Button>
                        </AlarmLevelForm>
                        <Popconfirm
                            title={`确定删除`}
                            onConfirm={() => {
                                alarmApi
                                    .deleteAlarmLevelById(record.id)
                                    .then(async () => {
                                        message.success(`删除成功`);
                                        await refreshAsync();
                                    })
                                    .catch(async (e) => {
                                        message.error(e.message);
                                    });
                            }}
                        >
                            <Button type={`link`} danger>
                                删除
                            </Button>
                        </Popconfirm>
                    </Space>
                );
            },
        },
    ];
    return (
        <div className={styles.alarmLevels}>
            <GridTable
                size={`small`}
                style={{ backgroundColor: 'white' }}
                toolbar={
                    <TableToolbar
                        extra={
                            <Space>
                                <Button
                                    type={`text`}
                                    icon={<ReloadOutlined />}
                                    onClick={refreshAsync}
                                />
                                <AlarmLevelForm onRefresh={refreshAsync}>
                                    <Button type={`primary`}>
                                        新建报警级别
                                    </Button>
                                </AlarmLevelForm>
                            </Space>
                        }
                    />
                }
                dataSource={rows}
                columns={columns}
                loading={loading}
                rowKey={`id`}
                pagination={false}
            />
        </div>
    );
};
