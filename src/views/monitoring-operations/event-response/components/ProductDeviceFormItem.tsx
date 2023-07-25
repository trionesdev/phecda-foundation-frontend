import React, { useEffect } from 'react';
import { Form, Select, Space } from 'antd';
import { NamePath } from 'antd/es/form/interface';
import _ from 'lodash';
import useQueryProductsList from '@/hooks/useOptions/useQueryProductsList';
import useQueryDeviceByParams from '@/hooks/useOptions/useQueryDeviceByParams';
import useQueryProductProperty from '@/hooks/useOptions/useQueryProductProperty';
type ProductDeviceFormItemType = {
    namePath: NamePath;
    fullNamePath?: NamePath;
};
const ProductDeviceFormItem: React.FC<ProductDeviceFormItemType> = ({
    namePath,
    fullNamePath = namePath,
}) => {
    const form = Form.useFormInstance();
    const productId = Form.useWatch(_.concat(fullNamePath, 'product'), form);
    const { productOptions } = useQueryProductsList();
    const { deviceDataOptions, queryDeviceList } = useQueryDeviceByParams();
    const { propertyOptions, queryProductThingMode } =
        useQueryProductProperty();
    const getNamePath = (name: NamePath): NamePath => {
        return _.concat(namePath, name);
    };
    useEffect(() => {
        if (productId) {
            queryDeviceList({
                productId: productId,
            });
            queryProductThingMode(productId);
        }
    }, [productId, queryDeviceList, queryProductThingMode]);
    return (
        <Space>
            <Form.Item name={getNamePath('product')}>
                <Select
                    style={{ width: 180 }}
                    options={productOptions}
                    placeholder="产品"
                    onChange={(v) => {
                        form.setFieldValue(
                            _.concat(fullNamePath, 'deviceName'),
                            undefined
                        );
                        form.setFieldValue(
                            _.concat(fullNamePath, 'property'),
                            undefined
                        );
                    }}
                />
            </Form.Item>
            <Form.Item name={getNamePath('deviceName')}>
                <Select
                    placeholder="设备"
                    style={{ width: 180 }}
                    options={deviceDataOptions}
                />
            </Form.Item>
            <Form.Item name={getNamePath('property')}>
                <Select
                    placeholder="属性"
                    style={{ width: 180 }}
                    options={propertyOptions}
                />
            </Form.Item>
        </Space>
    );
};

export default ProductDeviceFormItem;
