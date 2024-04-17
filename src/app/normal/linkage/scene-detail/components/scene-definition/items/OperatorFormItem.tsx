import { Form, FormInstance, Select } from 'antd';
import { FC, useEffect, useState } from 'react';
import _ from 'lodash';
import { ValueTypeEnum } from '@/app/normal/device/internal/device.enum';
import { OperatorOptions } from '@/app/normal/linkage/internal/linkage.constants';
import { OPERATOR } from '@/app/normal/linkage/internal/linkage.enums';

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
