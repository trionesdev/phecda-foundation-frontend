import { FC, useEffect, useState } from 'react';
import { Select, SelectProps } from 'antd';
import { useRequest } from 'ahooks';
import { deviceApi } from '@apis/tenant';

type ThingModelEventsSelectProps = {
    productId: string;
} & SelectProps;

export const ThingModelEventSelect: FC<ThingModelEventsSelectProps> = ({
    productId,
    ...rest
}) => {
    const [options, setOptions] = useState<any>([]);

    const { run: handleQueryThingModelEvents } = useRequest(
        () => {
            return deviceApi.queryProductThingModel(productId).then((res) => {
                return (
                    res.thingModel?.events?.map((item: any) => {
                        return {
                            label: item.name,
                            value: item.identifier,
                        };
                    }) || []
                );
            });
        },
        {
            manual: true,
            onSuccess: (res: any) => {
                setOptions(res);
            },
        }
    );

    useEffect(() => {
        handleQueryThingModelEvents();
    }, [productId]);

    return <Select {...rest} options={options} />;
};
