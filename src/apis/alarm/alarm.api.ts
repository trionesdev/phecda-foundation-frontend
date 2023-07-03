import BaseApi from '../base.api'

export default class AlarmApi extends BaseApi {
    private baseUri = '/be/assets'

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
                },
                {
                    id: '1',
                    code: '001',
                },
                {
                    id: '2',
                    code: '001',
                },
                {
                    id: '3',
                    code: '001',
                },
            ],
        })
    }
}
