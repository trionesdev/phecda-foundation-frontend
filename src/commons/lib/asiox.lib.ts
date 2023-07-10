import axios from 'axios';
import { Exception } from '../ex/exception';
import { getTenantUserToken } from '../util/storage.utils';
import { notification } from 'antd';

const request = axios.create({
    baseURL: '/api',
    headers: {
        'Content-Type': 'application/json;charset=UTF-8',
    },
});

request.interceptors.request.use((request) => {
    request.headers = Object.assign({}, request.headers);
    let token = getTenantUserToken();
    if (token) {
        request.headers['Authorization'] = 'Bearer ' + token;
    }
    return request;
});

request.interceptors.response.use(
    function (response) {
        return response.data;
    },
    function (error) {
        console.log(error);
        if (!error || !error.response) {
            notification.error({ message: '服务器异常，请稍后再试' });
            throw new Exception(500, '服务器异常，请稍后再试');
        }
        let status = error.response.status;
        if (status === 401) {
            //TODO
            window.location.href = `/#/sign-in`;
        } else if (status === 500) {
            notification.error({ message: '服务器异常，请稍后再试' });
            throw new Exception(500, '服务器异常，请稍后再试');
        } else if (status === 400) {
            notification.error({ message: '请求参数错误' });
            throw new Exception(400, '请求参数错误');
        } else {
            notification.error({
                message: error.response.data.message || '系统异常，请稍后再试',
            });
            throw (
                error.response.data ||
                new Exception(status, '系统异常，请稍后再试')
            );
        }
        return Promise.reject(error.response.data);
    }
);
export default request;
