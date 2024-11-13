import { GridTable, TableToolbar } from '@trionesdev/antd-react-ext';
import { useState } from 'react';
import styles from './alarm-types.module.less';
import { Button, message, Popconfirm, Space, Switch } from 'antd';
import { useRequest } from 'ahooks';
import { alarmApi } from '@apis/tenant';
import { PlusCircleOutlined, ReloadOutlined } from '@ant-design/icons';
import { AlarmTypeForm } from './AlarmTypeForm';

export const AlarmTypesPage = () => {
    const [rows, setRows] = useState([]);

    const { run, loading, refreshAsync } = useRequest(
        () => alarmApi.queryAlarmTypes(),
        {
            onSuccess: (data: any) => {
                setRows(data);
            },
        }
    );

    const columns = [
        {
            title: '报警类型',
            dataIndex: 'name',
            width: 200,
        },
        {
            title: '报警类型标识',
            dataIndex: 'identifier',
            width: 200,
        },
        {
            title: '报警类型描述',
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
                                .changeAlarmTypeEnabled(record.id, checked)
                                .then(() => {
                                    run();
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
                        <AlarmTypeForm id={text} onRefresh={refreshAsync}>
                            <Button size={`small`} type={`link`}>
                                编辑
                            </Button>
                        </AlarmTypeForm>
                        <Popconfirm
                            title={`确定删除`}
                            onConfirm={() => {
                                alarmApi
                                    .deleteAlarmTypeById(record.id)
                                    .then(async () => {
                                        message.success(`删除成功`);
                                        await refreshAsync();
                                    })
                                    .catch(async (e) => {
                                        message.error(e.message);
                                    });
                            }}
                        >
                            <Button size={`small`} type={`link`} danger>
                                删除
                            </Button>
                        </Popconfirm>
                    </Space>
                );
            },
        },
    ];
    return (
        <div className={styles.alarmTypes}>
            <GridTable
                fit={true}
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
                                <AlarmTypeForm onRefresh={refreshAsync}>
                                    <Button
                                        type={`primary`}
                                        icon={<PlusCircleOutlined />}
                                    >
                                        新建报警类型
                                    </Button>
                                </AlarmTypeForm>
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
