import React from 'react';
import { Form, Select, Space } from 'antd';
import { NamePath } from 'antd/es/form/interface';
import _ from 'lodash';
import { useSceneContext } from './SceneProvider';
import useQueryProductsList from '@/hooks/useOptions/useQueryProductsList';
import useQueryDeviceByParams from '@/hooks/useOptions/useQueryDeviceByParams';
type ProductDeviceFormItemType = {
    namePath: NamePath;
    fullNamePath?: NamePath;
};
const ProductDeviceFormItem: React.FC<ProductDeviceFormItemType> = ({
    namePath,
    fullNamePath = namePath,
}) => {
    const { sceneForm } = useSceneContext();
    const { productOptions } = useQueryProductsList();
    const { deviceDataOptions, queryDeviceList } = useQueryDeviceByParams();
    const getNamePath = (name: NamePath): NamePath => {
        return _.concat(namePath, name);
    };
    return (
        <Space>
            <Form.Item label="产品" name={getNamePath('product')}>
                <Select
                    style={{ width: 180 }}
                    options={productOptions}
                    onChange={(v) => {
                        queryDeviceList({
                            productId: v,
                        });
                        sceneForm.setFieldValue(
                            _.concat(fullNamePath, 'deviceName'),
                            undefined
                        );
                    }}
                />
            </Form.Item>
            <Form.Item label="设备" name={getNamePath('deviceName')}>
                <Select style={{ width: 180 }} options={deviceDataOptions} />
            </Form.Item>
        </Space>
    );
};

export default ProductDeviceFormItem;
