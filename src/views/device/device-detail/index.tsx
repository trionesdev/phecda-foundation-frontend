import {PageHeader, VPanel} from "@moensun/antd-react-ext";
import {Tabs, TabsProps} from "antd";
import InfoTab from "./info-tab";
import {useEffect, useState} from "react";
import {deviceApi} from "@apis";
import {useParams} from "react-router-dom";
import styles from "./device-detail.module.less"
import Index from "./thing-model-tab";
import _ from "lodash";


const DeviceDetailView = () => {
    const {id} = useParams()
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

    const items: TabsProps['items'] = _.concat([
        {
            key: 'info',
            label: `设备信息`,
            children: <InfoTab device={device}/>,
        },
        {
            key: `thing-model-data`,
            label: `物模型数据`,
            children: <Index device={device}/>
        }
    ], _.eq("GATEWAY", device?.product?.nodeType) ? {
        key: `sub-device`,
        label: `子设备`,
    } : []);

    const pageHelper = <PageHeader title={device?.name}/>
    return <VPanel className={styles.deviceDetailView} header={pageHelper}>
        <Tabs items={items}/>
    </VPanel>
}
export default DeviceDetailView