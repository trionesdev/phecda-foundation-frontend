import React from 'react';
import { Button, Form, Input, Select, Space, Typography } from 'antd';
import { NamePath } from 'antd/es/form/interface';
import _ from 'lodash';
import { useSceneContext } from './SceneProvider';
import { PlusOutlined } from '@ant-design/icons';

type ActionsFormListType = {
    // name: NamePath;
};
const ActionsFormList: React.FC<ActionsFormListType> = () => {
    const { sceneForm } = useSceneContext();

    return (
        <div>
            <Typography.Title level={3}>场景动作</Typography.Title>
            <Form.List name="actions" initialValue={[{}]}>
                {(conditionsFields, { add, remove }) => {
                    return (
                        <>
                            {conditionsFields?.map(({ key, name }) => {
                                return (
                                    <div key={key}>
                                        <Typography.Text strong>
                                            场景动作{name + 1}
                                        </Typography.Text>
                                        <Space wrap>
                                            <Form.Item
                                                name={[name, 'type']}
                                                label="场景动作类型"
                                            >
                                                {/* <Select
                                                    style={{ width: 180 }}
                                                /> */}
                                                <Input />
                                            </Form.Item>
                                            <Form.Item>
                                                <Button
                                                    type="link"
                                                    danger
                                                    size="small"
                                                    onClick={() => {
                                                        remove(name);
                                                    }}
                                                >
                                                    删除
                                                </Button>
                                            </Form.Item>
                                        </Space>
                                    </div>
                                );
                            })}
                            <Form.Item>
                                <Button
                                    disabled={conditionsFields.length >= 3}
                                    type="link"
                                    onClick={() => add()}
                                    icon={<PlusOutlined />}
                                >
                                    新增场景动作
                                </Button>
                            </Form.Item>
                        </>
                    );
                }}
            </Form.List>
        </div>
    );
};

export default ActionsFormList;
