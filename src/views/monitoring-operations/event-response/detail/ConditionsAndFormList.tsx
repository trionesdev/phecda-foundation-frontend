import React from 'react';
// import styles from './index.module.less';
import { Button, Form, Input, Space, Typography } from 'antd';
import { NamePath } from 'antd/es/form/interface';
import _ from 'lodash';
import { useSceneContext } from '../components/SceneProvider';
import { PlusOutlined } from '@ant-design/icons';

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
                {(conditionsFields, { add, remove }) => {
                    return (
                        <>
                            {conditionsFields?.map(
                                ({ key, name: conditionsFieldsName }) => {
                                    return (
                                        <div key={key}>
                                            <Typography.Text strong>
                                                条件{conditionsFieldsName}
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
