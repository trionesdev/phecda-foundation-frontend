import { Form, FormInstance } from 'antd';
import ProductSelect from '@components/product-select';
import { FC } from 'react';

type ProductFormItemProps = {
    required?: boolean;
    form?: FormInstance;
    namePath?: any[];
};
export const ProductFormItem: FC<ProductFormItemProps> = ({
    required,
    form,
    namePath = [],
}) => {
    return (
        <Form.Item label={`产品`} name={namePath} required={required}>
            <ProductSelect
                style={{ minWidth: 180 }}
                placeholder={`请选择产品`}
            />
        </Form.Item>
    );
};
