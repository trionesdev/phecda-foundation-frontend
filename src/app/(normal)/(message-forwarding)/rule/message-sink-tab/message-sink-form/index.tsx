import { ModalForm } from '@trionesdev/antd-react-ext';
import React, { FC, useEffect } from 'react';
import { Form, Input, message, Select } from 'antd';
import { MessageSinkTypeOptions } from '@/app/(normal)/(message-forwarding)/internal/message-forwarding.constants';
import _ from 'lodash';
import { MESSAGE_SINK_TYPE } from '@/app/(normal)/(message-forwarding)/internal/message-forwarding.enums';
import { useRequest } from 'ahooks';
import { messageForwardingApi } from '@apis';
import { KafkaSinkAction } from '@/app/(normal)/(message-forwarding)/rule/message-sink-tab/message-sink-form/KafkaSinkAction';

type MessageSinkFormInnerProps = {
    id?: string;
    onRefresh?: () => void;
};

const MessageSinkFormInner: FC<MessageSinkFormInnerProps> = ({
    id,
    onRefresh,
}) => {
    const form = Form.useFormInstance();
    const type = Form.useWatch('type', form);
    const { run: handleQueryMessageSink } = useRequest(
        () => messageForwardingApi.queryMessageSinkById(id!),
        {
            manual: true,
            onSuccess: (res: any) => {
                form.setFieldsValue(res);
            },
        }
    );

    useEffect(() => {
        if (id) {
            handleQueryMessageSink();
        }
    }, [id]);

    return (
        <>
            <Form.Item label={`数据目的名称`} name={`name`} required={true}>
                <Input placeholder={`请输入数据目的名称`} />
            </Form.Item>
            <Form.Item label={`数据目的描述`} name={`description`}>
                <Input.TextArea
                    placeholder={`请输入数据目的描述`}
                    autoSize={{ maxRows: 4 }}
                />
            </Form.Item>
            <Form.Item
                label={`选择操作`}
                name={`type`}
                initialValue={MESSAGE_SINK_TYPE.KAFKA}
            >
                <Select options={MessageSinkTypeOptions} />
            </Form.Item>
            {_.isEqual(MESSAGE_SINK_TYPE.KAFKA, type) && <KafkaSinkAction />}
        </>
    );
};

type MessageSinkFormProps = {
    children?: React.ReactElement;
    id?: string;
    onRefresh?: () => void;
};
export const MessageSinkForm: FC<MessageSinkFormProps> = ({
    children,
    id,
    onRefresh,
}) => {
    const [open, setOpen] = React.useState(false);
    const { run: handleSubmit } = useRequest(
        (data: any) => {
            if (id) {
                return messageForwardingApi.updateMessageSinkById(id, data);
            } else {
                return messageForwardingApi.createMessageSink(data);
            }
        },
        {
            manual: true,
            onSuccess: async () => {
                message.success(`${id ? '修改' : '创建'}数据目的成功`);
                onRefresh?.();
                setOpen(false);
            },
            onError: async (ex) => {
                message.error(ex.message);
            },
        }
    );
    return (
        <ModalForm
            title={`${id ? '修改' : '创建'}数据目的`}
            trigger={children}
            open={open}
            afterOpenChange={setOpen}
            layout={`vertical`}
            onSubmit={handleSubmit}
        >
            <MessageSinkFormInner id={id} onRefresh={onRefresh} />
        </ModalForm>
    );
};
