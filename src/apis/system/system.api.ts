import BaseApi from '../base.api';

export default class SystemApi extends BaseApi {
    private baseUri = '/be';

    //字典
    /** 根据id查询字典 */
    getDictionaryById(id: string): Promise<any> {
        return this.request.get(`${this.baseUri}/dict/dictionaries/${id}`);
    }
    /** 所有字典table */
    queryDictionariesPage(params: {
        pageNum: number;
        pageSize: number;
        [key: string]: any;
    }): Promise<any> {
        return this.request.get(`${this.baseUri}/dict/dictionaries/page`, {
            params,
        });
    }
    /** 新建字典 */
    addDictionary(params: Record<string, any>): Promise<any> {
        return this.request.post(`${this.baseUri}/dict/dictionaries`, params);
    }
    /** 编辑字典 */
    editDictionaryById(id: string, data: Record<string, any>): Promise<any> {
        return this.request.put(
            `${this.baseUri}/dict/dictionaries/${id}`,
            data
        );
    }
    /** 根据id删除字典 */
    deleteDictionaryById(id: string) {
        return this.request.delete(`${this.baseUri}/dict/dictionaries/${id}`);
    }

    //字典类型
    /** 根据id查询字典类型 */
    getDictionaryTypeById(id: string): Promise<any> {
        return this.request.get(`${this.baseUri}/dict/dictionaryType/${id}`);
    }
    /** 所有字典类型table */
    queryDictionaryTypesPage(params: {
        pageNum: number;
        pageSize: number;
        [key: string]: any;
    }): Promise<any> {
        return this.request.get(`${this.baseUri}/dict/dictionaryType/page`, {
            params,
        });
    }
    /** 新建字典类型 */
    addDictionaryType(params: Record<string, any>): Promise<any> {
        return this.request.post(`${this.baseUri}/dict/dictionaryType`, params);
    }
    /** 编辑字典类型 */
    editDictionaryTypeById(
        id: string,
        data: Record<string, any>
    ): Promise<any> {
        return this.request.put(
            `${this.baseUri}/dict/dictionaryType/${id}`,
            data
        );
    }
    /** 根据id删除字典类型 */
    deleteDictionaryTypeById(id: string) {
        return this.request.delete(`${this.baseUri}/dict/dictionaryType/${id}`);
    }

    /** 获取指定typeCode字典options */
    queryDictionariesOptions(params: { typeCode: string }): Promise<any> {
        return this.request.get(`${this.baseUri}/dict/dictionaries/list`, {
            params,
        });
    }
}
