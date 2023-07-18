import React from 'react';
// import styles from './index.module.less';
import { Button, Form, Input, Space, Typography } from 'antd';
import { NamePath } from 'antd/es/form/interface';
import _ from 'lodash';
import { useSceneContext } from '../components/SceneProvider';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import ConditionsAndFormList from './ConditionsAndFormList';

type ConditionsFormListType = {
    // name: NamePath;
};
const ConditionsFormList: React.FC<ConditionsFormListType> = () => {
    const { sceneForm } = useSceneContext();
    const getConditionsNamePath = (name: NamePath): NamePath => {
        return _.concat('conditions', name);
    };
    return (
        <div>
            <Form.List name="conditions" initialValue={[[{}]]}>
                {(conditionsFields, { add, remove }) => {
                    return (
                        <>
                            {conditionsFields?.map(
                                ({
                                    key: conditionsKey,
                                    name: conditionsName,
                                }) => {
                                    return (
                                        <div key={conditionsKey}>
                                            <Typography.Title level={5}>
                                                {conditionsName === 0
                                                    ? '且'
                                                    : '或'}
                                                满足以下条件
                                                {conditionsName !== 0 && (
                                                    <MinusCircleOutlined
                                                        style={{
                                                            marginLeft: 10,
                                                        }}
                                                        onClick={() => {
                                                            remove(
                                                                conditionsName
                                                            );
                                                        }}
                                                    />
                                                )}
                                            </Typography.Title>

                                            <ConditionsAndFormList
                                                name={conditionsName}
                                            />
                                        </div>
                                    );
                                }
                            )}
                            <Form.Item>
                                <Button
                                    type="link"
                                    onClick={() => add()}
                                    icon={<PlusOutlined />}
                                >
                                    新增"或"条件组
                                </Button>
                            </Form.Item>
                        </>
                    );
                }}
            </Form.List>
        </div>
    );
};

export default ConditionsFormList;
