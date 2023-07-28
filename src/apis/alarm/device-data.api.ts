import BaseApi from '../base.api';
import {
    DeviceDataRowType,
    DeviceDataTableType,
} from '@apis/alarm/device-data.rep';

export default class DeviceDataApi extends BaseApi {
    private baseUri = '/be/device-data';

    /** 查询设备数据列表 */
    queryDeviceDatasList(params: { [key: string]: any }): Promise<any> {
        return this.request.get(`${this.baseUri}/device-datas/list`, {
            params,
        });
    }

    /** 查询设备数据分页 */
    queryDeviceDatasPage(params: {
        pageNum: number;
        pageSize: number;
        [key: string]: any;
    }): Promise<DeviceDataTableType> {
        return this.request.get(`${this.baseUri}/device-datas/page`, {
            params,
        });
    }

    /** 查询设备数据列表（不分页） */
    queryDeviceDataList(params?: Record<string, any>): Promise<any> {
        return this.request.get(`${this.baseUri}/device-datas/list`, {
            params,
        });
    }

    /** 查询设备某个属性最新的数据值 */
    queryDeviceDataListLatest(params?: Record<string, any>): Promise<any> {
        return this.request.get(`${this.baseUri}/device-datas/latest`, {
            params,
        });
    }
}
