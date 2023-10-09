export const DeviceNodeType = {
    DIRECT: '直连设备',
    GATEWAY: '网关设备',
    GATEWAY_SUB: '网关子设备',
} as const;
export type DeviceNodeTypeValue =
    (typeof DeviceNodeType)[keyof typeof DeviceNodeType];
export type DeviceNodeTypeKeys = keyof typeof DeviceNodeType;
