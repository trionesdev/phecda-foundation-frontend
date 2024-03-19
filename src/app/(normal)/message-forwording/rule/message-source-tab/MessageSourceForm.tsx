import { ModalForm } from '@trionesdev/antd-react-ext';
import { Form, Input, notification } from 'antd';
import React, { FC, useEffect, useState } from 'react';
import { useRequest } from 'ahooks';
import { messageForwardingApi } from '@apis';

type MessageSourceFormProps = {
    children?: React.ReactElement;
    id?: string;
    onRefresh?: () => void;
};
export const MessageSourceForm: FC<MessageSourceFormProps> = ({
    children,
    id,
    onRefresh,
}) => {
    const [open, setOpen] = useState(false);
    const { run: handleSubmit } = useRequest(
        (values: any) => {
            if (id) {
                return messageForwardingApi.updateSourceById(id, values);
            } else {
                return messageForwardingApi.createSource(values);
            }
        },
        {
            manual: true,
            onSuccess: () => {
                setOpen(false);
                notification.success({ message: '保存成功' });
                onRefresh?.();
            },
        }
    );

    useEffect(() => {}, [id]);

    return (
        <ModalForm
            open={open}
            afterOpenChange={setOpen}
            trigger={children}
            layout={`vertical`}
            title={`${id ? '编辑' : '创建'}数据源`}
            onSubmit={handleSubmit}
        >
            <Form.Item label={`数据源名称`} name={`name`} required={true}>
                <Input />
            </Form.Item>
            <Form.Item label={`数据源描述`} name={`description`}>
                <Input.TextArea autoSize={{ maxRows: 4 }} />
            </Form.Item>
        </ModalForm>
    );
};
