import {PageResult} from "@apis/types.ts";


export type ProductionDeviceTypeRowType = {
    id: string;
    code: string;
    name: string;
    is_enabled: boolean;
    created_at: number;
    update_at: number;
};

export interface ProductionDeviceTypeTableType
    extends PageResult<ProductionDeviceTypeRowType> {}
