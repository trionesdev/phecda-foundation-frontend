import {BaseTenantApi} from "@apis/tenant/base-tenant.api.ts";

class OssApi extends BaseTenantApi {
    private baseUri = '/backend/oss';
    imageUpload(formData?: any) {
        return this.request.post(`${this.baseUri}/image/upload`, formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
        });
    }
}

export default OssApi;
