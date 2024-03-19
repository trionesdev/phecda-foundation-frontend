import React, { useEffect, useMemo, useState } from 'react';
import styles from './index.module.less';
import { useRequest } from 'ahooks';
import { systemApi } from '@/apis';
import { Button, Divider, Form, Input, Popconfirm, Space, message } from 'antd';
import { TableParams } from '@/constants/types';
import { formatDateTime } from '@/commons/util/date.utils';
import { Link } from 'react-router-dom';
import { RoutesConstants } from '@/router/routes.constants';
import qs from 'qs';
import DrawerForm from '@/components/drawer-form';
import { GridTable, TableToolbar, VPanel } from '@trionesdev/antd-react-ext';

const DictionaryType: React.FC = () => {
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
        (tableParams: TableParams) =>
            systemApi.queryDictionaryTypesPage(tableParams),
        { manual: true }
    );
    const afterSubmitForm = () => {
        setDrawerFormeValue(undefined);
        setDrawerOpen(false);
        message.success('操作成功');
        refreshFetchTableData();
    };
    /** 添加配件 */
    const { run: addDictionaryType } = useRequest(
        (params) => systemApi.addDictionaryType(params),
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
            title: '字典类型编号',
            dataIndex: 'code',
        },
        {
            title: '字典类型名称',
            dataIndex: 'name',
        },

        {
            title: `备注`,
            dataIndex: 'remark',
        },
        {
            title: '创建时间',
            dataIndex: 'createdAt',
            render: (value: number) => {
                return formatDateTime(value);
            },
        },
        {
            title: '更新时间',
            dataIndex: 'updatedAt',
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
                                    pathname: RoutesConstants.DICTIONARY.path(
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
                <Form.Item name="code" label={`字典类型编号`}>
                    <Input />
                </Form.Item>
                <Form.Item name="name" label={`字典类型名称`}>
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
                    <TableToolbar
                        extra={[
                            <Button
                                type="primary"
                                onClick={() => {
                                    setDrawerFormeValue(undefined);
                                    setDrawerOpen(true);
                                }}
                            >
                                新建字典类型
                            </Button>,
                        ]}
                    />
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
                title={`${drawerFormeValue?.id ? '编辑' : '新建'}字典类型`}
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
                    label="字典类型名称"
                    rules={[{ required: true }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="code"
                    label="字典类型编号"
                    rules={[{ required: true }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item name="remark" label="备注">
                    <Input.TextArea />
                </Form.Item>
            </DrawerForm>
        </VPanel>
    );
};

export default DictionaryType;
