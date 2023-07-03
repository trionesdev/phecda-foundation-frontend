import React, { useMemo, useState } from 'react'
import styles from './index.module.less'
import { DrawerForm, TableToolbar, VPanel } from '@moensun/antd-react-ext'
import GridTable from '@components/grid-table'
import { TableParams } from 'src/@types'
import { useRequest } from 'ahooks'
import { assetsApi } from '@/apis'
import { Button, Divider, Form, Input, Popconfirm, Select, Space } from 'antd'
import { Link } from 'react-router-dom'
import { RoutesConstants } from '@/router/routes.constants'
import SearchToolbar from '@/components/SearchToolbar'

const ProductionDevice: React.FC = () => {
    const [tableParams, setTableParams] = useState<TableParams>({
        pageSize: 10,
        pageNum: 1,
    })
    const [drawerOpen, setDrawerOpen] = useState(false)

    const [drawerFormeValue, setDrawerFormeValue] = useState<
        Record<string, any>
    >({})
    const {
        data: tableData,
        loading,
        run: fetchTableData,
    } = useRequest((tableParams: TableParams) => {
        return assetsApi.queryTableDataDemo(tableParams)
    })
    const handlePageChange = (pageNum: number, pageSize: number) => {
        setTableParams({ pageNum, pageSize })
        fetchTableData({ pageNum, pageSize })
    }

    const columns = [
        {
            title: '编号',
            dataIndex: 'code',
        },
        {
            title: `生产设备名称`,
            dataIndex: 'specification',
        },
        {
            title: '生产设备类型',
            dataIndex: 'type_code',
        },

        {
            title: `区域`,
            dataIndex: 'location_code',
        },
        {
            title: '当前状态',
            dataIndex: 'state',
        },

        {
            title: `设备规格`,
            dataIndex: 'specification',
        },
        {
            title: `岗位`,
            dataIndex: 'specification',
        },
        {
            title: '操作',
            dataIndex: 'id',
            width: 150,
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
                            {/* <Link to={''}>查看</Link> */}
                        </Button>
                        <Popconfirm
                            key={`del-btn`}
                            title={`确定删除设备 ${record.name}？`}
                            // onConfirm={() => handleDeleteById(text)}
                        >
                            <Button size={`small`} type={`link`} danger={true}>
                                删除
                            </Button>
                        </Popconfirm>
                    </Space>
                )
            },
        },
    ]
    const formItems = useMemo(
        () => (
            <>
                <Form.Item name={`energyType`} label={`生产设备类型`}>
                    <Select
                        allowClear={true}
                        placeholder="请选择"
                        style={{ width: 230 }}
                        options={[{ value: '', label: '全部' }]}
                    />
                </Form.Item>
                <Form.Item name={`unitArea`} label={`区域`}>
                    <Select
                        allowClear={true}
                        placeholder="请选择"
                        style={{ width: 230 }}
                        options={[{ value: '', label: '全部' }]}
                    />
                </Form.Item>
                <Form.Item name={`product`} label={`当前状态`}>
                    <Select
                        allowClear={true}
                        placeholder="请选择"
                        style={{ width: 230 }}
                        options={[{ value: '', label: '全部' }]}
                    />
                </Form.Item>
            </>
        ),
        []
    )
    return (
        <VPanel className={styles.wrapper}>
            <GridTable
                style={{ padding: '8px', backgroundColor: 'white' }}
                toolbar={
                    <>
                        <SearchToolbar
                            formItems={formItems}
                            onSearch={(v) => {
                                console.log(v)
                            }}
                            addButtons={
                                <Button
                                    type="primary"
                                    onClick={() => {
                                        setDrawerOpen(true)
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
                loading={loading}
                pagination={{
                    ...tableParams,
                    onChange: handlePageChange,
                }}
            />

            <DrawerForm
                open={drawerOpen}
                trigger={<Button />}
                title={`产品`}
                layout="vertical"
                onOpenChange={(op) => setDrawerOpen(op)}
                initialValues={drawerFormeValue}
                onSubmit={(value) => {
                    console.log(value)
                }}
                formValues={drawerFormeValue}
                //    onSubmit={handleSubmit}
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
                    name="type"
                    label="规格型号"
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    rules={[{ required: true }]}
                    name="name"
                    label="区域位置"
                >
                    <Select />
                </Form.Item>
                <Form.Item
                    rules={[{ required: true }]}
                    name="name"
                    label="设备类型"
                >
                    <Select />
                </Form.Item>
                <Form.Item
                    rules={[{ required: true }]}
                    name="name"
                    label="当前状态"
                >
                    <Select />
                </Form.Item>
                <Form.Item
                    rules={[{ required: true }]}
                    name="name"
                    label="负责岗位"
                >
                    <Select />
                </Form.Item>
                <Form.Item label="备注">
                    <Input.TextArea />
                </Form.Item>
            </DrawerForm>
        </VPanel>
    )
}

export default ProductionDevice
