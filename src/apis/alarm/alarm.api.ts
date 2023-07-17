import BaseApi from '../base.api';

export default class AlarmApi extends BaseApi {
    private baseUri = '/be/alarm';

    //报警记录
    /** 根据id查询报警记录 */
    getAlarmLogById(id: string): Promise<any> {
        return this.request.get(`${this.baseUri}/alarm-logs/${id}`);
    }
    /** 编辑报警记录 */
    editAlarmLogById(id: string, data: Record<string, any>): Promise<any> {
        return this.request.put(`${this.baseUri}/alarm-logs/${id}`, data);
    }
    /** 根据id删除报警记录 */
    deleteAlarmLogById(id: string) {
        return this.request.delete(`${this.baseUri}/alarm-logs/${id}`);
    }
    /** 所有报警记录table */
    queryAlarmLogsPage(params: {
        pageNum: number;
        pageSize: number;
        [key: string]: any;
    }): Promise<any> {
        return this.request.get(`${this.baseUri}/alarm-logs/page`, { params });
    }
    /** 所有报警记录list */
    queryAlarmLogsList(): Promise<any> {
        return this.request.get(`${this.baseUri}/alarm-logs/list`);
    }
    /** 查询报警统计 */
    queryAlarmLogsStatistics(): Promise<any> {
        return this.request.get(`${this.baseUri}/alarm-logs/statistics`);
    }
}
