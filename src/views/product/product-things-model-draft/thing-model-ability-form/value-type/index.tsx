import { Form } from 'antd';
import ValueTypeInt from './value-type-int';
import ValueTypeSelect from '../../../../../components/value-type-select/value-type-select';
import { FC, useState } from 'react';
import _ from 'lodash';
import ValueTypeBool from './value-type-bool';
import ValueTypeFloat from './value-type-float';
import ValueTypeDouble from './value-type-double';
import ValueTypeString from './value-type-string';
import ValueTypeStruct from './value-type-struct';

export enum ValueTypeEnum {
    INT = 'INT',
    FLOAT = 'FLOAT',
    DOUBLE = 'DOUBLE',
    BOOL = 'BOOL',
    STRING = 'STRING',
    STRUCT = 'STRUCT',
    ARRAY = 'ARRAY',
}

export type ValueTypeProps = {
    group?: string | number | any[];
    isChild?: boolean;
};

const ValueType: FC<ValueTypeProps> = ({ group, isChild = false }) => {
    const [valueType, setValueType] = useState(ValueTypeEnum.INT);
    const form = Form.useFormInstance();

    const handleValueTypesOnChange = (value: any) => {
        setValueType(value);
        form.setFieldValue(_.concat(group, `valueSpec`, `valueType`), value);
        form.setFieldValue(_.concat(group, `valueSpecs`), []);
    };
    const ValueTypeEnumConfig = {
        [ValueTypeEnum.INT]: ValueTypeInt,
        [ValueTypeEnum.FLOAT]: ValueTypeFloat,
        [ValueTypeEnum.DOUBLE]: ValueTypeDouble,
        [ValueTypeEnum.BOOL]: ValueTypeBool,
        [ValueTypeEnum.STRING]: ValueTypeString,
        [ValueTypeEnum.STRUCT]: ValueTypeStruct,
    };
    return (
        <>
            <Form.Item
                label={`数据类型`}
                name={_.concat(group, isChild ? `childValueType` : `valueType`)}
                initialValue={ValueTypeEnum.INT}
                required={true}
            >
                <ValueTypeSelect
                    onChange={(value) => handleValueTypesOnChange(value)}
                />
            </Form.Item>
            <Form.Item
                dependencies={[_.concat(group, `valueSpec`, `valueType`)]}
                noStyle
            >
                {(form) => {
                    const valueType: Exclude<
                        ValueTypeEnum,
                        ValueTypeEnum.ARRAY
                    > = form.getFieldValue(
                        _.concat(group, `valueSpec`, `valueType`)
                    );
                    const Component = ValueTypeEnumConfig?.[valueType];
                    if (Component) {
                        return <Component group={[group, `valueSpec`]} />;
                    }
                    return null;
                }}
            </Form.Item>
        </>
    );
};
export default ValueType;
