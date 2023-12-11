import React from 'react';
import { Form, InputNumber, Select, Space } from 'antd';
import { InternalNamePath, NamePath } from 'antd/es/form/interface';
import _ from 'lodash';
import { useSceneContext } from './SceneProvider';
import { operatorOptions } from '@/constants/consts';
import { OPERATOR } from '@/constants/enums';
type OperatorFormItemItemType = {
    namePath: NamePath;
    fullNamePath?: NamePath;
};
const OperatorFormItemItem: React.FC<OperatorFormItemItemType> = ({
    namePath,
    fullNamePath = namePath,
}) => {
    const { sceneForm } = useSceneContext();

    const getNamePath = (name: NamePath): NamePath => {
        return _.concat(namePath, name);
    };

    return (
        <Space>
            <Form.Item name={getNamePath('operator')}>
                <Select
                    style={{ width: 120 }}
                    options={operatorOptions}
                    placeholder="运算符"
                    onChange={(v) => {
                        sceneForm.setFieldValue(
                            _.concat(fullNamePath, 'params', 0),
                            undefined
                        );
                        sceneForm.setFieldValue(
                            _.concat(fullNamePath, 'params', 1),
                            undefined
                        );
                    }}
                />
            </Form.Item>
            <Form.Item
                name={[...(getNamePath('params') as InternalNamePath), 0]}
            >
                <InputNumber placeholder="参数" />
            </Form.Item>
            <Form.Item
                dependencies={[_.concat(fullNamePath, 'operator')]}
                noStyle
            >
                {({ getFieldValue }) => {
                    const operatorValue = getFieldValue(
                        _.concat(fullNamePath, 'operator')
                    );
                    if (
                        [
                            OPERATOR.CLOSED_INTERVAL,
                            OPERATOR.OPEN_INTERVAL,
                        ].includes(operatorValue)
                    ) {
                        return (
                            <Space>
                                <div style={{ marginBottom: 24 }}>~</div>
                                <Form.Item
                                    name={[
                                        ...(getNamePath(
                                            'params'
                                        ) as InternalNamePath),
                                        1,
                                    ]}
                                >
                                    <InputNumber placeholder="参数" />
                                </Form.Item>
                            </Space>
                        );
                    }

                    return <></>;
                }}
            </Form.Item>
        </Space>
    );
};

export default OperatorFormItemItem;
