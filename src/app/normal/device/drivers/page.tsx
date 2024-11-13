import { useEffect, useState } from 'react';
import { PageResult } from '@apis/types';
import { GridTable, Layout, TableToolbar } from '@trionesdev/antd-react-ext';
import { PlusCircleOutlined } from '@ant-design/icons';
import { Button, message, Popconfirm, Space } from 'antd';
import { useRequest } from 'ahooks';
import { driverApi } from '@apis/tenant';
import { DriverForm } from './DriverForm';

export const DriversPage = () => {
    const [pageParams, setPageParams] = useState({ pageNum: 1, pageSize: 10 });
    const [pageResult, setPageResult] = useState<PageResult<any>>({
        rows: [],
        total: 0,
    });

    const {
        run: handleQueryPage,
        loading,
        refresh: handlerRefresh,
    } = useRequest(
        () => {
            let params = { ...pageParams };
            return driverApi.queryDriversPage(params);
        },
        {
            manual: true,
            onSuccess: (res: any) => {
                setPageResult(res);
            },
        }
    );

    useEffect(() => {
        handleQueryPage();
    }, [pageParams]);

    const columns: any[] = [
        {
            title: '驱动名称',
            dataIndex: 'name',
            width: 200,
        },
        {
            title: '驱动描述',
            dataIndex: 'description',
        },
        {
            title: '操作',
            dataIndex: 'action',
            width: 120,
            render: (text: any, record: any) => {
                return (
                    <Space>
                        <DriverForm id={record?.id} onRefresh={handleQueryPage}>
                            <Button type={`link`} size={`small`}>
                                编辑
                            </Button>
                        </DriverForm>
                        <Popconfirm
                            title={`确定删除该驱动？`}
                            onConfirm={() => {
                                driverApi
                                    .deleteDriverById(record?.id)
                                    .then(async () => {
                                        handlerRefresh();
                                        message.success(`删除成功`);
                                    })
                                    .catch(async (ex) => {
                                        message.error(ex.message);
                                    });
                            }}
                        >
                            <Button type={`link`} size={`small`} danger={true}>
                                删除
                            </Button>
                        </Popconfirm>
                    </Space>
                );
            },
        },
    ];
    return (
        <Layout>
            <Layout.Item auto={true} style={{ backgroundColor: 'white' }}>
                <GridTable
                    toolbar={
                        <TableToolbar
                            extra={
                                <Space>
                                    <DriverForm onRefresh={handleQueryPage}>
                                        <Button
                                            type={'primary'}
                                            icon={<PlusCircleOutlined />}
                                        >
                                            新建设备驱动
                                        </Button>
                                    </DriverForm>
                                </Space>
                            }
                        />
                    }
                    fit={true}
                    size={'small'}
                    columns={columns}
                    dataSource={pageResult?.rows}
                    rowKey={`id`}
                    loading={loading}
                    pagination={{
                        current: pageParams.pageNum,
                        total: pageResult.total,
                        pageSize: pageParams.pageSize,
                        onChange: (page, pageSize) => {
                            setPageParams({
                                pageNum: page,
                                pageSize: pageSize,
                            });
                        },
                    }}
                />
            </Layout.Item>
        </Layout>
    );
};
