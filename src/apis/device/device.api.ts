import BaseApi from "../base.api";
import {ProductPageRep, ProductRep} from "./device.rep";

export default class DeviceApi extends BaseApi {
    private baseUri = "/be/device"

    valueTypeOptions(): Promise<{ value: string, label: string }> {
        return this.request.get(`${this.baseUri}/value-type/options`)
    }

    createProduct(data: {}) {
        return this.request.post(`${this.baseUri}/products`, data)
    }

    updateProductById(id: string, data: {}) {
        return this.request.put(`${this.baseUri}/products/${id}`, data)
    }

    queryProductById(id: string): Promise<ProductRep> {
        return this.request.get(`${this.baseUri}/products/${id}`)
    }

    queryProductPage(params: { pageNum: number, pageSize: number }): Promise<ProductPageRep> {
        return this.request.get(`${this.baseUri}/products/page`, {params})
    }

    upsertThingModelDraft(productId: string, data: {}) {
        return this.request.put(`${this.baseUri}/products/${productId}/thing-model/upsert`, data)
    }

}