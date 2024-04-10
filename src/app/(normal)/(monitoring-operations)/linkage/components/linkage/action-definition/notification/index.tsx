import { Form, FormInstance, Select, Space } from 'antd';
import { FC } from 'react';
import {
    ChannelTypeOptions,
    ContactsTypeOptions,
} from '@/domains/linkage/linkage.constants';
import _ from 'lodash';
import { CONTACTS_TYPE } from '@/domains/linkage/linkage.enums';
import { ContactSelect } from '@/app/(normal)/(monitoring-operations)/linkage/components/linkage/action-definition/notification/ContactSelect';
import { ContactGroupSelect } from '@/app/(normal)/(monitoring-operations)/linkage/components/linkage/action-definition/notification/ContactGroupSelect';
import { TemplateSelect } from '@/app/(normal)/(monitoring-operations)/linkage/components/linkage/action-definition/notification/TemplateSelect';

type NotificationActionProps = {
    form?: FormInstance;
    namePath?: any[];
};
export const NotificationAction: FC<NotificationActionProps> = ({
    form,
    namePath = [],
}) => {
    const contactsType = Form.useWatch(
        _.concat([], namePath, 'contactsType'),
        form
    );
    return (
        <Space align={`start`}>
            <Form.Item
                label={`联系人类型`}
                name={[...namePath, `contactsType`]}
                required={true}
            >
                <Select
                    options={ContactsTypeOptions}
                    style={{ minWidth: 175 }}
                    allowClear={true}
                />
            </Form.Item>
            {_.isEqual(CONTACTS_TYPE.CONTACTS, contactsType) && (
                <>
                    <Form.Item
                        label={`联系人`}
                        name={[...namePath, `contactIds`]}
                        required={true}
                    >
                        <ContactSelect
                            style={{ minWidth: 175 }}
                            allowClear={true}
                        />
                    </Form.Item>
                </>
            )}
            {_.isEqual(CONTACTS_TYPE.CONTACTS_GROUP, contactsType) && (
                <>
                    <Form.Item
                        label={`联系人组`}
                        name={[...namePath, `contactGroupIds`]}
                        required={true}
                    >
                        <ContactGroupSelect
                            style={{ minWidth: 175 }}
                            allowClear={true}
                        />
                    </Form.Item>
                </>
            )}
            <Form.Item
                label={`通道类型`}
                name={[...namePath, `channelType`]}
                required={true}
            >
                <Select
                    options={ChannelTypeOptions}
                    style={{ minWidth: 175 }}
                    allowClear={true}
                />
            </Form.Item>
            <Form.Item
                label={`模板`}
                name={[...namePath, `templateId`]}
                required={true}
            >
                <TemplateSelect style={{ minWidth: 175 }} allowClear={true} />
            </Form.Item>
        </Space>
    );
};
