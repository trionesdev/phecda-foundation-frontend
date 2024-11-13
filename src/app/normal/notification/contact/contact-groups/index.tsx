import { useEffect, useState } from 'react';
import { GridTable, TableToolbar } from '@trionesdev/antd-react-ext';
import { Button, message, Popconfirm, Space } from 'antd';
import { useRequest } from 'ahooks';
import { notificationApi } from '@apis/tenant';
import { ContactGroupForm } from './ContactGroupForm';
import { PlusCircleOutlined } from '@ant-design/icons';

export const ContactGroups = () => {
    const [pageNum, setPageNum] = useState(1);
    const [rows, setRows] = useState([]);
    const [total, setTotal] = useState(0);

    const { run: handleQueryGroups, loading } = useRequest(
        () => {
            let params = {
                pageNum,
                pageSize: 10,
            };
            return notificationApi.findContactGroupsPage(params);
        },
        {
            manual: true,
            onSuccess: (res: any) => {
                if (res) {
                    setRows(res.rows);
                    setTotal(res.total);
                }
            },
        }
    );

    useEffect(() => {
        handleQueryGroups();
    }, [pageNum]);

    const columns = [
        {
            title: '联系人组',
            dataIndex: 'name',
            key: 'name',
            width: 200,
        },
        {
            title: `描述`,
            dataIndex: 'description',
        },
        {
            title: `操作`,
            width: 180,
            render: (text: any, record: any) => {
                return (
                    <Space>
                        <ContactGroupForm
                            id={record.id}
                            onRefresh={handleQueryGroups}
                        >
                            <Button size={`small`} type={`link`}>
                                编辑
                            </Button>
                        </ContactGroupForm>
                        <Popconfirm
                            title={`确定删除？`}
                            onConfirm={() => {
                                notificationApi
                                    .deleteContactGroup(record.id)
                                    .then(async () => {
                                        handleQueryGroups();
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
        <>
            <GridTable
                toolbar={
                    <TableToolbar
                        extra={
                            <Space>
                                <ContactGroupForm onRefresh={handleQueryGroups}>
                                    <Button
                                        type={`primary`}
                                        icon={<PlusCircleOutlined />}
                                    >
                                        新建联系人组
                                    </Button>
                                </ContactGroupForm>
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
                pagination={{
                    current: pageNum,
                    pageSize: 10,
                    total,
                    onChange: (pageNum: number) => {
                        setPageNum(pageNum);
                    },
                }}
            />
        </>
    );
};
