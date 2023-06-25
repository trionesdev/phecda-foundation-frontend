import { PageHeader, VPanel } from '@moensun/antd-react-ext'
import { Tabs, TabsProps } from 'antd'
import InfoTab from './info-tab'
import { useEffect, useState } from 'react'
import { deviceApi } from '@apis'
import { useParams } from 'react-router-dom'
import styles from './device-detail.module.less'

const DeviceDetailView = () => {
    const { id } = useParams()
    const [device, setDevice] = useState<any>()

    const handleQueryDevice = () => {
        deviceApi.queryDeviceExtById(id!).then((res: any) => {
            setDevice(res)
        })
    }

    useEffect(() => {
        if (id) {
            handleQueryDevice()
        }
    }, [id])

    const items: TabsProps['items'] = [
        {
            key: 'info',
            label: `设备信息`,
            children: <InfoTab device={device} />,
        },
    ]

    const pageHelper = <PageHeader title={device?.name} />
    return (
        <VPanel className={styles.deviceDetailView} header={pageHelper}>
            <Tabs items={items} />
        </VPanel>
    )
}
export default DeviceDetailView
