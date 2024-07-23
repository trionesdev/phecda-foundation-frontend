import { NODE_TYPE, PRODUCT_TYPE, ValueTypeEnum } from './device.enum';

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

export const ValueTypeOptions = [
    {
        label: '整数',
        value: ValueTypeEnum.INT,
    },
    {
        label: '单精度浮点数',
        value: ValueTypeEnum.FLOAT,
    },
    {
        label: '双精度浮点数',
        value: ValueTypeEnum.DOUBLE,
    },
    {
        label: '布尔值',
        value: ValueTypeEnum.BOOL,
    },
    {
        label: '字符串',
        value: ValueTypeEnum.STRING,
    },
    {
        label: '结构体',
        value: ValueTypeEnum.STRUCT,
    },
    {
        label: '数组',
        value: ValueTypeEnum.ARRAY,
    },
];

export const ArraySubValueTypeOptions = [
    {
        label: 'Bool',
        value: ValueTypeEnum.BOOL,
    },
    {
        label: 'Int',
        value: ValueTypeEnum.INT,
    },
    {
        label: 'Float',
        value: ValueTypeEnum.FLOAT,
    },
    {
        label: 'Double',
        value: ValueTypeEnum.DOUBLE,
    },
    {
        label: 'String',
        value: ValueTypeEnum.STRING,
    },
];
