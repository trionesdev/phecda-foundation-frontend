import { Button, ButtonProps, Form, Input, message, Select } from 'antd';
import React, { FC, useState } from 'react';
import { deviceApi } from '@apis';
import ProductSelect from '@components/product-select';
import { ModalForm } from '@moensun/antd-react-ext';

type DeviceFormProps = {
    isEdit?: boolean;
    onSuccess?: () => void;
    initValue?: Record<string, any>;
} & ButtonProps;

const DeviceForm: FC<DeviceFormProps> = ({
    onSuccess,
    isEdit,
    initValue,
    ...rest
}) => {
    const [open, setOpen] = useState(false);
    const handleSubmit = (values: any) => {
        deviceApi
            .createDevice(values)
            .then(() => {
                setOpen(false);
                message.success('保存成功');
                if (onSuccess) {
                    onSuccess();
                }
            })
            .catch((ex) => {
                message.error(ex.message);
            });
    };

    return (
        <ModalForm
            open={open}
            title={`添加设备`}
            trigger={<Button {...rest} />}
            layout={`vertical`}
            afterOpenChange={(op: boolean) => setOpen(op)}
            onSubmit={(values: any) => {
                !isEdit && handleSubmit(values);
                //TODO:编辑
                isEdit && message.error('TODO');
            }}
            initialValues={
                isEdit
                    ? {
                          productId: initValue?.productId,
                          name: initValue?.name,
                          remarkName: initValue?.remarkName,
                          nodeId: initValue?.nodeId,
                      }
                    : undefined
            }
        >
            <Form.Item
                label={`产品`}
                name={`productId`}
                rules={[{ required: true }]}
            >
                <ProductSelect />
            </Form.Item>
            <Form.Item
                label={`DeviceName/设备名称`}
                name={`name`}
                rules={[{ required: true }]}
            >
                <Input />
            </Form.Item>
            <Form.Item label={`备注名称`} name={`remarkName`}>
                <Input />
            </Form.Item>
        </ModalForm>
    );
};
export default DeviceForm;
