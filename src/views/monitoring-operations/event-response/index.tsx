import React, { useEffect, useMemo, useState } from 'react';
import styles from './index.module.less';
import { DrawerForm, VPanel } from '@moensun/antd-react-ext';
import GridTable from '@components/grid-table';
import { useRequest } from 'ahooks';
import { operationApi, systemApi } from '@/apis';
import { Button, Divider, Form, Input, Popconfirm, Space, message } from 'antd';
import SearchToolbar from '@/components/search-toolbar';
import { TableParams } from '@/constants/types';
import { formatDateTime } from '@/commons/util/date.utils';
import { Link } from 'react-router-dom';
import { RoutesConstants } from '@/router/routes.constants';
import qs from 'qs';
//TODO:接口暂无
const EventResponse: React.FC = () => {
    const [tableParams, setTableParams] = useState<TableParams>({
        pageSize: 10,
        pageNum: 1,
    });
    const [drawerOpen, setDrawerOpen] = useState(false);

    const [drawerFormeValue, setDrawerFormeValue] = useState<
        Record<string, any> | undefined
    >({});
    /** 请求表格 */
    const {
        data: tableData,
        loading: tableDataLoading,
        run: fetchTableData,
        refresh: refreshFetchTableData,
    } = useRequest(
        (tableParams: TableParams) => operationApi.queryScenesPage(tableParams),
        { manual: true }
    );
    const afterSubmitForm = () => {
        setDrawerFormeValue(undefined);
        setDrawerOpen(false);
        message.success('操作成功');
        refreshFetchTableData();
    };
    /** 新建场景 */
    const { run: addDictionaryType } = useRequest(
        (params) => operationApi.addScenes(params),
        {
            manual: true,
            onSuccess() {
                afterSubmitForm();
            },
        }
    );
    /** 修改配件 */
    const { run: editDictionaryType } = useRequest(
        (id, params) => systemApi.editDictionaryTypeById(id, params),
        {
            manual: true,
            onSuccess() {
                afterSubmitForm();
            },
        }
    );
    /** 删除设备 */
    const { run: deleteDictionaryType } = useRequest(
        (id) => systemApi.deleteDictionaryTypeById(id),
        {
            manual: true,
            onSuccess() {
                afterSubmitForm();
            },
        }
    );
    const handlePageChange = (pageNum: number, pageSize: number) => {
        setTableParams({ ...tableParams, pageNum, pageSize });
    };
    useEffect(() => {
        fetchTableData(tableParams);
    }, [fetchTableData, tableParams]);
    const columns = [
        {
            title: '场景名称',
            dataIndex: 'name',
        },

        {
            title: `场景描述`,
            dataIndex: 'description',
        },
        {
            title: '创建时间',
            dataIndex: 'createdAt',
            render: (value: number) => {
                return formatDateTime(value);
            },
        },
        {
            title: '运行状态',
            dataIndex: 'status',
            render: (value: number) => {
                return formatDateTime(value);
            },
        },
        {
            title: '操作',
            dataIndex: 'id',
            width: 225,
            render: (id: string, record: any) => {
                return (
                    <Space split={<Divider type={`vertical`} />}>
                        <Button key={`view-btn`} size={`small`} type={`link`}>
                            <Link
                                to={{
                                    pathname: RoutesConstants.SCENE_DETAIL.path(
                                        record?.code
                                    ),
                                    search: qs.stringify({
                                        name: record?.name,
                                    }),
                                }}
                            >
                                查看
                            </Link>
                        </Button>
                        <Button
                            key={`edit-btn`}
                            size={`small`}
                            type={`link`}
                            onClick={() => {
                                setDrawerFormeValue({ ...record });
                                setDrawerOpen(true);
                            }}
                        >
                            编辑
                        </Button>
                        <Popconfirm
                            key={`del-btn`}
                            title={`确定删除 ${record.name}？`}
                            onConfirm={() => deleteDictionaryType(record?.id)}
                        >
                            <Button size={`small`} type={`link`} danger={true}>
                                删除
                            </Button>
                        </Popconfirm>
                    </Space>
                );
            },
        },
    ];
    const tableParamsFormItems = useMemo(
        () => (
            <>
                <Form.Item name="name" label={`场景名称`}>
                    <Input />
                </Form.Item>
            </>
        ),
        []
    );
    return (
        <VPanel className={styles.wrapper}>
            <GridTable
                style={{ padding: '8px', backgroundColor: 'white' }}
                toolbar={
                    <>
                        <SearchToolbar
                            formItems={tableParamsFormItems}
                            onSearch={(v) => {
                                setTableParams({
                                    pageNum: 1,
                                    pageSize: 10,
                                    ...v,
                                });
                            }}
                            addButtons={
                                <Button
                                    type="primary"
                                    onClick={() => {
                                        setDrawerFormeValue(undefined);
                                        setDrawerOpen(true);
                                    }}
                                >
                                    新建场景
                                </Button>
                            }
                        />
                    </>
                }
                fit
                size="small"
                scroll={{ y: 'max-content' }}
                rowKey="id"
                columns={columns}
                dataSource={tableData?.rows}
                loading={tableDataLoading}
                pagination={{
                    ...tableParams,
                    onChange: handlePageChange,
                }}
            />

            <DrawerForm
                open={drawerOpen}
                title={`${drawerFormeValue?.id ? '编辑' : '新建'}场景`}
                layout="vertical"
                onOpenChange={(op) => setDrawerOpen(op)}
                onSubmit={(value, from) => {
                    drawerFormeValue?.id
                        ? editDictionaryType(drawerFormeValue.id, value)
                        : addDictionaryType(value);
                    from?.resetFields();
                }}
                formValues={drawerFormeValue}
            >
                <Form.Item
                    name="name"
                    label="场景名称"
                    rules={[{ required: true }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item name="description" label="场景描述">
                    <Input.TextArea />
                </Form.Item>
            </DrawerForm>
        </VPanel>
    );
};

export default EventResponse;
