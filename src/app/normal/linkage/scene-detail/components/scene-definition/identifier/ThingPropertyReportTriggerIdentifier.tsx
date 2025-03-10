import React, { FC } from 'react';
import { Form, FormInstance, Space } from 'antd';
import {
    DeviceFormItem,
    ProductKeyFormItem,
    ThingModelPropertyFormItem,
} from '../items';

type ThingPropertyReportTriggerIdentifierProps = {
    form?: FormInstance;
    namePath?: any;
};
export const ThingPropertyReportTriggerIdentifier: FC<
    ThingPropertyReportTriggerIdentifierProps
> = ({ form, namePath }) => {
    const productKey = Form.useWatch(
        [...namePath, 'identifier', 'productKey'],
        form
    );

    const handlePropertySelect = (value: any, option: any) => {
        if (!option) {
            return;
        }
        form?.setFieldValue(
            [...namePath, 'filter', 'valueType'],
            option?.valueType
        );
        form?.setFieldValue(
            [...namePath, 'filter', 'valueSpecs'],
            option?.valueSpecs
        );
    };

    return (
        <Space>
            <ProductKeyFormItem
                form={form}
                namePath={[...namePath, 'identifier', 'productKey']}
                required={true}
            />
            <DeviceFormItem
                form={form}
                namePath={[...namePath, 'identifier', 'deviceName']}
                productKey={productKey}
            />
            <ThingModelPropertyFormItem
                form={form}
                namePath={[...namePath, 'identifier', 'property']}
                productKey={productKey}
                onSelect={handlePropertySelect}
                required={true}
            />
        </Space>
    );
};
