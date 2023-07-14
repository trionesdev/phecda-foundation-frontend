import { PageRep } from '../base.rep';

export type DeviceDataRowType = {
    time: string;
    value: string;
    field: string;
    assetSn: string;
    deviceName: string;
};

export interface DeviceDataTableType extends PageRep<DeviceDataRowType> {}
