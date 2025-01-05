import { GridTable, TableToolbar } from '@trionesdev/antd-react-ext';
import { Button, message, Popconfirm, Space } from 'antd';
import { useEffect, useState } from 'react';
import styles from './template.module.less';
import { useRequest } from 'ahooks';
import { notificationApi } from '@apis/tenant';
import { TemplateForm } from './TemplateForm';
import { PlusCircleOutlined } from '@ant-design/icons';

export const NotificationTemplatesPage = () => {
    const [pageNum, setPageNum] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [rows, setRows] = useState([]);
    const [total, setTotal] = useState(0);

    const { run: handleQueryPage, loading } = useRequest(
        () => {
            let params = { pageNum, pageSize };
            return notificationApi.findTemplatesPage(params);
        },
        {
            manual: true,
            onSuccess: (res: any) => {
                setRows(res?.rows || []);
                setTotal(res?.total || 0);
            },
            onError: async (err: any) => {
                message.error(err?.message || `请求失败`);
            },
        }
    );

    useEffect(() => {
        handleQueryPage();
    }, [pageNum]);

    const columns = [
        {
            title: '模板名称',
            dataIndex: 'title',
            width: 200,
        },
        {
            title: '备注',
            dataIndex: 'remark',
        },
        {
            title: '操作',
            width: 150,
            render: (text: any, record: any) => {
                return (
                    <Space>
                        <TemplateForm
                            id={record?.id}
                            onRefresh={handleQueryPage}
                        >
                            <Button size={`small`} type={`link`}>
                                编辑
                            </Button>
                        </TemplateForm>
                        <Popconfirm
                            title={`确定删除？`}
                            onConfirm={() => {
                                notificationApi
                                    .deleteTemplate(record?.id)
                                    .then(async () => {
                                        message.success(`删除成功`);
                                        handleQueryPage();
                                    })
                                    .catch(async () => {
                                        message.error(`删除失败`);
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
        <div className={styles.templatesPage}>
            <GridTable
                style={{ backgroundColor: `#fff` }}
                toolbar={
                    <TableToolbar
                        extra={
                            <Space>
                                <TemplateForm onRefresh={handleQueryPage}>
                                    <Button
                                        type={`primary`}
                                        icon={<PlusCircleOutlined />}
                                    >
                                        新建通知模板
                                    </Button>
                                </TemplateForm>
                            </Space>
                        }
                    />
                }
                fit={true}
                size={'small'}
                dataSource={rows}
                columns={columns}
                rowKey={`id`}
                loading={loading}
                pagination={{
                    current: pageNum,
                    pageSize,
                    total,
                    onChange: (page, size) => {
                        setPageNum(page);
                        setPageSize(size);
                    },
                }}
            />
        </div>
    );
};
