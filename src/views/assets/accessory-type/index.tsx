import React, { useState } from 'react'
import styles from './index.module.less'
import { DrawerForm, TableToolbar, VPanel } from '@moensun/antd-react-ext'
import GridTable from '@components/grid-table'
import { TableParams } from 'src/@types'
import { formatDateTime } from '@/commons/util/date.utils'
import { useRequest } from 'ahooks'
import { assetsApi } from '@/apis'
import {
    Button,
    Divider,
    Form,
    Input,
    Popconfirm,
    Select,
    Space,
    Switch,
} from 'antd'

const AccessoryType: React.FC = () => {
    const [tableParams, setTableParams] = useState<TableParams>({
        pageSize: 10,
        pageNum: 1,
    })
    const [drawerFormeValue, setDrawerFormeValue] = useState<
        Record<string, any>
    >({})
    const [drawerOpen, setDrawerOpen] = useState(false)

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
            dataIndex: 'id',
        },
        {
            title: `配件类型名称`,
            dataIndex: 'name',
        },
        {
            title: `配件类型编号`,
            dataIndex: 'sn',
        },
        {
            title: `所属生产设备`,
            dataIndex: 'asset_sn',
        },
        {
            title: '状态',
            dataIndex: 'is_enabled',
            render: (value: boolean) => {
                return value ? '使用中' : '已禁用'
            },
        },
        {
            title: '备注',
            dataIndex: 'remark',
        },
        {
            title: '创建时间',
            dataIndex: 'created_at',
            render: (value: number) => {
                return formatDateTime(value)
            },
        },

        {
            title: '操作',
            dataIndex: 'id',
            width: 150,
            render: (text: string, record: Record<string, any>) => {
                return (
                    <Space split={<Divider type={`vertical`} />}>
                        <Button
                            size="small"
                            type="link"
                            onClick={() => {
                                setDrawerFormeValue({
                                    ...drawerFormeValue,
                                    name: record?.name,
                                })
                                setDrawerOpen(true)
                            }}
                        >
                            编辑
                        </Button>
                        <Popconfirm
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
    return (
        <VPanel className={styles.wrapper}>
            <GridTable
                style={{ padding: '8px', backgroundColor: 'white' }}
                toolbar={
                    <TableToolbar
                        extra={
                            <Button
                                type="primary"
                                onClick={() => {
                                    setDrawerOpen(true)
                                }}
                            >
                                新增配件类型
                            </Button>
                        }
                    />
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
                <Form.Item name="name" label="配件类型名称">
                    <Input />
                </Form.Item>
                <Form.Item label="配件类型编号">
                    <Input />
                </Form.Item>
                <Form.Item label="所属生产设备">
                    <Select />
                </Form.Item>
                <Form.Item label="状态">
                    <Switch />
                </Form.Item>
                <Form.Item label="备注">
                    <Input.TextArea />
                </Form.Item>
            </DrawerForm>
        </VPanel>
    )
}

export default AccessoryType
