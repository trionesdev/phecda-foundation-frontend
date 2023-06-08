import {TableToolbar, VPanel} from "@moensun/antd-react-ext";
import styles from "./device.module.less"
import {useEffect, useState} from "react";
import {Button} from "antd";
import DeviceForm from "./device-form";
import {deviceApi} from "@apis";
import GridTable from "@components/grid-table";

const DevicesView = () => {
    const [loading, setLoading] = useState(false)
    const [pageNum, setPageNum] = useState(1)
    const [pageSize, setPageSize] = useState(10)
    const [devices, setDevices] = useState([])

    const handleQueryDevices = () => {
        let params = {
            pageNum,
            pageSize
        }
        setLoading(true)
        deviceApi.queryDevicesExtPage(params).then((res: any) => {
            if (res) {
                setDevices(res.rows || [])
            }
        }).finally(() => {
            setLoading(false)
        })
    }

    useEffect(() => {
        handleQueryDevices()
    }, [pageNum, pageSize])

    const columns = [
        {
            title: '设备名称',
            dataIndex: 'name'
        },
        {
            title: `设备所属产品`,
            dataIndex: ['product','name']
        },
        {
            title: '节点类型',
            dataIndex: ['product','nodeType']
        },
        {
            title: '操作',
            dataIndex: 'id'
        }
    ]

    const tableBar = <TableToolbar extra={[
        <DeviceForm type={`primary`}>新建设备</DeviceForm>
    ]}/>
    return <VPanel className={styles.deviceView}>
        <GridTable style={{padding: '8px', backgroundColor: 'white'}} size={`small`} toolbar={tableBar}
                   columns={columns} scroll={{y:'max-content'}}
                   dataSource={devices} rowKey={`id`} loading={loading}/>
    </VPanel>
}
export default DevicesView