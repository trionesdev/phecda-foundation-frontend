import { GridTable, Layout, TableToolbar } from '@trionesdev/antd-react-ext';
import { useEffect, useState } from 'react';
import { Button, message, Popconfirm, Space } from 'antd';
import { useRequest } from 'ahooks';
import { notificationApi } from '@apis/tenant';
import { ContactForm } from './ContactForm';
import { PlusCircleOutlined } from '@ant-design/icons';

export const Contacts = () => {
    const [pageNum, setPageNum] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [rows, setRows] = useState([]);
    const [total, setTotal] = useState(0);

    const { run: handleQueryContacts, loading } = useRequest(
        () => {
            const params = {
                pageNum,
                pageSize,
            };
            return notificationApi.findContactsPage(params);
        },
        {
            manual: false,
            onSuccess: (res: any) => {
                if (res) {
                    setRows(res.rows || []);
                    setTotal(res.total || 0);
                }
            },
            onError: async (err: any) => {
                message.error(err.message);
            },
        }
    );

    useEffect(() => {
        handleQueryContacts();
    }, [pageNum, pageSize]);

    const columns = [
        {
            title: '联系人',
            dataIndex: 'name',
            key: 'name',
            width: 200,
        },
        {
            title: '手机',
            dataIndex: 'phone',
            key: 'phone',
            width: 200,
        },
        {
            title: '邮箱',
            dataIndex: 'email',
            key: 'email',
            width: 200,
        },
        {
            title: '备注',
            dataIndex: 'remark',
        },
        {
            title: '操作',
            key: 'id',
            width: 180,
            render: (id: string, record: any) => {
                return (
                    <Space>
                        <ContactForm
                            id={record.id}
                            onRefresh={handleQueryContacts}
                        >
                            <Button size={`small`} type={`link`}>
                                编辑
                            </Button>
                        </ContactForm>
                        <Popconfirm
                            title={`确定删除？`}
                            onConfirm={() => {
                                notificationApi
                                    .deleteContact(id)
                                    .then(async () => {
                                        handleQueryContacts();
                                        message.success(`删除成功`);
                                    })
                                    .catch(async (err) => {
                                        message.error(err.message);
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
        <Layout direction={`vertical`} style={{ padding: 4 }}>
            <Layout.Item auto={true}>
                <GridTable
                    toolbar={
                        <TableToolbar
                            extra={
                                <Space>
                                    <ContactForm
                                        onRefresh={handleQueryContacts}
                                    >
                                        <Button
                                            type={`primary`}
                                            icon={<PlusCircleOutlined />}
                                        >
                                            新建联系人
                                        </Button>
                                    </ContactForm>
                                </Space>
                            }
                        />
                    }
                    size={`small`}
                    fit={true}
                    columns={columns}
                    dataSource={rows}
                    loading={loading}
                    rowKey={`id`}
                />
            </Layout.Item>
        </Layout>
    );
};
