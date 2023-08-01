import BaseApi from '../base.api';

class NodeApi extends BaseApi {
    private baseUri = '/be/edge';

    list(): Promise<any> {
        return this.request.get(`${this.baseUri}/nodes/list`);
    }
}

export default NodeApi;
