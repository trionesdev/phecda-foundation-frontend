import {BaseTenantApi} from "@apis/tenant/base-tenant.api.ts";

export class DeviceDataApi extends BaseTenantApi {
    private baseUri = '/device';

    queryPropertiesPostStatistics() {
        return this.request.get(`${this.baseUri}/properties-post/statistics`);
    }

    queryPropertyDataList(params: {
        deviceName: string;
        identifier: string;
        startTime: number;
        endTime: number;
        [key: string]: any;
    }) {
        return this.request.get(`${this.baseUri}/property/data/list`, {
            params,
        });
    }

    queryEventLogsPage(params: {
        pageNum: number;
        pageSize: number;
        [key: string]: any;
    }) {
        return this.request.get(`${this.baseUri}/event/logs/page`, { params });
    }

    queryServiceLogsPage(params: {
        pageNum: number;
        pageSize: number;
        [key: string]: any;
    }) {
        return this.request.get(`${this.baseUri}/service/logs/page`, {
            params,
        });
    }
}
