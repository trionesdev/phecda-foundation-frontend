import React from 'react';
import { Button, Form, Typography } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import ConditionsAndFormList from './ConditionsAndFormList';

type ConditionsFormListType = {
    // name: NamePath;
};
const ConditionsFormList: React.FC<ConditionsFormListType> = () => {
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
                                                {conditionsFields.length >
                                                    1 && (
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
                                                namePath={[conditionsName]}
                                                fullNamePath={[
                                                    'conditions',
                                                    conditionsName,
                                                ]}
                                            />
                                        </div>
                                    );
                                }
                            )}
                            <Form.Item>
                                <Button
                                    disabled={conditionsFields.length >= 3}
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
