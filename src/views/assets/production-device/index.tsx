import React, { useEffect, useMemo, useState } from 'react';
import styles from './index.module.less';
import { DrawerForm, VPanel } from '@moensun/antd-react-ext';
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
    message,
} from 'antd';
import { Link } from 'react-router-dom';
import { RoutesConstants } from '@/router/routes.constants';
import SearchToolbar from '@/components/search-toolbar';
import { TableParams } from '@/constants/types';
import { AssetsStatesConfig, AssetsStatesOptions } from '@/constants/consts';
import useQueryDeviceAll from '@/hooks/useQueryDeviceAll';
import { ASSETS_STATES } from '@/constants/enums';
import UploadImage from '@/components/upload/UploadImage';
import UploadMyFile from '@/components/upload/UploadFile';
import useQueryDictionaryOptions from '@/hooks/useQueryDictionaryOptions';
import { findOptionsLabel } from '@/commons/util/findOptionsLabel';

const ProductionDevice: React.FC = () => {
    const [tableParams, setTableParams] = useState<TableParams>({
        pageSize: 10,
        pageNum: 1,
    });
    const [drawerOpen, setDrawerOpen] = useState(false);
    const { typeCodeOptions: assetsTypeOptions } =
        useQueryDictionaryOptions('assets_type');
    const { typeCodeOptions: locationCodeOptions } =
        useQueryDictionaryOptions('location_code');
    const [drawerFormeValue, setDrawerFormeValue] = useState<
        Record<string, any> | undefined
    >({});
    const { allDeviceDataOptions } = useQueryDeviceAll();
    /** 请求表格 */
    const {
        data: tableData,
        loading: tableDataLoading,
        run: fetchTableData,
        refresh: refreshFetchTableData,
    } = useRequest(
        (tableParams: TableParams) => assetsApi.queryAssetsPage(tableParams),
        { manual: true }
    );
    const afterSubmitForm = () => {
        setDrawerFormeValue(undefined);
        setDrawerOpen(false);
        message.success('操作成功');
        refreshFetchTableData();
    };
    /** 添加设备 */
    const { run: addAssets } = useRequest(
        (params) => assetsApi.addAssets(params),
        {
            manual: true,
            onSuccess() {
                afterSubmitForm();
            },
        }
    );
    /** 修改设备 */
    const { run: editAssets } = useRequest(
        (id, params) => assetsApi.editAssetsById(id, params),
        {
            manual: true,
            onSuccess() {
                afterSubmitForm();
            },
        }
    );
    /** 删除设备 */
    const { run: deleteAsset } = useRequest(
        (id) => assetsApi.deleteAssetsById(id),
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
            title: '编号',
            dataIndex: 'sn',
        },
        {
            title: `生产设备名称`,
            dataIndex: 'name',
        },
        {
            title: '生产设备类型',
            dataIndex: 'typeCode',
            render: (typeCode: string) => {
                return findOptionsLabel(assetsTypeOptions, typeCode);
            },
        },

        {
            title: `区域`,
            dataIndex: 'locationCode',
            render: (locationCode: string) => {
                return findOptionsLabel(locationCodeOptions, locationCode);
            },
        },
        {
            title: '当前状态',
            dataIndex: 'state',
            render: (state: ASSETS_STATES) => {
                return AssetsStatesConfig?.[state];
            },
        },

        {
            title: `设备规格`,
            dataIndex: 'specification',
        },
        {
            title: `岗位`,
            dataIndex: 'postCode',
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
                                to={RoutesConstants.PRODUCTION_DEVICE_DETAIL.path(
                                    id
                                )}
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
                            title={`确定删除设备 ${record.name}？`}
                            onConfirm={() => deleteAsset(record?.id)}
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
    const tableParamsFormItems = useMemo(() => {
        return (
            <>
                <Form.Item name="typeCode" label={`生产设备类型`}>
                    <Select
                        style={{ width: 230 }}
                        options={assetsTypeOptions}
                    />
                </Form.Item>
                <Form.Item name="locationCode" label="区域位置">
                    <Select
                        style={{ width: 230 }}
                        options={locationCodeOptions}
                    />
                </Form.Item>
                <Form.Item name="state" label={`当前状态`}>
                    <Select
                        style={{ width: 230 }}
                        options={AssetsStatesOptions}
                    />
                </Form.Item>
            </>
        );
    }, [assetsTypeOptions, locationCodeOptions]);
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
                                    新建生产设备
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
                title={`${drawerFormeValue?.id ? '编辑' : '新建'}生产设备`}
                layout="vertical"
                onOpenChange={(op) => setDrawerOpen(op)}
                onSubmit={(value, from) => {
                    drawerFormeValue?.id
                        ? editAssets(drawerFormeValue.id, value)
                        : addAssets(value);
                    from?.resetFields();
                }}
                formValues={drawerFormeValue}
            >
                <Form.Item
                    rules={[{ required: true }]}
                    name="name"
                    label="生产设备名称"
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    rules={[{ required: true }]}
                    name="sn"
                    label="生产设备编号"
                >
                    <Input />
                </Form.Item>
                <Form.Item name="deviceNames" label="关联设备">
                    <Select mode="multiple" options={allDeviceDataOptions} />
                </Form.Item>
                <Form.Item
                    rules={[{ required: true }]}
                    name="specification"
                    label="规格型号"
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    rules={[{ required: true }]}
                    name="locationCode"
                    label="区域位置"
                >
                    <Select options={locationCodeOptions} />
                </Form.Item>
                <Form.Item
                    rules={[{ required: true }]}
                    name="typeCode"
                    label="生产设备类型"
                >
                    <Select options={assetsTypeOptions} />
                </Form.Item>
                <Form.Item
                    rules={[{ required: true }]}
                    name="state"
                    label="当前状态"
                >
                    <Select options={AssetsStatesOptions} />
                </Form.Item>
                <Form.Item
                    rules={[{ required: true }]}
                    name="departmentCode"
                    label="部门名称"
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    rules={[{ required: true }]}
                    name="postCode"
                    label="负责岗位"
                >
                    <Input />
                </Form.Item>
                <Form.Item name="remark" label="备注">
                    <Input.TextArea />
                </Form.Item>
                <Form.Item
                    name="images"
                    label="上传图片"
                    valuePropName="fileList"
                >
                    <UploadImage />
                </Form.Item>
                <Form.Item
                    name="files"
                    label="上传文件"
                    valuePropName="fileList"
                >
                    <UploadMyFile />
                </Form.Item>
            </DrawerForm>
        </VPanel>
    );
};

export default ProductionDevice;
