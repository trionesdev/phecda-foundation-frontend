import React, { FC } from 'react';
import { Form, FormInstance, Input, Space } from 'antd';
import _ from 'lodash';

import { OperatorFormItem } from '../items/OperatorFormItem';
import {
    DeviceFormItem,
    ProductKeyFormItem,
    ThingModelPropertyFormItem,
    ThingPropertyValueFormItem,
} from '../items';
import { OPERATOR } from '@/app/normal/linkage/internal/linkage.enums';

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
    console.log(operator);
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
            <ProductKeyFormItem
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
