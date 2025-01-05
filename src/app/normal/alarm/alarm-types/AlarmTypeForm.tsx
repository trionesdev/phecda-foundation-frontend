import React, { FC, useEffect, useState } from 'react';
import { ModalForm } from '@trionesdev/antd-react-ext';
import { Form, Input, message } from 'antd';
import { alarmApi } from '@apis/tenant';

type AlarmTypeFormProps = {
    children?: React.ReactElement;
    id?: string;
    onRefresh?: () => void;
    [key: string]: any;
};
export const AlarmTypeForm: FC<AlarmTypeFormProps> = ({
                                                          children,
                                                          id,
                                                          onRefresh,
                                                          ...rest
                                                      }) => {
    const [open, setOpen] = useState(false);
    const [form] = Form.useForm();

    const handleSubmit = (values: any) => {
        let request = null;
        if (id) {
            request = alarmApi.updateAlarmType(id, values);
        } else {
            request = alarmApi.createAlarmType(values);
        }
        request
            .then(async () => {
                onRefresh && onRefresh();
                message.success(`${id ? `编辑` : `新增`}报警类型成功`);
                setOpen(false);
            })
            .catch(async (ex) => {
                message.error(ex.message);
            });
    };

    const handlerQueryById = () => {
        alarmApi.queryAlarmTypeById(id!).then((res: any) => {
            if (res) {
                form.setFieldsValue(res);
            }
        });
    };

    useEffect(() => {
        if (open && id) {
            handlerQueryById();
        }
    }, [open, id]);

    return (
        <ModalForm
            trigger={children}
            onTriggerClick={() => setOpen(true)}
            onClose={() => {
                setOpen(false);
            }}
            onCancel={() => {
                setOpen(false);
            }}
            open={open}
            form={form}
            title={`${id ? `编辑` : `新增`}报警类型`}
            formProps={{ layout: 'vertical' }}
            afterOpenChange={(op) => setOpen(op)}
            onSubmit={handleSubmit}
        >
            <Form.Item label={`名称`} name={`name`} required={true}>
                <Input />
            </Form.Item>
            <Form.Item label={`标识`} name={`identifier`} required={true}>
                <Input />
            </Form.Item>
            <Form.Item label={`描述`} name={`description`}>
                <Input.TextArea />
            </Form.Item>
        </ModalForm>
    );
};
