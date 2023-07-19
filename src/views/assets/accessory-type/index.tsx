import React, { useEffect, useMemo, useState } from 'react';
import styles from './index.module.less';
import { VPanel } from '@moensun/antd-react-ext';
import GridTable from '@components/grid-table';
import { useRequest } from 'ahooks';
import { assetsApi } from '@/apis';
import {
    Button,
    Divider,
    Form,
    Input,
    Popconfirm,
    Select,
    Space,
    Switch,
    message,
} from 'antd';
import SearchToolbar from '@/components/search-toolbar';
import { TableParams } from '@/constants/types';
import { AssetsStatesOptions } from '@/constants/consts';
import { formatDateTime } from '@/commons/util/date.utils';
import { findOptionsLabel } from '@/commons/util/findOptionsLabel';
import DrawerForm from '@/components/drawer-form';
import useQueryDeviceNoRelation from '@/hooks/useOptions/useQueryDeviceNoRelation';
import useQueryAssetsAll from '@/hooks/useOptions/useQueryAssetsAll';

const AccessoryType: React.FC = () => {
    const [tableParams, setTableParams] = useState<TableParams>({
        pageSize: 10,
        pageNum: 1,
    });
    const [drawerOpen, setDrawerOpen] = useState(false);

    const [drawerFormeValue, setDrawerFormeValue] = useState<
        Record<string, any> | undefined
    >({});
    const { deviceOptions } = useQueryDeviceNoRelation(drawerFormeValue?.sn);
    const { allAssetsOptions } = useQueryAssetsAll();
    /** 请求表格 */
    const {
        data: tableData,
        loading: tableDataLoading,
        run: fetchTableData,
        refresh: refreshFetchTableData,
    } = useRequest(
        (tableParams: TableParams) =>
            assetsApi.querySpacePartsPage(tableParams),
        { manual: true }
    );
    const afterSubmitForm = () => {
        setDrawerFormeValue(undefined);
        setDrawerOpen(false);
        message.success('操作成功');
        refreshFetchTableData();
    };
    /** 添加配件 */
    const { run: addSpacePart } = useRequest(
        (params) => assetsApi.addSpacePart(params),
        {
            manual: true,
            onSuccess() {
                afterSubmitForm();
            },
        }
    );
    /** 修改配件 */
    const { run: editSpacePart } = useRequest(
        (id, params) => assetsApi.editSpacePartById(id, params),
        {
            manual: true,
            onSuccess() {
                afterSubmitForm();
            },
        }
    );
    /** 删除设备 */
    const { run: deleteSpacePart } = useRequest(
        (id) => assetsApi.deleteSpacePartById(id),
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
            title: `配件类型编号`,
            dataIndex: 'sn',
        },
        {
            title: '配件类型名称',
            dataIndex: 'name',
        },

        {
            title: '所属生产设备',
            dataIndex: 'assetSn',
            render: (assetSn: string) => {
                return findOptionsLabel(allAssetsOptions, assetSn);
            },
        },
        {
            title: '状态',
            dataIndex: 'enable',
            render: (enable: boolean) => {
                return enable ? '开启' : '关闭';
            },
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
            title: '操作',
            dataIndex: 'id',
            width: 150,
            render: (id: string, record: any) => {
                return (
                    <Space split={<Divider type={`vertical`} />}>
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
                            onConfirm={() => deleteSpacePart(record?.id)}
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
                <Form.Item name="assetSn" label={`生产设备`}>
                    <Select
                        allowClear={true}
                        placeholder="请选择"
                        style={{ width: 230 }}
                        options={allAssetsOptions}
                    />
                </Form.Item>
                <Form.Item name="state" label={`当前状态`}>
                    <Select
                        allowClear={true}
                        placeholder="请选择"
                        style={{ width: 230 }}
                        options={AssetsStatesOptions}
                    />
                </Form.Item>
            </>
        ),
        [allAssetsOptions]
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
                                    新建配件类型
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
                title={`${drawerFormeValue?.id ? '编辑' : '新建'}配件类型`}
                layout="vertical"
                onOpenChange={(op) => setDrawerOpen(op)}
                onSubmit={(value, from) => {
                    drawerFormeValue?.id
                        ? editSpacePart(drawerFormeValue.id, value)
                        : addSpacePart(value);
                    from?.resetFields();
                }}
                formValues={drawerFormeValue}
            >
                <Form.Item
                    name="name"
                    label="配件类型名称"
                    rules={[{ required: true }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="sn"
                    label="配件类型编号"
                    rules={[{ required: true }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item name="assetSn" label="所属生产设备">
                    <Select options={allAssetsOptions} />
                </Form.Item>
                <Form.Item name="deviceNames" label="关联设备">
                    <Select mode="multiple" options={deviceOptions} />
                </Form.Item>
                <Form.Item
                    name="enable"
                    label="状态"
                    rules={[{ required: true }]}
                    valuePropName="checked"
                    initialValue={true}
                >
                    <Switch />
                </Form.Item>
                <Form.Item name="remark" label="备注">
                    <Input.TextArea />
                </Form.Item>
            </DrawerForm>
        </VPanel>
    );
};

export default AccessoryType;
