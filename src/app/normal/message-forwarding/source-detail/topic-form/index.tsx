import React, { FC } from 'react';
import { Form, message, Select } from 'antd';
import _ from 'lodash';
import { ModalForm } from '@trionesdev/antd-react-ext';
import { useRequest } from 'ahooks';
import { messageForwardingApi } from '@apis';
import { MESSAGE_SOURCE_TOPIC_TYPE } from '@/app/normal/message-forwarding/internal/message-forwarding.enums';
import { MessageSourceTopicTypeOptions } from '@/app/normal/message-forwarding/internal/message-forwarding.constants';
import { ThingPropertyReport } from '@/app/normal/message-forwarding/source-detail/topic-form/ThingPropertyReport';

type TopicFormProps = {
    children?: React.ReactElement;
    sourceId: string;
    onRefresh?: () => void;
};
export const TopicForm: FC<TopicFormProps> = ({
    children,
    sourceId,
    onRefresh,
}) => {
    const [open, setOpen] = React.useState(false);
    const [form] = Form.useForm();
    const type = Form.useWatch('type', form);
    const { run: handleCreateSourceTopic } = useRequest(
        (data) =>
            messageForwardingApi.createSourceTopic(sourceId, {
                properties: data,
            }),
        {
            manual: true,
            onSuccess: async () => {
                message.success('添加Topic成功');
                setOpen(false);
                onRefresh?.();
            },
            onError: async (error) => {
                message.error(error.message);
            },
        }
    );

    return (
        <ModalForm
            trigger={children}
            form={form}
            open={open}
            afterOpenChange={setOpen}
            title={`添加Topic`}
            layout={`vertical`}
            onSubmit={handleCreateSourceTopic}
        >
            <Form.Item
                label={`消息类型`}
                name={`type`}
                initialValue={MESSAGE_SOURCE_TOPIC_TYPE.THING_PROPERTY_REPORT}
            >
                <Select options={MessageSourceTopicTypeOptions} />
            </Form.Item>
            {_.isEqual(
                type,
                MESSAGE_SOURCE_TOPIC_TYPE.THING_PROPERTY_REPORT
            ) && <ThingPropertyReport />}
        </ModalForm>
    );
};
