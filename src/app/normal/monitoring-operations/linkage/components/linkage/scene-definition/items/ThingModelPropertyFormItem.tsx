import { Form, FormInstance, Select } from 'antd';
import { FC, useEffect, useState } from 'react';
import { useRequest } from 'ahooks';
import { deviceApi } from '@apis';
import _ from 'lodash';

type ThingModelPropertyFormItemProps = {
    productKey?: string;
    required?: boolean;
    form?: FormInstance;
    namePath?: any[];
    onSelect?: (value: any, option: any) => void;
};

export const ThingModelPropertyFormItem: FC<
    ThingModelPropertyFormItemProps
> = ({ productKey, required, form, namePath = [], onSelect }) => {
    const property = Form.useWatch([...namePath], { form });
    const [options, setOptions] = useState([]);
    const { run: queryProductThingModel } = useRequest(
        (key) => deviceApi.queryProductThingModelByKey(key),
        {
            manual: true,
            onSuccess: (data, params) => {
                setOptions(data?.thingModel?.properties || []);
            },
        }
    );

    useEffect(() => {
        if (productKey) {
            queryProductThingModel(productKey);
        } else {
            setOptions([]);
        }
    }, [productKey]);

    useEffect(() => {
        if (property && !_.isEmpty(options)) {
            onSelect?.(property, _.find(options, { identifier: property }));
        }
    }, [property, options]);

    return (
        <Form.Item label={`属性`} name={namePath} required={required}>
            <Select
                style={{ minWidth: 180 }}
                placeholder={`请选择属性`}
                options={options}
                fieldNames={{ value: 'identifier', label: 'name' }}
            />
        </Form.Item>
    );
};
