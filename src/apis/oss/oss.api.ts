import BaseApi from '../base.api'

class OssApi extends BaseApi {
    private baseUri = '/backend/oss'
    imageUpload(formData?: any) {
        return this.request.post(`${this.baseUri}/image/upload`, formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
        })
    }
}

export default OssApi
