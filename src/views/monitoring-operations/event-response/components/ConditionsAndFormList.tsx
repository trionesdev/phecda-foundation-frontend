import React from 'react';
import { Button, Form, Input, Space, Typography } from 'antd';
import { NamePath } from 'antd/es/form/interface';
import _ from 'lodash';
import { useSceneContext } from '../components/SceneProvider';

type ConditionsAndFormListType = {
    name: NamePath;
};
const ConditionsAndFormList: React.FC<ConditionsAndFormListType> = ({
    name,
}) => {
    const { sceneForm } = useSceneContext();

    return (
        <div>
            <Form.List name={name} initialValue={[{}]}>
                {(conditionsListFields, { add, remove }) => {
                    return (
                        <>
                            {conditionsListFields?.map(
                                ({ key, name: conditionsFieldsName }) => {
                                    return (
                                        <div key={key}>
                                            <Typography.Text strong>
                                                条件{conditionsFieldsName + 1}
                                            </Typography.Text>
                                            <Space>
                                                <Form.Item
                                                    name={[
                                                        conditionsFieldsName,
                                                        'type',
                                                    ]}
                                                    label="条件类型"
                                                >
                                                    <Input />
                                                </Form.Item>
                                                <Form.Item
                                                    name={[
                                                        conditionsFieldsName,
                                                        'product',
                                                    ]}
                                                    label="产品"
                                                >
                                                    <Input />
                                                </Form.Item>
                                                <Form.Item>
                                                    <Space size={1}>
                                                        <Button
                                                            disabled={
                                                                conditionsListFields.length !==
                                                                    conditionsFieldsName +
                                                                        1 ||
                                                                conditionsListFields.length >=
                                                                    3
                                                            }
                                                            type="link"
                                                            onClick={() =>
                                                                add()
                                                            }
                                                            size="small"
                                                        >
                                                            添加"且"条件
                                                        </Button>
                                                        <Button
                                                            type="link"
                                                            danger
                                                            size="small"
                                                            onClick={() =>
                                                                remove(
                                                                    conditionsFieldsName
                                                                )
                                                            }
                                                        >
                                                            删除
                                                        </Button>
                                                    </Space>
                                                </Form.Item>
                                            </Space>
                                        </div>
                                    );
                                }
                            )}
                        </>
                    );
                }}
            </Form.List>
        </div>
    );
};

export default ConditionsAndFormList;
