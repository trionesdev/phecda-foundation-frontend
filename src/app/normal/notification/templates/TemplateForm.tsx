import { ModalForm } from '@trionesdev/antd-react-ext';
import React, { FC, useEffect, useState } from 'react';
import { Form, Input, message, Space, Spin } from 'antd';
import { notificationApi } from '@apis/tenant';
import { useRequest } from 'ahooks';

type TemplateFormProps = {
    children?: React.ReactElement;
    id?: string;
    onRefresh?: () => void;
};
export const TemplateForm: FC<TemplateFormProps> = ({
    children,
    id,
    onRefresh,
}) => {
    const [open, setOpen] = useState(false);
    const [formValues, setFormValues] = useState({});

    const handleSubmit = (values: any) => {
        let request = id
            ? notificationApi.updateTemplateById(id, values)
            : notificationApi.createTemplate(values);
        request
            .then(async (res) => {
                setOpen(false);
                message.success(`保存成功`);
                onRefresh?.();
            })
            .catch(async (res: any) => {
                message.error(res.message);
            });
    };

    const { run: handleQueryById, loading } = useRequest(
        () => notificationApi.findTemplateById(id!),
        {
            manual: false,
            onSuccess: (res: any) => {
                setFormValues(res);
            },
            onError: async (err: any) => {
                message.error(err.message);
            },
        }
    );

    useEffect(() => {
        if (id) {
            handleQueryById();
        }
    }, [id]);

    return (
        <ModalForm
            trigger={children}
            title={`${id ? '编辑' : '新建'}通知模板`}
            open={open}
            destroyOnClose={true}
            afterOpenChange={setOpen}
            formValues={formValues}
            formProps={{ layout: 'vertical' }}
            onSubmit={handleSubmit}
        >
            <Spin spinning={loading}>
                <Form.Item label={`标题`} name={`title`} required={true}>
                    <Input />
                </Form.Item>
                <Form.Item
                    label={`内容`}
                    name={`content`}
                    required={true}
                    extra={
                        <div
                            style={{ backgroundColor: '#d7d7d7', marginTop: 4 }}
                        >
                            <strong>可用变量：</strong>
                            <span
                                dangerouslySetInnerHTML={{
                                    __html: '产品Key：${productKey},产品名称：${productName},设备名称：${deviceName}',
                                }}
                            />
                        </div>
                    }
                >
                    <Input.TextArea />
                </Form.Item>
                <Form.Item label={`备注`} name={`remark`}>
                    <Input.TextArea />
                </Form.Item>
            </Spin>
        </ModalForm>
    );
};
