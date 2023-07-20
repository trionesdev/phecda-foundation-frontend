import { FC, useState } from 'react';
import { Button, ButtonProps, Form, Input, message, Radio } from 'antd';
import { deviceApi } from '@apis';
import { DeviceNodeType } from '../support/device.constants';
import _ from 'lodash';
import DrawerForm from '@/components/drawer-form';

type ProductFormBtnProps = {
    id?: string;
    onSuccess?: () => void;
} & ButtonProps;
const ProductFormBtn: FC<ProductFormBtnProps> = ({
    id,
    onSuccess,
    ...rest
}) => {
    const [open, setOpen] = useState(false);
    const handleSubmit = (values: any) => {
        let request: Promise<any>;
        if (id) {
            request = deviceApi.updateProductById(id, values);
        } else {
            request = deviceApi.createProduct(values);
        }
        request.then(() => {
            setOpen(false);
            message.success('操作成功');
            if (onSuccess) {
                onSuccess();
            }
        });
    };

    return (
        <DrawerForm
            open={open}
            trigger={<Button {...rest} />}
            title={`${id ? '编辑' : '新建'}产品`}
            layout={`vertical`}
            onOpenChange={(op) => setOpen(op)}
            initialValues={{ nodeType: 'DIRECT' }}
            onSubmit={handleSubmit}
        >
            <Form.Item
                rules={[{ required: true }]}
                label={`名称`}
                name={`name`}
            >
                <Input />
            </Form.Item>
            <Form.Item label={`节点类型`} name={`nodeType`}>
                <Radio.Group>
                    {_.map(DeviceNodeType, (value, key) => (
                        <Radio.Button key={key} value={key}>
                            {value}
                        </Radio.Button>
                    ))}
                </Radio.Group>
            </Form.Item>
        </DrawerForm>
    );
};
export default ProductFormBtn;
