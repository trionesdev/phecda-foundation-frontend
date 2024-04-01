import { AxiosInstance } from 'axios';
import ajax from '@commons/lib/asiox.lib';

class BaseApi {
    protected request: AxiosInstance;
    constructor() {
        this.request = ajax;
    }
}
export default BaseApi;
