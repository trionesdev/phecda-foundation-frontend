import { Form, FormInstance, Select } from 'antd';
import { FC, useEffect, useState } from 'react';
import { useRequest } from 'ahooks';
import { deviceApi } from '@apis';
import _ from 'lodash';

type ThingModelPropertyFormItemProps = {
    productId?: string;
    required?: boolean;
    form?: FormInstance;
    namePath?: any[];
    onSelect?: (value: any, option: any) => void;
};

export const ThingModelPropertyFormItem: FC<
    ThingModelPropertyFormItemProps
> = ({ productId, required, form, namePath = [], onSelect }) => {
    const property = Form.useWatch([...namePath], { form });
    const [options, setOptions] = useState([]);
    const { run: queryProductThingModel } = useRequest(
        (id) => deviceApi.queryProductThingModel(id),
        {
            manual: true,
            onSuccess: (data, params) => {
                setOptions(data?.thingModel?.properties || []);
            },
        }
    );

    useEffect(() => {
        if (productId) {
            queryProductThingModel(productId);
        } else {
            setOptions([]);
        }
    }, [productId]);

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
