import { NODE_TYPE, PRODUCT_TYPE } from './device.enum';

export const DeviceNodeTypeOptions = [
    {
        label: '直连设备',
        value: NODE_TYPE.DIRECT,
    },
    {
        label: '网关设备',
        value: NODE_TYPE.GATEWAY,
    },
    {
        label: '网关子设备',
        value: NODE_TYPE.GATEWAY_SUB,
    },
];
export const AccessChannel = {
    DRIVER: '驱动接入',
    GATEWAY: '平台网关',
} as const;

export const ProductTypeOptions = [
    {
        label: '传感器',
        value: PRODUCT_TYPE.SENSOR,
    },
    {
        label: '摄像头',
        value: PRODUCT_TYPE.CAMERA,
    },
];
