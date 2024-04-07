import BaseApi from '@apis/base.api';

export class NotificationApi extends BaseApi {
    private baseUri = '/be/notification';

    //region contact
    createContact(data: any) {
        return this.request.post(`${this.baseUri}/contacts`, data);
    }

    deleteContact(id: string) {
        return this.request.delete(`${this.baseUri}/contacts/${id}`);
    }

    updateContactById(id: string, data: any) {
        return this.request.put(`${this.baseUri}/contacts/${id}`, data);
    }

    findContactById(id: string) {
        return this.request.get(`${this.baseUri}/contacts/${id}`);
    }

    findContacts(params?: { [key: string]: any }) {
        return this.request.get(`${this.baseUri}/contacts/list`, { params });
    }

    findContactsPage(params: {
        pageNum: number;
        pageSize: number;
        [key: string]: any;
    }) {
        return this.request.get(`${this.baseUri}/contacts/page`, { params });
    }
    //endregion

    //region contact group
    createContactGroup(data: any) {
        return this.request.post(`${this.baseUri}/contact-groups`, data);
    }

    deleteContactGroup(id: string) {
        return this.request.delete(`${this.baseUri}/contact-groups/${id}`);
    }

    updateContactGroupById(id: string, data: any) {
        return this.request.put(`${this.baseUri}/contact-groups/${id}`, data);
    }

    findContactGroupById(id: string) {
        return this.request.get(`${this.baseUri}/contact-groups/${id}`);
    }

    findContactGroupsPage(params: {
        pageNum: number;
        pageSize: number;
        [key: string]: any;
    }) {
        return this.request.get(`${this.baseUri}/contact-groups/page`, {
            params,
        });
    }
    //endregion
}
