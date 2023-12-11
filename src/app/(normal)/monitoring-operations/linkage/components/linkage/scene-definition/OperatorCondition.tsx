import React, { FC } from 'react';
import { StateCondition } from '@/app/(normal)/monitoring-operations/linkage/components/linkage/scene-definition/StateCondition';
import { Form, FormInstance } from 'antd';
import _ from 'lodash';

type OperatorConditionProps = {
    editing?: boolean;
    index?: number;
    form?: FormInstance;
    namePath?: any;
    onRemoveOperatorCondition?: (index: number) => void;
};
export const OperatorCondition: FC<OperatorConditionProps> = ({
    editing,
    index = 0,
    form,
    namePath,
    onRemoveOperatorCondition,
}) => {
    const operatorConditionChildren =
        Form.useWatch([...namePath, 'children'], { form, preserve: true }) ||
        [];
    const handleAddAndStateCondition = () => {
        form?.setFieldValue(
            [...namePath, 'children'],
            _.concat(form?.getFieldValue([...namePath, 'children']), {})
        );
    };

    const handleRemoveAndStateCondition = (stateConditionIndex: number) => {
        if (_.size(operatorConditionChildren) > 1) {
            _.pullAt(operatorConditionChildren, stateConditionIndex);
            form?.setFieldValue(
                [...namePath, 'children'],
                _.cloneDeep(operatorConditionChildren)
            );
        } else {
            onRemoveOperatorCondition?.(index);
        }
    };

    return (
        <>
            <div style={{ fontWeight: 'bold' }}>
                {index === 0 ? '且' : '或'}满足以下条件
            </div>
            {operatorConditionChildren.map(
                (stateCondition: any, index: number) => {
                    return (
                        <StateCondition
                            key={`state-condition-${index}`}
                            editing={editing}
                            index={index}
                            form={form}
                            namePath={[...namePath, 'children', index]}
                            lastCondition={
                                index == _.size(operatorConditionChildren) - 1
                            }
                            onAddAndSateCondition={handleAddAndStateCondition}
                            onRemoveAndSateCondition={
                                handleRemoveAndStateCondition
                            }
                        />
                    );
                }
            )}
        </>
    );
};
