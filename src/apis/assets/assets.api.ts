import BaseApi from '../base.api'

export default class AssetsApi extends BaseApi {
    private baseUri = '/be/asset/assets'

    queryTableDataDemo(params: { pageNum: number; pageSize: number }) {
        // return this.request.get(`${this.baseUri}/page`, { params })
        return Promise.resolve({
            pageNum: 1,
            pageSize: 10,
            pages: 1,
            rows: [
                {
                    id: '0',
                    code: '001',
                    name: '皮带机1',
                    is_enabled: true,
                    created_at: '3333',
                    update_at: '4545445',
                },
                {
                    id: '1',
                    code: '001',
                    name: '皮带机2',
                    is_enabled: true,
                    created_at: '3333',
                    update_at: '4545445',
                },
                {
                    id: '2',
                    code: '001',
                    name: '皮带机3',
                    is_enabled: true,
                    created_at: '3333',
                    update_at: '4545445',
                },
                {
                    id: '3',
                    code: '001',
                    name: '皮带机4',
                    is_enabled: true,
                    created_at: '3333',
                    update_at: '4545445',
                },
            ],
        })
    }
    /** 所有生产设备table */
    queryAssetsPage(params: {
        pageNum: number
        pageSize: number
        [key: string]: any
    }): Promise<any> {
        return this.request.get(`${this.baseUri}/page`, { params })
    }
    /** 新建生产设备 */
    addAssets(params: Record<string, any>): Promise<any> {
        return this.request.post(`${this.baseUri}`, params)
    }
    /** 编辑生产设备 */
    editAssetsById(id: string, data: Record<string, any>): Promise<any> {
        return this.request.put(`${this.baseUri}/${id}`, data)
    }
    /** 根据id删除生产设备 */
    deleteAssetsById(id: string) {
        return this.request.delete(`${this.baseUri}/${id}`)
    }
    /** 根据id查询生产设备 */
    getAssetById(id: string): Promise<any> {
        return this.request.get(`${this.baseUri}/${id}`)
    }
}
