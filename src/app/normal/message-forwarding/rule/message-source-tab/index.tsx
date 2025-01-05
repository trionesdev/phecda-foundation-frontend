import { FC, useEffect, useState } from 'react';
import { GridTable, TableToolbar } from '@trionesdev/antd-react-ext';
import { Button, message, Popconfirm, Space, Tooltip } from 'antd';
import { useRequest } from 'ahooks';
import { messageForwardingApi } from '@apis/tenant';
import { PlusCircleOutlined, ReloadOutlined } from '@ant-design/icons';
import { MessageSourceForm } from './MessageSourceForm';
import {useNavigate} from "@trionesdev/commons-react";
import {RouteConstants} from "@/router/routes.constants.ts";

type MessageSourceTabProps = {};
export const MessageSourceTab: FC<MessageSourceTabProps> = ({}) => {
    const navigate = useNavigate();
    const [rows, setRows] = useState<any>([]);
    const {
        run: handleQuerySources,
        loading,
        refresh: handleRefreshQuerySources,
    } = useRequest(() => messageForwardingApi.querySourcesList(), {
        manual: true,
        onSuccess: (res: any) => {
            setRows(res || []);
        },
    });
    const columns = [
        {
            title: '数据源名称',
            dataIndex: 'name',
            width: 200,
        },
        {
            title: '数据源描述',
            dataIndex: 'description',
        },
        {
            title: '操作',
            dataIndex: 'id',
            width: 180,
            render: (text: string) => {
                return (
                    <Space>
                        <Button
                            size={`small`}
                            type={`link`}
                            onClick={() =>
                                navigate(
                                    RouteConstants.MESSAGE_FORWARDING.MESSAGE_SOURCE_DETAIL.path(
                                        text
                                    )
                                )
                            }
                        >
                            查看
                        </Button>
                        <Popconfirm
                            title={`确定删除该数据源吗？`}
                            onConfirm={() => {
                                messageForwardingApi
                                    .deleteSourceById(text)
                                    .then(async () => {
                                        message.success('删除成功');
                                        handleRefreshQuerySources();
                                    })
                                    .catch(async (ex) => {
                                        message.error(ex.message);
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

    useEffect(() => {
        handleQuerySources();
    }, []);

    return (
        <GridTable
            toolbar={
                <TableToolbar
                    extra={
                        <Space>
                            <MessageSourceForm
                                key={`create-btn`}
                                onRefresh={handleRefreshQuerySources}
                            >
                                <Button
                                    type={`primary`}
                                    icon={<PlusCircleOutlined />}
                                >
                                    创建数据源
                                </Button>
                            </MessageSourceForm>
                            <Tooltip key={`refresh-btn`} title={`刷新`}>
                                <Button
                                    icon={<ReloadOutlined />}
                                    onClick={handleRefreshQuerySources}
                                />
                            </Tooltip>
                        </Space>
                    }
                />
            }
            fit={true}
            size={`small`}
            columns={columns}
            dataSource={rows}
            loading={loading}
            rowKey={`id`}
            pagination={false}
        />
    );
};
