import {FC} from "react";
import {Descriptions} from "antd";

type DeviceInfoTabProps = {
    device: any
}
const DeviceInfoTab: FC<DeviceInfoTabProps> = ({device}) => {

    return <>
        <Descriptions title={`设备信息`}>
            <Descriptions.Item label={`产品名称`}>{device?.product?.name}</Descriptions.Item>
        </Descriptions>
    </>
}
export default DeviceInfoTab