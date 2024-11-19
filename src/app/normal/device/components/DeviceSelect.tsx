import {FC} from 'react';
import {deviceApi} from '@apis/tenant';
import {SelectProps} from 'antd';
import {FetchSelect} from "@trionesdev/antd-react-ext";

type DeviceSelectProps = {
    productKey?: string;
    allOption?: boolean;
} & SelectProps;

export const DeviceSelect: FC<DeviceSelectProps> = ({
                                                        productKey,
                                                        allOption,
                                                        ...props
                                                    }) => {
    return (
        <FetchSelect {...props} fixedOptions={allOption ? [{name: '全部设备（+）', deviceName: '+'}] : []}
                     fetchRequest={() => {
                         return deviceApi.queryDeviceByParams({productKey})
                     }} fieldNames={{label: 'name', value: 'deviceName'}}/>
    );
};
