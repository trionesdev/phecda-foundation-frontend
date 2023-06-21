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

    queryProductList(params?: {}) {
        return this.request.get(`${this.baseUri}/products`, {params})
    }

    queryProductPage(params: { pageNum: number, pageSize: number }): Promise<ProductPageRep> {
        return this.request.get(`${this.baseUri}/products/page`, {params})
    }

    queryProductThingModelDraft(productId: string) {
        return this.request.get(`${this.baseUri}/products/${productId}/thing-model-draft`)
    }

    upsertThingModelDraft(productId: string, data: {}) {
        return this.request.put(`${this.baseUri}/products/${productId}/thing-model-draft/upsert`, data)
    }

    deleteThingModelDraftAbility(productId: string, abilityIdentifier: string) {
        return this.request.delete(`${this.baseUri}/products/${productId}/thing-model-draft/abilities/${abilityIdentifier}`)
    }

    publishThingModel(productId: string) {
        return this.request.put(`${this.baseUri}/products/${productId}/thing-model-draft/publish`)
    }

    queryThingModel(productId: string, version?: string) {
        return this.request.get(`${this.baseUri}/products/${productId}/thing-model`, {params: {version}})
    }

    updateProductProtocolProperties(productId: string, data: { protocolProperties: any }) {
        return this.request.put(`${this.baseUri}/products/${productId}/protocol-properties`, data)
    }

    createDevice(data: {}) {
        return this.request.post(`${this.baseUri}/devices`, data)
    }

    deleteDeviceById(id: string) {
        return this.request.delete(`${this.baseUri}/devices/${id}`)
    }

    queryDeviceExtById(id:string){
        return this.request.get(`${this.baseUri}/devices/ext/${id}`)
    }
    queryDevicesExtPage(params: {
        pageNum: number, pageSize: number
    }) {
        return this.request.get(`${this.baseUri}/devices/ext/page`, {params})
    }

    updateDeviceEnabled(id: string, enabled: boolean) {
        return this.request.put(`${this.baseUri}/devices/${id}/enabled`, {enabled})
    }
}