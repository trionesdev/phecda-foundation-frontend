import React, { useEffect, useMemo, useState } from 'react';
import styles from './index.module.less';
import {
    DrawerForm,
    GridTable,
    PageHeader,
    TableToolbar,
    VPanel,
} from '@trionesdev/antd-react-ext';
import { useRequest } from 'ahooks';
import { systemApi } from '@apis';
import {
    Button,
    Divider,
    Form,
    Input,
    InputNumber,
    Popconfirm,
    Space,
    message,
} from 'antd';

import { useNavigate, useParams } from 'react-router-dom';
import { useGetSearch } from '../../../hooks/useSearch';
import { TableParams } from '../../../constants/types';
import { formatDateTime } from '@commons/util/date.utils';

const Dictionary: React.FC = () => {
    const { id: typeCode } = useParams();
    const { name } = useGetSearch<{ name: string }>();

    const navigate = useNavigate();
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
            systemApi.queryDictionariesPage({
                ...tableParams,
                typeCode,
            }),
        { manual: true }
    );
    const afterSubmitForm = () => {
        setDrawerFormeValue(undefined);
        setDrawerOpen(false);
        message.success('操作成功');
        refreshFetchTableData();
    };
    /** 添加配件 */
    const { run: addDictionary } = useRequest(
        (params) => systemApi.addDictionary(params),
        {
            manual: true,
            onSuccess() {
                afterSubmitForm();
            },
        }
    );
    /** 修改配件 */
    const { run: editDictionary } = useRequest(
        (id, params) => systemApi.editDictionaryById(id, params),
        {
            manual: true,
            onSuccess() {
                afterSubmitForm();
            },
        }
    );
    /** 删除设备 */
    const { run: deleteDictionary } = useRequest(
        (id) => systemApi.deleteDictionaryById(id),
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
            title: '字典排序',
            dataIndex: 'sort',
        },
        {
            title: '字典编号',
            dataIndex: 'code',
        },
        {
            title: '字典名称',
            dataIndex: 'label',
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
            width: 250,
            render: (id: string, record: any) => {
                return (
                    <Space split={<Divider type={`vertical`} />}>
                        <Button
                            key={`add-btn`}
                            size={`small`}
                            type={`link`}
                            onClick={() => {
                                setDrawerFormeValue({
                                    parentCode: record?.code,
                                });
                                setDrawerOpen(true);
                            }}
                        >
                            添加子集
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
                            title={`确定删除 ${record.label}？`}
                            onConfirm={() => deleteDictionary(record?.id)}
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
                <Form.Item name="code" label={`字典编号`}>
                    <Input />
                </Form.Item>
                <Form.Item name="label" label={`字典名称`}>
                    <Input />
                </Form.Item>
            </>
        ),
        []
    );
    const pageHelper = (
        <PageHeader
            title={name}
            onBack={() => {
                navigate(-1);
            }}
        />
    );
    const isEdit = drawerFormeValue?.id;
    // const isAddChildren = drawerFormeValue?.parentCode;

    return (
        <VPanel className={styles.wrapper} header={pageHelper}>
            <GridTable
                style={{ backgroundColor: 'white' }}
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
                                新建字典
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
                title={`${isEdit ? '编辑' : '新建'}字典`}
                afterOpenChange={(op) => setDrawerOpen(op)}
                onSubmit={(value, from) => {
                    const newValue = { ...value, typeCode };
                    isEdit
                        ? editDictionary(drawerFormeValue.id, newValue)
                        : addDictionary(newValue);
                    from?.resetFields();
                }}
                formValues={drawerFormeValue}
                formProps={{ layout: 'vertical' }}
            >
                <Form.Item noStyle dependencies={['parentCode']}>
                    {({ getFieldValue }) => {
                        if (getFieldValue('parentCode')) {
                            return (
                                <Form.Item
                                    name="parentCode"
                                    label="父级Code"
                                    rules={[{ required: true }]}
                                >
                                    <Input disabled />
                                </Form.Item>
                            );
                        }
                    }}
                </Form.Item>

                <Form.Item
                    name="label"
                    label="字典名称"
                    rules={[{ required: true }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="code"
                    label="字典编号"
                    rules={[{ required: true }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="sort"
                    label="字典排序"
                    rules={[{ required: true }]}
                >
                    <InputNumber style={{ width: '100%' }} />
                </Form.Item>
                <Form.Item name="remark" label="备注">
                    <Input.TextArea />
                </Form.Item>
            </DrawerForm>
        </VPanel>
    );
};

export default Dictionary;
