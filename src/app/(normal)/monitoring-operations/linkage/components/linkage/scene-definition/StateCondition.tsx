import { Button, Divider, Form, FormInstance, Space } from 'antd';
import { ConditionTypeFormItem } from '@/app/(normal)/monitoring-operations/linkage/components/linkage/scene-definition/items/ConditionTypeFormItem';
import React, { FC } from 'react';
import _ from 'lodash';
import { STATE_CONDITION_TYPE } from '@/domains/linkage/linkage.enums';
import { ThingPropertyStateIdentifier } from '@/app/(normal)/monitoring-operations/linkage/components/linkage/scene-definition/state-identifier/ThingPropertyStateIdentifier';

type StateConditionProps = {
    editing?: boolean;
    index?: number;
    form?: FormInstance;
    namePath?: any;
    lastCondition?: boolean;
    onAddAndSateCondition?: () => void;
    onRemoveAndSateCondition?: (index: number) => void;
};
export const StateCondition: FC<StateConditionProps> = ({
    editing,
    index = 0,
    form,
    namePath,
    lastCondition,
    onAddAndSateCondition,
    onRemoveAndSateCondition,
}) => {
    const stateConditionType = Form.useWatch(
        [...namePath, 'stateIdentifier', 'type'],
        { form }
    );

    return (
        <div>
            <div style={{ padding: '4px 0px' }}>条件{index + 1}</div>
            <Space>
                <ConditionTypeFormItem
                    form={form}
                    namePath={[...namePath, 'stateIdentifier', 'type']}
                    required={true}
                />
                {_.isEqual(
                    STATE_CONDITION_TYPE.THING_PROPERTY_VALUE,
                    stateConditionType
                ) && (
                    <ThingPropertyStateIdentifier
                        form={form}
                        namePath={[...namePath]}
                    />
                )}

                {editing && (
                    <Form.Item label={<span></span>}>
                        {lastCondition && (
                            <>
                                <Button
                                    size={`small`}
                                    type={`link`}
                                    onClick={onAddAndSateCondition}
                                >
                                    添加且条件
                                </Button>
                                <Divider type={`vertical`} />
                            </>
                        )}
                        <Button
                            size={`small`}
                            type={`link`}
                            onClick={() => onRemoveAndSateCondition?.(index)}
                        >
                            删除
                        </Button>
                    </Form.Item>
                )}
            </Space>
        </div>
    );
};
