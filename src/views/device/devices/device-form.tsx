import { Button, ButtonProps, Form, Input, message } from 'antd';
import { FC, useState } from 'react';
import { deviceApi } from '@apis';
import ProductSelect from '@components/product-select';
import ModalForm from '@/components/modal-form';

type DeviceFormProps = {
    onSuccess?: () => void;
} & ButtonProps;
const DeviceForm: FC<DeviceFormProps> = ({ onSuccess, ...rest }) => {
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
            onOpenChange={(op) => setOpen(op)}
            onSubmit={handleSubmit}
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
