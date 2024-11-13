import {PageResult} from "@apis/types.ts";

export type ProductRep = {
    id: string;
    name: string;
    nodeType: string;
    thingModelVersion?: string;
    protocolProperties?: any;
    status?: string;
};

export interface ProductPageRep extends PageResult<ProductRep> {}
