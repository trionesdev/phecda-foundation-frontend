import { GridTable, TableToolbar } from '@trionesdev/antd-react-ext';
import { useEffect, useState } from 'react';
import { ForwardingRuleForm } from '@/app/(normal)/message-forwording/rule/forwarding-rule-tab/ForwardingRuleForm';
import { Button, Divider, message, Popconfirm, Space, Tooltip } from 'antd';
import { ReloadOutlined } from '@ant-design/icons';
import { useRequest } from 'ahooks';
import { messageForwardingApi } from '@apis';
import { useNavigate } from 'react-router-dom';
import { RoutesConstants } from '@/router/routes.constants';
import styles from '../messag-forwarding-rule.module.less';
import classNames from 'classnames';

export const ForwardingRuleTab = () => {
    const navigate = useNavigate();
    const [rows, setRows] = useState([]);

    const {
        run: handleQueryRules,
        refresh: handleRefreshRules,
        loading: rulesLoading,
    } = useRequest(() => messageForwardingApi.queryForwardingRuleList(), {
        manual: true,
        onSuccess: (result: any) => {
            setRows(result || []);
        },
    });

    const handleEnableRule = (id: string) => {
        messageForwardingApi
            .enableForwardingRuleById(id)
            .then(async () => {
                message.success('启用成功');
                handleRefreshRules();
            })
            .catch(async (ex) => {
                message.error(ex.message);
            });
    };

    const handleDisableRule = (id: string) => {
        messageForwardingApi
            .disableForwardingRuleById(id)
            .then(async () => {
                message.success('禁用成功');
                handleRefreshRules();
            })
            .catch(async (ex) => {
                message.error(ex.message);
            });
    };

    const columns = [
        {
            title: '规则名称',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: '规则描述',
            dataIndex: 'description',
            key: 'description',
        },
        {
            title: '状态',
            dataIndex: 'enabled',
            width: 100,
            key: 'enabled',
            render: (text: any, record: any) => {
                return (
                    <div className={`out-point`}>
                        <span
                            className={classNames({ enabled: record?.enabled })}
                        />{' '}
                        {record.enabled ? '启用' : '未启用'}{' '}
                    </div>
                );
            },
        },
        {
            title: '操作',
            dataIndex: 'id',
            key: 'id',
            width: 250,
            render: (text: any, record: any) => {
                return (
                    <Space>
                        <Button
                            size={`small`}
                            type={`link`}
                            onClick={() =>
                                navigate(
                                    RoutesConstants.MESSAGE_FORWARDING_RULE_DETAIL.path(
                                        text
                                    )
                                )
                            }
                        >
                            查看
                        </Button>
                        <Divider type="vertical" />
                        {record?.enabled ? (
                            <Popconfirm
                                title={`确定禁用规则 ${record.name} 吗？`}
                                onConfirm={() => handleDisableRule(text)}
                            >
                                <Button size={`small`} type={`link`}>
                                    禁用
                                </Button>
                            </Popconfirm>
                        ) : (
                            <Popconfirm
                                title={`确定启动规则 ${record.name} 吗？`}
                                onConfirm={() => handleEnableRule(text)}
                            >
                                <Button size={`small`} type={`link`}>
                                    启用
                                </Button>
                            </Popconfirm>
                        )}
                        {!record?.enabled && (
                            <>
                                <Divider type="vertical" />
                                <Popconfirm title={`确定删除该规则吗?`}>
                                    <Button size={`small`} type={`link`}>
                                        删除
                                    </Button>
                                </Popconfirm>
                            </>
                        )}
                    </Space>
                );
            },
        },
    ];

    useEffect(() => {
        handleQueryRules();
    }, []);

    return (
        <>
            <GridTable
                rootClassName={styles.rulesPageRule}
                toolbar={
                    <TableToolbar
                        extra={[
                            <ForwardingRuleForm
                                key={`create-btn`}
                                onRefresh={handleQueryRules}
                            >
                                <Button type={`primary`}>创建流转规则</Button>
                            </ForwardingRuleForm>,
                            <Tooltip key={`reload-btn`} title={`刷新`}>
                                <Button
                                    icon={<ReloadOutlined />}
                                    onClick={handleRefreshRules}
                                />
                            </Tooltip>,
                        ]}
                    />
                }
                fit={true}
                size={`small`}
                columns={columns}
                dataSource={rows}
                rowKey={`id`}
                loading={rulesLoading}
                pagination={false}
            />
        </>
    );
};
