import React, { FC } from 'react';
import { Form, FormInstance, Input, Space } from 'antd';
import { ProductFormItem } from '@/app/(normal)/(monitoring-operations)/linkage/components/linkage/scene-definition/items/ProductFormItem';
import { DeviceFormItem } from '@/app/(normal)/(monitoring-operations)/linkage/components/linkage/scene-definition/items/DeviceFormItem';
import { ThingModelPropertyFormItem } from '@/app/(normal)/(monitoring-operations)/linkage/components/linkage/scene-definition/items/ThingModelPropertyFormItem';
import { ThingPropertyValueFormItem } from '@/app/(normal)/(monitoring-operations)/linkage/components/linkage/scene-definition/items/ThingPropertyValueFormItem';
import { OperatorFormItem } from '@/app/(normal)/(monitoring-operations)/linkage/components/linkage/scene-definition/items/OperatorFormItem';
import _ from 'lodash';
import { OPERATOR } from '@/domains/linkage/linkage.enums';

type ThingPropertyStateIdentifierProps = {
    form?: FormInstance;
    namePath?: any[];
};
export const ThingPropertyStateIdentifier: FC<
    ThingPropertyStateIdentifierProps
> = ({ form, namePath = [] }) => {
    const stateIdentifierProductKey = Form.useWatch(
        [...namePath, 'stateIdentifier', 'productKey'],
        form
    );

    const conditionValueType = Form.useWatch(
        [...namePath, 'condition', 'valueType'],
        {
            form,
            preserve: true,
        }
    );
    const conditionValueSpecs = Form.useWatch(
        [...namePath, 'condition', 'valueSpecs'],
        {
            form,
            preserve: true,
        }
    );

    const operator = Form.useWatch([...namePath, 'condition', 'operator'], {
        form,
        preserve: true,
    });

    const handlePropertySelect = (value: any, option: any) => {
        if (!option) {
            return;
        }
        form?.setFieldValue(
            [...namePath, 'condition', 'valueType'],
            option?.valueType
        );
        form?.setFieldValue(
            [...namePath, 'condition', 'valueSpecs'],
            option?.valueSpecs
        );
    };

    return (
        <Space>
            <ProductFormItem
                form={form}
                namePath={[...namePath, 'stateIdentifier', 'productKey']}
            />
            <DeviceFormItem
                form={form}
                namePath={[...namePath, 'stateIdentifier', 'deviceName']}
                productKey={stateIdentifierProductKey}
            />
            <Form.Item
                name={[...namePath, 'condition', 'valueType']}
                noStyle={true}
                hidden={true}
            >
                <Input />
            </Form.Item>
            <ThingModelPropertyFormItem
                form={form}
                namePath={[...namePath, 'condition', 'valuePath']}
                productKey={stateIdentifierProductKey}
                onSelect={handlePropertySelect}
            />
            <OperatorFormItem
                namePath={[...namePath, 'condition', 'operator']}
                valueType={conditionValueType}
            />
            <ThingPropertyValueFormItem
                form={form}
                namePath={[...namePath, 'condition', 'args', 0]}
                valueType={conditionValueType}
                valueSpecs={conditionValueSpecs}
            />
            {_.includes(
                [OPERATOR.RANGE_CLOSED, OPERATOR.RANGE_OPEN],
                operator
            ) && (
                <ThingPropertyValueFormItem
                    form={form}
                    namePath={[...namePath, 'condition', 'args', 1]}
                    valueType={conditionValueType}
                    valueSpecs={conditionValueSpecs}
                />
            )}
        </Space>
    );
};
