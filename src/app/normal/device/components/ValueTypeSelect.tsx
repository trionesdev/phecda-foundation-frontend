import { Select, SelectProps } from 'antd';
import { FC, useEffect, useState } from 'react';
import { deviceApi } from '@apis/tenant';
import { ValueTypeEnum } from '../internal/device.enum';

type ValueTypeSelectProps = {
    defaultFirstOption?: boolean;
} & Omit<SelectProps, 'options|defaultValue'>;
const ValueTypeSelect: FC<ValueTypeSelectProps> = ({
    defaultFirstOption = true,
    ...rest
}) => {
    const [options, setOptions] = useState([]);

    const handleQueryOptions = () => {
        deviceApi.valueTypeOptions().then((res: any) => {
            setOptions(res || []);
        });
    };
    useEffect(() => {
        handleQueryOptions();
    }, []);
    return (
        <Select defaultValue={ValueTypeEnum.INT!} options={options} {...rest} />
    );
};
export default ValueTypeSelect;
