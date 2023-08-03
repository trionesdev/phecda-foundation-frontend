import BaseApi from '../base.api';

class NodeApi extends BaseApi {
    private baseUri = '/be/edge';

    page(params: any) {
        return this.request.get(`${this.baseUri}/nodes/page`, {
            params: params,
        });
    }

    list(): Promise<any> {
        return this.request.get(`${this.baseUri}/nodes/list`);
    }

    save(data: any) {
        return this.request.post(`${this.baseUri}/nodes`, data);
    }

    updateById(data: any) {
        return this.request.put(`${this.baseUri}/nodes`, data);
    }

    getById(id: string) {
        return this.request.get(`${this.baseUri}/nodes/${id}`);
    }

    deleteById(id: string) {
        return this.request.delete(`${this.baseUri}/nodes/${id}`);
    }

    addChildDevice(nodeId: string, childDeviceIds: string[]) {
        return this.request.post(
            `${
                this.baseUri
            }/nodes/${nodeId}/device-children/${childDeviceIds.join(',')}`
        );
    }

    removeChildDevice(nodeId: string, childDeviceIds: string[]) {
        return this.request.delete(
            `${
                this.baseUri
            }/nodes/${nodeId}/device-children/${childDeviceIds.join(',')}`
        );
    }
}

export default NodeApi;
