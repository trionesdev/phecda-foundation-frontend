import {PageQueryParams} from '@apis/types.ts';
import {BaseTenantApi} from "@apis/tenant/base-tenant.api.ts";

export class DriverApi extends BaseTenantApi {
    private baseUri = '/device';

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
