import { GridTable, TableToolbar } from '@trionesdev/antd-react-ext';
import { formatDateTimeSeconds } from '@/commons/util/date.utils';
import { useEffect, useState } from 'react';
import { Button, message, Popconfirm, Space, Tooltip } from 'antd';
import { useRequest } from 'ahooks';
import { messageForwardingApi } from '@apis/tenant';
import { PlusCircleOutlined, ReloadOutlined } from '@ant-design/icons';
import { MessageSinkForm } from './message-sink-form';

export const MessageSinkTab = () => {
    const [rows, setRows] = useState<any>([]);

    const { run: handleQuerySinks, loading: querySinksLoading } = useRequest(
        () => messageForwardingApi.queryMessageSinkList(),
        {
            manual: true,
            onSuccess: (result: any) => {
                setRows(result || []);
            },
        }
    );

    const { run: handleDeleteSinkById } = useRequest(
        (id) => messageForwardingApi.deleteMessageSinkById(id),
        {
            manual: true,
            onSuccess: async () => {
                message.success(`删除成功`);
                handleQuerySinks();
            },
            onError: async (ex) => {
                message.error(ex.message);
            },
        }
    );

    const columns = [
        {
            title: '数据目的名称',
            dataIndex: 'name',
            key: 'name',
            width: 150,
        },
        {
            title: '数据目的描述',
            dataIndex: 'description',
            key: 'description',
        },
        {
            title: '创建时间',
            dataIndex: 'createdAt',
            key: 'createdAt',
            width: 180,
            render: (text: any) => {
                return formatDateTimeSeconds(text);
            },
        },
        {
            title: '操作',
            dataIndex: 'id',
            key: 'id',
            width: 150,
            render: (text: any, record: any) => {
                return (
                    <Space>
                        <MessageSinkForm id={text}>
                            <Button size={`small`} type={`link`}>
                                编辑
                            </Button>
                        </MessageSinkForm>
                        <Popconfirm
                            title={`确定删除数据目的吗？`}
                            onConfirm={() => handleDeleteSinkById(text)}
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
        handleQuerySinks();
    }, []);

    return (
        <>
            <GridTable
                toolbar={
                    <TableToolbar
                        extra={[
                            <MessageSinkForm key={`create-btn`}>
                                <Button
                                    type={`primary`}
                                    icon={<PlusCircleOutlined />}
                                >
                                    创建数据目的
                                </Button>
                            </MessageSinkForm>,
                            <Tooltip key={`refresh-btn`} title={`刷新`}>
                                <Button
                                    icon={<ReloadOutlined />}
                                    onClick={handleQuerySinks}
                                />
                            </Tooltip>,
                        ]}
                    />
                }
                fit={true}
                size={`small`}
                columns={columns}
                dataSource={rows}
                loading={querySinksLoading}
                rowKey={`id`}
                pagination={false}
            />
        </>
    );
};
