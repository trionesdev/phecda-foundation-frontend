import { FC } from 'react';
import { Button, Divider, Form, FormInstance } from 'antd';
import _ from 'lodash';
import { OperatorCondition } from './OperatorCondition';

type ConditionsProps = {
    editing?: boolean;
    form?: FormInstance;
    namePath?: any;
};

export const Conditions: FC<ConditionsProps> = ({
    editing,
    form,
    namePath,
}) => {
    const operatorConditions = Form.useWatch([...namePath], {
        form,
        preserve: true,
    });
    const handleAddOperateCondition = () => {
        const newOperatorCondition = { children: [{}] };
        form?.setFieldValue(
            [...namePath],
            _.concat(
                [],
                form?.getFieldValue([...namePath]) || [],
                newOperatorCondition
            )
        );
    };

    const handleRemoveOperationCondition = (index: number) => {
        _.pullAt(operatorConditions, index);
        form?.setFieldValue([...namePath], _.cloneDeep(operatorConditions));
    };

    return (
        <div>
            {operatorConditions?.map((operator: any, index: number) => {
                return (
                    <OperatorCondition
                        key={`operator-condition-${index}`}
                        editing={editing}
                        index={index}
                        form={form}
                        namePath={[...namePath, index]}
                        onRemoveOperatorCondition={
                            handleRemoveOperationCondition
                        }
                    />
                );
            })}
            {editing && (
                <>
                    <Divider style={{ margin: '12px 0px' }} />
                    <div>
                        <Button
                            size={`small`}
                            type={`link`}
                            style={{ fontSize: 12 }}
                            onClick={handleAddOperateCondition}
                        >
                            +{' '}
                            {_.isEmpty(operatorConditions)
                                ? '新增状态条件'
                                : '新增或条件组'}
                        </Button>
                    </div>
                </>
            )}
        </div>
    );
};
