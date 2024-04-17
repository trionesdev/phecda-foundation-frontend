import { Select, SelectProps } from 'antd';
import { FC, useState } from 'react';
import { useRequest } from 'ahooks';
import { alarmApi } from '@apis';

type AlarmLevelSelectProps = Omit<SelectProps, 'options'>;
export const AlarmLevelSelect: FC<AlarmLevelSelectProps> = ({ ...rest }) => {
    const [options, setOptions] = useState<SelectProps['options']>([]);
    const {} = useRequest(() => alarmApi.queryAlarmLevels({ enabled: true }), {
        onSuccess: (res: any) => {
            if (res) {
                setOptions(
                    res.map((item: any) => ({
                        value: item.identifier,
                        label: item.name,
                    }))
                );
            } else {
                setOptions([]);
            }
        },
    });
    return <Select {...rest} options={options} />;
};
