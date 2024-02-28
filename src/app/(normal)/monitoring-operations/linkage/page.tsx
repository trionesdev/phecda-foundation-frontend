import React, { useEffect, useMemo, useState } from 'react';
import styles from './index.module.less';
import {
    GridTable,
    Layout,
    ModalForm,
    TableToolbar,
    VPanel,
} from '@trionesdev/antd-react-ext';
import { useRequest } from 'ahooks';
import { operationApi } from '@apis';
import {
    Button,
    Divider,
    Form,
    Input,
    Popconfirm,
    Space,
    Switch,
    message,
} from 'antd';
import { TableParams } from '@/constants/types';
import { formatDateTime } from '@/commons/util/date.utils';
import { Link } from 'react-router-dom';
import { RoutesConstants } from '@/router/routes.constants';
import qs from 'qs';
import { SearchToolbar } from '@components';

const { TextArea } = Input;
export const LinkagePage: React.FC = () => {
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
    /** 修改场景 */
    const { run: editScenes } = useRequest(
        (id, params) => operationApi.editScenesById(id, params),
        {
            manual: true,
            onSuccess() {
                afterSubmitForm();
            },
        }
    );
    /** 修改场景状态 */
    const { run: editScenesStatus } = useRequest(
        (id, params) => operationApi.editScenesStatusById(id, params),
        {
            manual: true,
            onSuccess() {
                afterSubmitForm();
            },
        }
    );
    /** 删除场景 */
    const { run: deleteDictionaryType } = useRequest(
        (id) => operationApi.deleteScenesById(id),
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
            title: `启用/禁用`,
            dataIndex: 'enabled',
            width: 100,
            render: (text: boolean, record: any) => {
                return (
                    <Switch
                        defaultChecked={text}
                        onChange={(checked) =>
                            editScenesStatus(record.id, checked)
                        }
                    />
                );
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
                                        record?.id
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
        <Layout direction={`vertical`} className={styles.wrapper}>
            <Layout.Item style={{ backgroundColor: 'white' }}>
                <SearchToolbar
                    items={[
                        {
                            label: '场景名称',
                            name: 'name',
                            children: <Input />,
                        },
                    ]}
                />
            </Layout.Item>
            <Layout.Item auto={true}>
                <GridTable
                    style={{ padding: '8px', backgroundColor: 'white' }}
                    toolbar={
                        <TableToolbar
                            extra={[
                                <Button
                                    key={`new-scene-btn`}
                                    type="primary"
                                    onClick={() => {
                                        // setDrawerFormeValue(undefined);
                                        setDrawerOpen(true);
                                    }}
                                >
                                    新建场景
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
                <ModalForm
                    open={drawerOpen}
                    title={`${drawerFormeValue?.id ? '编辑' : '新建'}场景`}
                    layout="vertical"
                    afterOpenChange={(op) => setDrawerOpen(op)}
                    onSubmit={(values) => {
                        // drawerFormeValue?.id
                        //     ? editScenes(drawerFormeValue.id, value)
                        //     : addDictionaryType(value);
                        // from?.resetFields();
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
                        <TextArea />
                    </Form.Item>
                </ModalForm>
            </Layout.Item>
        </Layout>
    );
};
