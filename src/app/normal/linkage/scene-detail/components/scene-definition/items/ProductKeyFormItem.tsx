import { Form, FormInstance } from 'antd';
import { FC } from 'react';
import { ProductKeySelect } from '@/app/normal/device/components';

type ProductFormItemProps = {
    required?: boolean;
    form?: FormInstance;
    namePath?: any[];
};
export const ProductKeyFormItem: FC<ProductFormItemProps> = ({
    required,
    form,
    namePath = [],
}) => {
    return (
        <Form.Item label={`产品`} name={namePath} required={required}>
            <ProductKeySelect
                style={{ minWidth: 180 }}
                placeholder={`请选择产品`}
            />
        </Form.Item>
    );
};
