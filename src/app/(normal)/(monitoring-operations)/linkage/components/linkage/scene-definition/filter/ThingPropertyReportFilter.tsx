import { FC } from 'react';
import { Button, Form, FormInstance, Input, Space } from 'antd';
import { ThingPropertyValueFormItem } from '@/app/(normal)/(monitoring-operations)/linkage/components/linkage/scene-definition/items/ThingPropertyValueFormItem';
import { OperatorFormItem } from '@/app/(normal)/(monitoring-operations)/linkage/components/linkage/scene-definition/items/OperatorFormItem';
import _ from 'lodash';
import { OPERATOR } from '@/app/(normal)/(monitoring-operations)/internal/linkage.enums';

type ThingPropertyReportFilterProps = {
    editing?: boolean;
    form?: FormInstance;
    namePath?: any;
};
export const ThingPropertyReportFilter: FC<ThingPropertyReportFilterProps> = ({
    editing,
    form,
    namePath,
}) => {
    const eventTriggerValueType = Form.useWatch(
        [...namePath, 'filter', 'valueType'],
        {
            form,
            preserve: true,
        }
    );
    const operator = Form.useWatch([...namePath, 'filter', 'operator'], {
        form,
        preserve: true,
    });
    const eventTriggerValueSpecs = Form.useWatch(
        [...namePath, 'filter', 'valueSpecs'],
        {
            form,
            preserve: true,
        }
    );

    const handleRemoveEventTriggerFilter = () => {
        form?.setFieldValue([...namePath, 'filter'], null);
    };
    return (
        <Space>
            <div>
                <Form.Item
                    name={[...namePath, 'filter', 'valueType']}
                    hidden={true}
                >
                    <Input />
                </Form.Item>
                <OperatorFormItem
                    namePath={[...namePath, 'filter', 'operator']}
                    valueType={eventTriggerValueType}
                />
            </div>
            <ThingPropertyValueFormItem
                form={form}
                namePath={[...namePath, 'filter', 'args', 0]}
                valueType={eventTriggerValueType}
                valueSpecs={eventTriggerValueSpecs}
            />
            {_.includes(
                [OPERATOR.RANGE_CLOSED, OPERATOR.RANGE_OPEN],
                operator
            ) && (
                <ThingPropertyValueFormItem
                    form={form}
                    namePath={[...namePath, 'filter', 'args', 1]}
                    valueType={eventTriggerValueType}
                    valueSpecs={eventTriggerValueSpecs}
                />
            )}
            {editing && (
                <Form.Item label={<span></span>}>
                    <Button
                        size={`small`}
                        type={`link`}
                        onClick={handleRemoveEventTriggerFilter}
                    >
                        删除
                    </Button>
                </Form.Item>
            )}
        </Space>
    );
};
