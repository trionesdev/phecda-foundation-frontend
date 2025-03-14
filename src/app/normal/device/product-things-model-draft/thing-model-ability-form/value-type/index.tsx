import { Form, Select } from 'antd';
import { FC } from 'react';
import _ from 'lodash';
import ValueTypeBool from './value-type-bool';
import ValueTypeFloat from './value-type-float';
import ValueTypeDouble from './value-type-double';
import ValueTypeString from './value-type-string';
import ValueTypeStruct from './value-type-struct';
import { ValueTypeEnum } from '../../../internal/device.enum';
import { ValueTypeArray } from './ValueTypeArray';
import ValueTypeInt from './ValueTypeInt';
import { ValueTypeOptions } from '@/app/normal/device/internal/device.constants';

export type ValueTypeProps = {
    group?: string | number | any[];
    isChild?: boolean;
};

const ValueType: FC<ValueTypeProps> = ({ group, isChild = false }) => {
    const form = Form.useFormInstance();

    const handleValueTypesOnChange = (value: any) => {
        form.setFieldValue(_.concat(group, `valueSpec`, `valueType`), value);
        form.setFieldValue(_.concat(group, `valueSpecs`), []);
    };
    const ValueTypeEnumConfig = {
        [ValueTypeEnum.INT]: ValueTypeInt,
        [ValueTypeEnum.FLOAT]: ValueTypeFloat,
        [ValueTypeEnum.DOUBLE]: ValueTypeDouble,
        [ValueTypeEnum.BOOL]: ValueTypeBool,
        [ValueTypeEnum.STRING]: ValueTypeString,
        [ValueTypeEnum.ARRAY]: ValueTypeArray,
        [ValueTypeEnum.STRUCT]: ValueTypeStruct,
    };
    const valueTypeNamePath = _.concat(
        group,
        isChild ? `subValueType` : `valueType`
    );
    return (
        <>
            <Form.Item
                label={`数据类型`}
                name={valueTypeNamePath}
                initialValue={ValueTypeEnum.INT}
                rules={[{ required: true }]}
            >
                {/*<ValueTypeSelect*/}
                {/*    onChange={(value) => handleValueTypesOnChange(value)}*/}
                {/*/>*/}
                <Select
                    options={ValueTypeOptions}
                    onChange={(value) => handleValueTypesOnChange(value)}
                />
            </Form.Item>
            <Form.Item dependencies={[valueTypeNamePath]} noStyle>
                {(form) => {
                    const valueType: Exclude<
                        ValueTypeEnum,
                        ValueTypeEnum.ARRAY
                    > = form.getFieldValue(valueTypeNamePath);
                    const Component = ValueTypeEnumConfig?.[valueType];
                    if (Component) {
                        return (
                            <Component
                                group={[
                                    group,
                                    _.includes(
                                        [
                                            ValueTypeEnum.BOOL,
                                            ValueTypeEnum.STRUCT,
                                        ],
                                        valueType
                                    )
                                        ? 'valueSpecs'
                                        : `valueSpec`,
                                ]}
                            />
                        );
                    }
                    return null;
                }}
            </Form.Item>
        </>
    );
};
export default ValueType;
