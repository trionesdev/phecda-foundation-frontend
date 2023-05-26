import BaseApi from "../base.api";
import {ProductPageRep} from "./device.rep";

export default class DeviceApi extends BaseApi {
    private baseUri = "/be/device"

    createProduct(data: {}) {
        return this.request.post(`${this.baseUri}/products`, data)
    }

    updateProductById(id: string, data: {}) {
        return this.request.put(`${this.baseUri}/products/${id}`, data)
    }

    queryProductPage(params: { pageNum: number, pageSize: number }): Promise<ProductPageRep> {
        return this.request.get(`${this.baseUri}/products/page`, {params})
    }

}