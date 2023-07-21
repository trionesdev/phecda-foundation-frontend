import BaseApi from '../base.api';
import { ProductPageRep, ProductRep } from './device.rep';

export default class DeviceApi extends BaseApi {
    private baseUri = '/be/device';

    valueTypeOptions(): Promise<{ value: string; label: string }> {
        return this.request.get(`${this.baseUri}/value-type/options`);
    }

    createProduct(data: {}) {
        return this.request.post(`${this.baseUri}/products`, data);
    }

    updateProductById(id: string, data: {}) {
        return this.request.put(`${this.baseUri}/products/${id}`, data);
    }

    queryProductById(id: string): Promise<ProductRep> {
        return this.request.get(`${this.baseUri}/products/${id}`);
    }
    /** 获取产品列表 */
    queryProductList(params?: {}): Promise<ProductRep[]> {
        return this.request.get(`${this.baseUri}/products`, { params });
    }

    queryProductPage(params: {
        pageNum: number;
        pageSize: number;
    }): Promise<ProductPageRep> {
        return this.request.get(`${this.baseUri}/products/page`, { params });
    }

    queryProductThingModelDraft(productId: string) {
        return this.request.get(
            `${this.baseUri}/products/${productId}/thing-model-draft`
        );
    }

    upsertThingModelDraft(productId: string, data: {}) {
        return this.request.put(
            `${this.baseUri}/products/${productId}/thing-model-draft/upsert`,
            data
        );
    }

    deleteThingModelDraftAbility(productId: string, abilityIdentifier: string) {
        return this.request.delete(
            `${this.baseUri}/products/${productId}/thing-model-draft/abilities/${abilityIdentifier}`
        );
    }

    publishThingModel(productId: string) {
        return this.request.put(
            `${this.baseUri}/products/${productId}/thing-model-draft/publish`
        );
    }

    queryThingModel(productId: string, version?: string) {
        return this.request.get(
            `${this.baseUri}/products/${productId}/thing-model`,
            { params: { version } }
        );
    }

    updateProductProtocolProperties(
        productId: string,
        data: { protocolProperties: any }
    ) {
        return this.request.put(
            `${this.baseUri}/products/${productId}/protocol-properties`,
            data
        );
    }

    createDevice(data: {}) {
        return this.request.post(`${this.baseUri}/devices`, data);
    }

    deleteDeviceById(id: string) {
        return this.request.delete(`${this.baseUri}/devices/${id}`);
    }

    queryDeviceExtById(id: string) {
        return this.request.get(`${this.baseUri}/devices/ext/${id}`);
    }

    queryDevicesExtPage(params: { pageNum: number; pageSize: number }) {
        return this.request.get(`${this.baseUri}/devices/ext/page`, { params });
    }

    updateDeviceEnabled(id: string, enabled: boolean) {
        return this.request.put(`${this.baseUri}/devices/${id}/enabled`, {
            enabled,
        });
    }

    queryDevicePropertiesData(deviceId: string) {
        return this.request.get(
            `${this.baseUri}/devices/${deviceId}/properties-data`
        );
    }

    queryDeviceEventsData(deviceId: string) {
        return this.request.get(
            `${this.baseUri}/devices/${deviceId}/events-data`
        );
    }

    queryDeviceServicesData(deviceId: string) {
        return this.request.get(
            `${this.baseUri}/devices/${deviceId}/services-data`
        );
    }
    /** 获取所有设备 */
    queryDeviceAll(): Promise<any> {
        return this.request.get(`${this.baseUri}/devices/all`);
    }
    /** 根据条件查询设备（不分页） */
    queryDeviceByParams(params?: {}): Promise<any> {
        return this.request.get(`${this.baseUri}/devices/list`, { params });
    }
    /** 获取未关联资产的设备 */
    queryDeviceNoRelation(assetSn?: string): Promise<any> {
        return this.request.get(
            `${this.baseUri}/devices/${assetSn}/no-relation`
        );
    }

    /** 获取关联资产的设备 */
    queryDeviceRelatedByAsset(assetSn?: string): Promise<any> {
        return this.request.get(
            `${this.baseUri}/devices/${assetSn}/related-asset`
        );
    }

    queryDeviceProperties(deviceName?: string): Promise<any> {
        return this.request.get(
            `${this.baseUri}/devices/${deviceName}/properties`
        );
    }

    addChildDevice(parentDeviceId: string, childDeviceIds: string[]) {
        return this.request.post(
            `${
                this.baseUri
            }/devices/${parentDeviceId}/children/${childDeviceIds.join(',')}`
        );
    }

    removeChildDevice(parentDeviceId: string, childDeviceIds: string[]) {
        return this.request.delete(
            `${
                this.baseUri
            }/devices/${parentDeviceId}/children/${childDeviceIds.join(',')}`
        );
    }
}
