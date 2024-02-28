import { FC, useEffect, useState } from 'react';
import { useRequest } from 'ahooks';
import { deviceApi } from '@apis';
import { Select, SelectProps } from 'antd';
import _ from 'lodash';

type DeviceSelectProps = {
    productId?: string;
    allOption?: {
        label?: string;
        value?: string;
    };
} & SelectProps;

export const DeviceSelect: FC<DeviceSelectProps> = ({
    productId,
    allOption,
    ...props
}) => {
    const [options, setOptions] = useState<any>([]);
    const { run: handleQueryDevicesByProductId } = useRequest(
        () => deviceApi.queryDeviceByParams({ productId }),
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
        if (productId) {
            handleQueryDevicesByProductId();
        } else {
            setOptions([allOption] || []);
        }
    }, [productId]);

    return (
        <Select
            {...props}
            style={{ minWidth: 180 }}
            placeholder={`请选择设备`}
            options={options}
        />
    );
};
