import { Form, FormInstance, Select } from 'antd';
import { OperatorOptions } from '@/app/(normal)/(monitoring-operations)/internal/linkage.constants';
import { FC, useEffect, useState } from 'react';
import _ from 'lodash';
import { OPERATOR } from '@/app/(normal)/(monitoring-operations)/internal/linkage.enums';
import { ValueTypeEnum } from '@/app/(normal)/(product)/product-things-model-draft/thing-model-ability-form/value-type';

type OperatorFormItemProps = {
    form?: FormInstance;
    namePath?: any;
    valueType?: ValueTypeEnum;
};

export const OperatorFormItem: FC<OperatorFormItemProps> = ({
    form,
    namePath,
    valueType,
}) => {
    const [options, setOptions] = useState(OperatorOptions);

    useEffect(() => {
        if (
            _.includes(
                [ValueTypeEnum.INT, ValueTypeEnum.FLOAT, ValueTypeEnum.DOUBLE],
                valueType
            )
        ) {
            setOptions(OperatorOptions);
        } else {
            setOptions([
                {
                    label: '等于',
                    value: OPERATOR.EQUAL_TO,
                },
            ]);
        }
    }, [valueType]);

    return (
        <Form.Item label={`运算符`} name={[...namePath]}>
            <Select style={{ minWidth: 180 }} options={options} />
        </Form.Item>
    );
};
