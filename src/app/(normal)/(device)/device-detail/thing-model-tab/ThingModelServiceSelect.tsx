import { FC, useEffect, useState } from 'react';
import { Select, SelectProps } from 'antd';
import { useRequest } from 'ahooks';
import { deviceApi } from '@apis';

type ThingModelServiceSelectProps = {
    productId: string;
} & SelectProps;

export const ThingModelServiceSelect: FC<ThingModelServiceSelectProps> = ({
    productId,
    ...rest
}) => {
    const [options, setOptions] = useState<any>([]);

    const { run: handleQueryThingModelService } = useRequest(
        () => {
            return deviceApi.queryProductThingModel(productId).then((res) => {
                return (
                    res.thingModel?.services?.map((item: any) => {
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
        handleQueryThingModelService();
    }, [productId]);

    return <Select {...rest} options={options} />;
};
