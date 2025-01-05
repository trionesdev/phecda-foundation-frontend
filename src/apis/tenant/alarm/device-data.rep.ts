import {PageResult} from "@apis/types.ts";


export type DeviceDataRowType = {
    time: string;
    value: string;
    field: string;
    assetSn: string;
    deviceName: string;
};

export interface DeviceDataTableType extends PageResult<DeviceDataRowType> {}
