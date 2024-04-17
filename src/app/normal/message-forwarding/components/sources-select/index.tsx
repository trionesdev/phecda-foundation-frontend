import { Select, SelectProps } from 'antd';
import { FC, useEffect, useState } from 'react';
import { useRequest } from 'ahooks';
import { messageForwardingApi } from '@apis';

type SourcesSelectProps = Omit<SelectProps, 'options'>;

export const SourcesSelect: FC<SourcesSelectProps> = ({ ...props }) => {
    const [options, setOptions] = useState<any[]>([]);
    const { run: handleQuery } = useRequest(
        () => messageForwardingApi.querySourcesList(),
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
