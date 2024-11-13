import React, { FC, useState } from 'react';
import { ModalForm } from '@trionesdev/antd-react-ext';
import { Form, Input, message } from 'antd';
import { alarmApi } from '@apis/tenant';

type AlarmTypeFormProps = {
    children?: React.ReactElement;
    id?: string;
    onRefresh?: () => void;
    [key: string]: any;
};
export const AlarmLevelForm: FC<AlarmTypeFormProps> = ({
    children,
    id,
    onRefresh,
    ...rest
}) => {
    const [open, setOpen] = useState(false);

    const handleSubmit = (values: any) => {
        let request = null;
        if (id) {
            request = alarmApi.updateAlarmLevel(id, values);
        } else {
            request = alarmApi.createAlarmLevel(values);
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

    return (
        <ModalForm
            trigger={children}
            open={open}
            title={`${id ? `编辑` : `新增`}报警级别`}
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
