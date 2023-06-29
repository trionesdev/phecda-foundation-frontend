import React, { useState } from 'react'
import styles from './index.module.less'
import { TableToolbar, VPanel } from '@moensun/antd-react-ext'
import GridTable from '@components/grid-table'
import { TableParams } from 'src/@types'
import { formatDateTime } from '@/commons/util/date.utils'
import { useRequest } from 'ahooks'
import { assetsApi } from '@/apis'
import { Button, Divider, Popconfirm, Space } from 'antd'
import { Link } from 'react-router-dom'
import ProductionDeviceTypeForm from './production-device-type-form'

const ProductionDeviceType: React.FC = () => {
    const [tableParams, setTableParams] = useState<TableParams>({
        pageSize: 10,
        pageNum: 1,
    })
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
            title: `生产设备类型`,
            dataIndex: 'name',
        },
        {
            title: '状态',
            dataIndex: 'is_enabled',
            render: (value: boolean) => {
                return value ? '使用中' : '已禁用'
            },
        },
        {
            title: '创建时间',
            dataIndex: 'created_at',
            render: (value: number) => {
                return formatDateTime(value)
            },
        },
        {
            title: '编辑时间',
            dataIndex: 'update_at',
            render: (value: number) => {
                return formatDateTime(value)
            },
        },
        {
            title: '操作',
            dataIndex: 'id',
            width: 150,
            render: (text: string, record: any) => {
                return (
                    <Space split={<Divider type={`vertical`} />}>
                        <Button key={`view-btn`} size={`small`} type={`link`}>
                            {/* <Link to={RoutesConstants.DEVICE_DETAIL.path(text)}> */}
                            <Link to={''}>查看</Link>
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
    return (
        <VPanel className={styles.wrapper}>
            <GridTable
                style={{ padding: '8px', backgroundColor: 'white' }}
                toolbar={
                    <TableToolbar
                        extra={
                            <ProductionDeviceTypeForm
                                key={`create-btn`}
                                type={`primary`}
                            >
                                新建生产设备类型
                            </ProductionDeviceTypeForm>
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
        </VPanel>
    )
}

export default ProductionDeviceType
