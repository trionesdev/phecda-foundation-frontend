import { ModalForm } from '@trionesdev/antd-react-ext';
import React, { FC, useEffect, useState } from 'react';
import { Form, Input, message } from 'antd';
import { notificationApi } from '@apis';

type ContactFormProps = {
    children?: React.ReactElement;
    id?: string;
    onRefresh?: () => void;
};

export const ContactForm: FC<ContactFormProps> = ({
    children,
    id,
    onRefresh,
}) => {
    const [open, setOpen] = useState(false);
    const [formValues, setFormValues] = useState({});

    const handleSubmit = (values: any) => {
        let request = id
            ? notificationApi.updateContactById(id, values)
            : notificationApi.createContact(values);
        request
            .then(async () => {
                setOpen(false);
                onRefresh && onRefresh();
                message.success(`${id ? '编辑' : '新建'}联系人成功`);
            })
            .catch(async (ex) => {
                message.error(ex.message);
            });
    };

    useEffect(() => {
        if (open && id) {
            notificationApi
                .findContactById(id)
                .then(async (res: any) => {
                    setFormValues(res);
                })
                .catch(async (ex) => {
                    message.error(ex.message);
                });
        } else {
            setFormValues({});
        }
    }, [open, id]);

    return (
        <ModalForm
            trigger={children}
            title={`${id ? '编辑' : '新建'}联系人`}
            open={open}
            afterOpenChange={setOpen}
            onSubmit={handleSubmit}
            formValues={formValues}
            formProps={{ layout: 'vertical' }}
        >
            <Form.Item
                label={`姓名`}
                name={`name`}
                rules={[{ required: true }]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                label={`手机`}
                name={`phone`}
                rules={[{ required: true }]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                label={`邮箱`}
                name={`email`}
                rules={[{ required: true }]}
            >
                <Input />
            </Form.Item>
        </ModalForm>
    );
};
