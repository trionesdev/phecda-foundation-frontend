import React, { FC } from 'react';
import { Form, message, Select } from 'antd';
import { MessageSourceTopicTypeOptions } from '@/domains/message-forwarding/message-forwarding.constants';
import _ from 'lodash';
import { MESSAGE_SOURCE_TOPIC_TYPE } from '@/domains/message-forwarding/message-forwarding.enums';
import { ThingPropertyReport } from '@/app/(normal)/message-forwording/source-detail/topic-form/ThingPropertyReport';
import { ModalForm } from '@moensun/antd-react-ext';
import { useRequest } from 'ahooks';
import { messageForwardingApi } from '@apis';

const TopicFormInner = () => {
    const form = Form.useFormInstance();
    const type = Form.useWatch('type', form);
    return (
        <>
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
        </>
    );
};

type TopicFormProps = {
    children?: React.ReactElement;
    sourceId: string;
};
export const TopicForm: FC<TopicFormProps> = ({ children, sourceId }) => {
    const [open, setOpen] = React.useState(false);
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
            },
        }
    );

    return (
        <ModalForm
            trigger={children}
            open={open}
            afterOpenChange={setOpen}
            title={`添加Topic`}
            layout={`vertical`}
            onSubmit={handleCreateSourceTopic}
        >
            <TopicFormInner />
        </ModalForm>
    );
};
