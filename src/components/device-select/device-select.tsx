import { FC, useEffect, useState } from 'react';
import { useRequest } from 'ahooks';
import { deviceApi } from '@apis';
import { Select, SelectProps } from 'antd';
import _ from 'lodash';

type DeviceSelectProps = {
    productKey?: string;
    allOption?: {
        label?: string;
        value?: string;
    };
} & SelectProps;

export const DeviceSelect: FC<DeviceSelectProps> = ({
    productKey,
    allOption,
    ...props
}) => {
    const [options, setOptions] = useState<any>([]);
    const { run: handleQueryDevicesByProductId } = useRequest(
        () => deviceApi.queryDeviceByParams({ productKey }),
        {
            manual: true,
            onSuccess: (res: any) => {
                let newRes: any[] = _.concat(
                    [],
                    allOption || [],
                    _.map(res, (item: any) => {
                        return { label: item.name, value: item.name };
                    })
                );
                setOptions(newRes || []);
            },
        }
    );

    useEffect(() => {
        if (productKey) {
            handleQueryDevicesByProductId();
        } else {
            setOptions([allOption] || []);
        }
    }, [productKey]);

    return (
        <Select
            {...props}
            style={{ minWidth: 180 }}
            placeholder={`请选择设备`}
            options={options}
        />
    );
};
