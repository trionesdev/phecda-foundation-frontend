import BaseApi from '@apis/base.api';
import { PageQueryParams } from '@apis/types';

export class DriverApi extends BaseApi {
    private baseUri = '/be/device';

    //region drivers
    createDriver(data: any) {
        return this.request.post(`${this.baseUri}/drivers`, data);
    }

    deleteDriverById(id: string) {
        return this.request.delete(`${this.baseUri}/drivers/${id}`);
    }

    updateDriverById(id: string, data: any) {
        return this.request.put(`${this.baseUri}/drivers/${id}`, data);
    }

    queryDriverById(id: string) {
        return this.request.get(`${this.baseUri}/drivers/${id}`);
    }

    queryDriversList() {
        return this.request.get(`${this.baseUri}/drivers/list`);
    }

    queryDriversPage(params: PageQueryParams) {
        return this.request.get(`${this.baseUri}/drivers/page`, { params });
    }

    //endregion
}
