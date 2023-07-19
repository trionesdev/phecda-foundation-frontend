import React from 'react';
import { Form, Input, Select, Space, Typography } from 'antd';
import { NamePath } from 'antd/es/form/interface';
import _ from 'lodash';
import { SceneEventOptions } from '@/constants/consts';
import useQueryDeviceByParams from '@/hooks/useOptions/useQueryDeviceByParams';
import ProductDeviceFormItem from './ProductDeviceFormItem';
type FilterConditionFormItemType = {
    // name: NamePath;
};
const FilterConditionFormItem: React.FC<FilterConditionFormItemType> = () => {
    const { deviceDataOptions } = useQueryDeviceByParams();
    const getFilterConditionNamePath = (name: NamePath): NamePath => {
        return _.concat('filterCondition', name);
    };
    console.log(deviceDataOptions);
    return (
        <div>
            <Typography.Title level={3}>场景定义</Typography.Title>
            <Typography.Title level={5}>当以下事件发生</Typography.Title>
            <Space wrap>
                <Form.Item
                    label="场景事件类型"
                    name={getFilterConditionNamePath('type')}
                >
                    <Select
                        style={{ width: 180 }}
                        options={SceneEventOptions}
                    />
                </Form.Item>
                <ProductDeviceFormItem namePath="filterCondition" />
                <Form.Item
                    label="运算符"
                    name={getFilterConditionNamePath('operator')}
                >
                    <Select style={{ width: 180 }} />
                </Form.Item>
                <Form.Item
                    label="参数"
                    name={getFilterConditionNamePath('params')}
                >
                    <Input />
                </Form.Item>
            </Space>
        </div>
    );
};

export default FilterConditionFormItem;
