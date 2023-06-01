import {PageRep} from "../base.rep";

export type ProductRep = {
    id: string,
    name: string,
    nodeType: string
    thingModelVersion?: string
}

export interface ProductPageRep extends PageRep<ProductRep> {

}