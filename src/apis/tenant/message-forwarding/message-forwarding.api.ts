import {BaseTenantApi} from "@apis/tenant/base-tenant.api.ts";

export default class MessageForwardingApi extends BaseTenantApi {
    private baseUri = '/message-forwarding';

    //region message source
    createSource(data: any) {
        return this.request.post(`${this.baseUri}/sources`, data);
    }

    deleteSourceById(id: string) {
        return this.request.delete(`${this.baseUri}/sources/${id}`);
    }

    updateSourceById(id: string, data: any) {
        return this.request.put(`${this.baseUri}/sources/${id}`, data);
    }

    querySourceById(id: string) {
        return this.request.get(`${this.baseUri}/sources/${id}`);
    }

    querySourcesList() {
        return this.request.get(`${this.baseUri}/sources/list`);
    }

    createSourceTopic(sourceId: string, data: any) {
        return this.request.post(
            `${this.baseUri}/sources/${sourceId}/topics`,
            data
        );
    }

    querySourceTopicsList(sourceId: string) {
        return this.request.get(
            `${this.baseUri}/sources/${sourceId}/topics/list`
        );
    }

    deleteSourceTopicById(sourceId: string, topicId: string) {
        return this.request.delete(
            `${this.baseUri}/sources/${sourceId}/topics/${topicId}`
        );
    }

    //endregion

    //region message sink
    createMessageSink(data: any) {
        return this.request.post(`${this.baseUri}/sinks`, data);
    }

    deleteMessageSinkById(id: string) {
        return this.request.delete(`${this.baseUri}/sinks/${id}`);
    }

    updateMessageSinkById(id: string, data: any) {
        return this.request.put(`${this.baseUri}/sinks/${id}`, data);
    }

    queryMessageSinkById(id: string) {
        return this.request.get(`${this.baseUri}/sinks/${id}`);
    }

    queryMessageSinkList() {
        return this.request.get(`${this.baseUri}/sinks/list`);
    }

    //endregion

    //region forwarding rules
    createForwardingRule(data: any) {
        return this.request.post(`${this.baseUri}/forwarding-rules`, data);
    }

    deleteForwardingRuleById(id: string) {
        return this.request.delete(`${this.baseUri}/forwarding-rules/${id}`);
    }

    updateForwardingRuleById(id: string, data: any) {
        return this.request.put(`${this.baseUri}/forwarding-rules/${id}`, data);
    }

    queryForwardingRuleById(id: string) {
        return this.request.get(`${this.baseUri}/forwarding-rules/${id}`);
    }

    queryForwardingRuleList() {
        return this.request.get(`${this.baseUri}/forwarding-rules/list`);
    }

    enableForwardingRuleById(id: string) {
        return this.request.put(
            `${this.baseUri}/forwarding-rules/${id}/enabled`
        );
    }

    disableForwardingRuleById(id: string) {
        return this.request.put(
            `${this.baseUri}/forwarding-rules/${id}/disabled`
        );
    }

    addForwardingRuleSource(id: string, data: any) {
        return this.request.post(
            `${this.baseUri}/forwarding-rules/${id}/sources`,
            data
        );
    }

    deleteForwardingRuleSource(ruleId: string, sourceId: string) {
        return this.request.delete(
            `${this.baseUri}/forwarding-rules/${ruleId}/sources/source-id/${sourceId}`
        );
    }

    queryForwardingRuleSourcesList(id: string) {
        return this.request.get(
            `${this.baseUri}/forwarding-rules/${id}/sources/list`
        );
    }

    addForwardingRuleSink(id: string, data: any) {
        return this.request.post(
            `${this.baseUri}/forwarding-rules/${id}/sinks`,
            data
        );
    }

    deleteForwardingRuleSink(ruleId: string, sinkId: string) {
        return this.request.delete(
            `${this.baseUri}/forwarding-rules/${ruleId}/sinks/sink-id/${sinkId}`
        );
    }

    queryForwardingRuleSinksList(id: string) {
        return this.request.get(
            `${this.baseUri}/forwarding-rules/${id}/sinks/list`
        );
    }

    //endregion
}
