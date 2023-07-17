import BaseApi from '../base.api';

export default class OperationApi extends BaseApi {
    private baseUri = '/be/linkage/scenes';

    //字典
    /** 根据id查询场景 */
    getScenesById(id: string): Promise<any> {
        return this.request.get(`${this.baseUri}/${id}`);
    }
    /** 所有场景table */
    queryScenesPage(params: {
        pageNum: number;
        pageSize: number;
        [key: string]: any;
    }): Promise<any> {
        return this.request.get(`${this.baseUri}/page`, { params });
    }
    /** 新建场景 */
    addScenes(params: Record<string, any>): Promise<any> {
        return this.request.post(`${this.baseUri}`, params);
    }
    /** 编辑场景 */
    editScenesById(id: string, data: Record<string, any>): Promise<any> {
        return this.request.put(`${this.baseUri}/${id}`, data);
    }
    /** 场景的启用禁用 */
    editScenesStatusById(id: string, data: boolean): Promise<any> {
        return this.request.put(`${this.baseUri}/${id}/enabled`, data);
    }
    /** 根据id删除字典 */
    deleteScenesById(id: string) {
        return this.request.delete(`${this.baseUri}/${id}`);
    }
}
