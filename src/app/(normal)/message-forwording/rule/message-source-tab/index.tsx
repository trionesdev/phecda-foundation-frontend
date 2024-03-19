import { FC, useEffect, useState } from 'react';
import { GridTable, TableToolbar } from '@trionesdev/antd-react-ext';
import { Button, message, Popconfirm, Space, Tooltip } from 'antd';
import { useRequest } from 'ahooks';
import { messageForwardingApi } from '@apis';
import { useNavigate } from 'react-router-dom';
import { RoutesConstants } from '@/router/routes.constants';
import { MessageSourceForm } from '@/app/(normal)/message-forwording/rule/message-source-tab/MessageSourceForm';
import { ReloadOutlined } from '@ant-design/icons';

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
                                    RoutesConstants.MESSAGE_SOURCE_DETAIL.path(
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
                            <Button size={`small`} type={`link`}>
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
                    extra={[
                        <MessageSourceForm
                            key={`create-btn`}
                            onRefresh={handleRefreshQuerySources}
                        >
                            <Button type={`primary`}>创建数据源</Button>
                        </MessageSourceForm>,
                        <Tooltip key={`refresh-btn`} title={`刷新`}>
                            <Button
                                icon={<ReloadOutlined />}
                                onClick={handleRefreshQuerySources}
                            />
                        </Tooltip>,
                    ]}
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
