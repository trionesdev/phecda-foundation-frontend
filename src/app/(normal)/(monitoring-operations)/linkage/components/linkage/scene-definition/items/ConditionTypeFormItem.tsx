import { Form, FormInstance, Select } from 'antd';
import { ConditionTypeOptions } from '@/app/(normal)/(monitoring-operations)/internal/linkage.constants';
import { FC } from 'react';

type ConditionTypeFormItemProps = {
    required?: boolean;
    form?: FormInstance;
    namePath?: any;
};

export const ConditionTypeFormItem: FC<ConditionTypeFormItemProps> = ({
    required,
    form,
    namePath,
}) => {
    return (
        <Form.Item label={`条件类型`} name={namePath} required={required}>
            <Select style={{ minWidth: 180 }} options={ConditionTypeOptions} />
        </Form.Item>
    );
};
