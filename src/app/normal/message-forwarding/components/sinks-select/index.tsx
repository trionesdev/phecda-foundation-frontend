import { Select, SelectProps } from 'antd';
import { FC, useEffect, useState } from 'react';
import { useRequest } from 'ahooks';
import { messageForwardingApi } from '@apis';

type SinksSelectProps = Omit<SelectProps, 'options'>;

export const SinksSelect: FC<SinksSelectProps> = ({ ...props }) => {
    const [options, setOptions] = useState<any[]>([]);
    const { run: handleQuery } = useRequest(
        () => messageForwardingApi.queryMessageSinkList(),
        {
            manual: true,
            onSuccess: (res: any) => {
                setOptions(res || []);
            },
        }
    );

    useEffect(() => {
        handleQuery();
    }, []);

    return (
        <Select
            {...props}
            options={options}
            fieldNames={{ label: 'name', value: 'id' }}
        />
    );
};
