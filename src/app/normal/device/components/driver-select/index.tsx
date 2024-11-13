import React, { FC, useEffect, useState } from 'react';
import { Select, SelectProps } from 'antd';
import { useRequest } from 'ahooks';
import { driverApi } from '@apis/tenant';
import _ from 'lodash';

type DriverSelectProps = Omit<SelectProps, 'options'> & {
    valueOption?: {
        label?: React.ReactNode;
        value?: string;
    };
};
export const DriverSelect: FC<DriverSelectProps> = ({
    valueOption,
    ...props
}) => {
    const [loaded, setLoaded] = useState(false);
    const [options, setOptions] = useState(valueOption ? [valueOption] : []);

    const { run: handleQuery } = useRequest(
        async () => {
            const res: any = await driverApi.queryDriversList();
            return res?.map((item: any) =>
                _.assign(item, {
                    label: item.name,
                    value: item.name,
                })
            );
        },
        {
            manual: true,
            onSuccess: (res: any) => {
                setOptions(res);
                setLoaded(true);
            },
        }
    );

    useEffect(() => {
        if (
            valueOption &&
            !options.find((item: any) => item.value === valueOption.value)
        ) {
            setOptions([...options, valueOption]);
        }
        return () => {
            setOptions([]);
            setLoaded(false);
        };
    }, [valueOption]);

    return (
        <Select
            {...props}
            options={options}
            optionRender={(option: any, info: { index: number }) => {
                return <div>{option.label}</div>;
            }}
            onDropdownVisibleChange={(open) => {
                if (open && !loaded) {
                    handleQuery();
                }
            }}
        />
    );
};
