import BaseApi from '../base.api';

class LoggingApi extends BaseApi {
    private baseUri = '/be/logging';
    /** 设备服务日志 */
    queryDevicesServiceLogPage(params: {
        pageNum: number;
        pageSize: number;
        [key: string]: any;
    }): Promise<any> {
        return this.request.get(`${this.baseUri}/device-service/page`, {
            params,
        });
    }
    /** 设备事件管理日志 */
    queryDevicesEventLogPage(params: {
        pageNum: number;
        pageSize: number;
        [key: string]: any;
    }): Promise<any> {
        return this.request.get(`${this.baseUri}/device-event/page`, {
            params,
        });
    }
}

export default LoggingApi;
