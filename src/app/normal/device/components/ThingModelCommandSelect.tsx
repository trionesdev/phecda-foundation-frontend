import { FC, useEffect, useState } from 'react';
import { useRequest } from 'ahooks';
import { deviceApi } from '@apis';
import { Select, SelectProps } from 'antd';

type ThingModelCommandSelectProps = {
    productKey?: string;
} & SelectProps;
export const ThingModelCommandSelect: FC<ThingModelCommandSelectProps> = ({
    productKey,
    ...rest
}) => {
    const [options, setOptions] = useState<any>([]);

    const { run: handleQueryThingModelService } = useRequest(
        () => {
            return deviceApi
                .queryProductThingModelByKey(productKey!!)
                .then((res) => {
                    return (
                        res.thingModel?.commands?.map((item: any) => {
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
        if (productKey) {
            handleQueryThingModelService();
        } else {
            setOptions([]);
        }
    }, [productKey]);

    return <Select {...rest} options={options} />;
};
