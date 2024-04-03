import { ModalForm } from '@trionesdev/antd-react-ext';
import React, { FC, useState } from 'react';
import { Form, Input } from 'antd';

type ContactFormProps = {
    children?: React.ReactElement;
    id?: string;
};

export const ContactForm: FC<ContactFormProps> = ({ children, id }) => {
    const [open, setOpen] = useState(false);
    return (
        <ModalForm
            trigger={children}
            title={`${id ? '编辑' : '新建'}联系人`}
            open={open}
            afterOpenChange={setOpen}
            layout={`vertical`}
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
        </ModalForm>
    );
};
