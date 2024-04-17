import React, { FC, useEffect, useState } from 'react';
import { ModalForm } from '@trionesdev/antd-react-ext';
import { Form, Input, message, Transfer } from 'antd';
import { notificationApi } from '@apis';
import { useRequest } from 'ahooks';

type ContactGroupFormProps = {
    children: React.ReactElement;
    id?: string;
    onRefresh?: () => void;
};

export const ContactGroupForm: FC<ContactGroupFormProps> = ({
    children,
    id,
    onRefresh,
}) => {
    const [open, setOpen] = useState(false);
    const [contacts, setContacts] = useState([]);
    const [formValues, setFormValues] = useState({});

    const { run: handleQueryContacts } = useRequest(
        () => {
            return notificationApi.findContacts();
        },
        {
            manual: true,
            onSuccess: (res: any) => {
                if (res) {
                    setContacts(res);
                }
            },
            onError: async (err) => {
                message.error(err.message);
            },
        }
    );

    const handleQueryContactGroupById = () => {
        if (id) {
            notificationApi
                .findContactGroupById(id)
                .then((res: any) => {
                    if (res) {
                        setFormValues(res || {});
                    }
                })
                .catch(async (err) => {
                    message.error(err.message);
                });
        }
    };

    const handleSubmit = (values: any) => {
        let request = id
            ? notificationApi.updateContactGroupById(id, values)
            : notificationApi.createContactGroup(values);
        request
            .then(async () => {
                message.success(`${id ? '编辑' : '新建'}成功`);
                setOpen(false);
                onRefresh && onRefresh();
            })
            .catch(async (err) => {
                message.error(err.message);
            });
    };

    useEffect(() => {
        if (open) {
            handleQueryContacts();
        }
    }, [open]);

    useEffect(() => {
        if (open && id) {
            handleQueryContactGroupById();
        }
    }, [open, id]);

    return (
        <ModalForm
            title={`${id ? '编辑' : '新建'}联系人组`}
            trigger={children}
            open={open}
            afterOpenChange={setOpen}
            layout={`vertical`}
            formValues={formValues}
            onSubmit={handleSubmit}
        >
            <Form.Item
                label={`名称`}
                name={`name`}
                rules={[{ required: true }]}
            >
                <Input />
            </Form.Item>
            <Form.Item label={`描述`} name={`description`}>
                <Input.TextArea rows={2} />
            </Form.Item>
            <Form.Item
                label={`组内人员`}
                name={`contactIds`}
                valuePropName={`targetKeys`}
            >
                <Transfer
                    listStyle={{
                        width: 250,
                        height: 400,
                    }}
                    showSearch={true}
                    dataSource={contacts}
                    rowKey={(record: any) => record.id}
                    render={(item) => item.name}
                    pagination
                />
            </Form.Item>
        </ModalForm>
    );
};
