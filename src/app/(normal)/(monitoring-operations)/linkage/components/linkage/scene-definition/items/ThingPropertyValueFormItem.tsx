import { FC, useEffect } from 'react';
import { Form, FormInstance, Input, InputNumber, Select } from 'antd';
import _ from 'lodash';
import { ValueTypeEnum } from '@/app/(normal)/(product)/product-things-model-draft/thing-model-ability-form/value-type';

type PropertyValueFormItemProps = {
    required?: boolean;
    form?: FormInstance;
    namePath?: any;
    valueType?: ValueTypeEnum;
    valueSpecs?: any;
};
export const ThingPropertyValueFormItem: FC<PropertyValueFormItemProps> = ({
    required,
    form,
    namePath,
    valueType,
    valueSpecs,
}) => {
    const propertyValue = Form.useWatch([...namePath], { form });

    useEffect(() => {
        if (
            propertyValue &&
            !_.isEqual(valueType, ValueTypeEnum.STRING) &&
            _.isString(propertyValue)
        ) {
            let typedValue = null;
            switch (valueType) {
                case ValueTypeEnum.BOOL:
                    if (propertyValue == 'true') {
                        typedValue = true;
                    } else {
                        typedValue = false;
                    }
                    break;
                default:
                    typedValue = propertyValue;
            }
            if (typedValue != propertyValue) {
                form?.setFieldValue([...namePath], typedValue);
            }
        }
    }, [propertyValue]);

    return (
        <Form.Item label={`参数`} name={[...namePath]} required={required}>
            {(() => {
                if (_.includes([ValueTypeEnum.STRING], valueType)) {
                    return <Input />;
                } else if (_.includes([ValueTypeEnum.INT], valueType)) {
                    return <InputNumber style={{ minWidth: 180 }} />;
                } else if (_.includes([ValueTypeEnum.BOOL], valueType)) {
                    return (
                        <Select
                            style={{ minWidth: 180 }}
                            options={valueSpecs}
                            fieldNames={{ value: 'value', label: 'name' }}
                        />
                    );
                } else {
                    return <Input />;
                }
            })()}
        </Form.Item>
    );
};
