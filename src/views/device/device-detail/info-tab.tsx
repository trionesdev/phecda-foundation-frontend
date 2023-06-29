import { FC } from 'react'
import { Descriptions } from 'antd'
import styles from './device-detail.module.less'
import { formatDateTime } from '../../../commons/util/date.utils'

type DeviceInfoTabProps = {
    device: any
}
const DeviceInfoTab: FC<DeviceInfoTabProps> = ({ device }) => {
    return (
        <div className={styles.infoTab}>
            <Descriptions title={`设备信息`}>
                <Descriptions.Item label={`产品名称`}>
                    {device?.product?.name}
                </Descriptions.Item>
                <Descriptions.Item label={`节点类型`}>
                    {device?.product?.nodeTypeLabel}
                </Descriptions.Item>
                <Descriptions.Item label={`DeviceName`}>
                    {device?.name}
                </Descriptions.Item>
                <Descriptions.Item label={`备注名称`}>
                    {device?.remarkName}
                </Descriptions.Item>
                <Descriptions.Item label={`创建时间`}>
                    {formatDateTime(device?.createdAt)}
                </Descriptions.Item>
            </Descriptions>
        </div>
    )
}
export default DeviceInfoTab
