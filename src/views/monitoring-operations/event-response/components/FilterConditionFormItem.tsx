import React from 'react';
import { Form, Select, Space, Typography } from 'antd';
import { NamePath } from 'antd/es/form/interface';
import _ from 'lodash';
import { SceneEventOptions } from '@/constants/consts';
import ProductDeviceFormItem from './ProductDeviceFormItem';
import OperatorFormItemItem from './OperatorFormItem';
type FilterConditionFormItemType = {
    // name: NamePath;
};
const FilterConditionFormItem: React.FC<FilterConditionFormItemType> = () => {
    const getFilterConditionNamePath = (name: NamePath): NamePath => {
        return _.concat('filterCondition', name);
    };
    return (
        <div>
            <Typography.Title level={3}>场景定义</Typography.Title>
            <Typography.Title level={5}>当以下事件发生</Typography.Title>
            <Space wrap>
                <Form.Item name={getFilterConditionNamePath('type')}>
                    <Select
                        style={{ width: 180 }}
                        options={SceneEventOptions}
                        placeholder="场景事件类型"
                    />
                </Form.Item>
                <ProductDeviceFormItem namePath="filterCondition" />
                <OperatorFormItemItem namePath="filterCondition" />
            </Space>
        </div>
    );
};

export default FilterConditionFormItem;
