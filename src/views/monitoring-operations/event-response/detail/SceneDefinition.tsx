import React from 'react';
// import styles from './index.module.less';
import { Divider, Form, Input, Select, Space, Typography } from 'antd';
import { NamePath } from 'antd/es/form/interface';
import _ from 'lodash';
import { useSceneContext } from '../components/SceneProvider';
import ConditionsFormList from './ConditionsFormList';

type SceneDefinitionType = {
    // name: NamePath;
};
const SceneDefinition: React.FC<SceneDefinitionType> = () => {
    const { sceneForm } = useSceneContext();
    const getFilterConditionNamePath = (name: NamePath): NamePath => {
        return _.concat('filterCondition', name);
    };
    return (
        <div>
            <Typography.Title level={3}>场景定义</Typography.Title>
            <Typography.Title level={5}>当以下事件发生</Typography.Title>
            <Space wrap>
                <Form.Item
                    label="场景事件类型"
                    name={getFilterConditionNamePath('type')}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="产品"
                    name={getFilterConditionNamePath('product')}
                >
                    <Select style={{ width: 180 }} />
                </Form.Item>
                <Form.Item
                    label="设备"
                    name={getFilterConditionNamePath('deviceName')}
                >
                    <Select style={{ width: 180 }} />
                </Form.Item>
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
            <Divider />
            <ConditionsFormList />
        </div>
    );
};

export default SceneDefinition;
