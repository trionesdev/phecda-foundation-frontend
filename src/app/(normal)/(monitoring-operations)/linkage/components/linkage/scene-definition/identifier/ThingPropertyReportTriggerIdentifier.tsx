import React, { FC } from 'react';
import { Form, FormInstance, Input, Space } from 'antd';
import { ProductFormItem } from '@/app/(normal)/(monitoring-operations)/linkage/components/linkage/scene-definition/items/ProductFormItem';
import { DeviceFormItem } from '@/app/(normal)/(monitoring-operations)/linkage/components/linkage/scene-definition/items/DeviceFormItem';
import { ThingModelPropertyFormItem } from '@/app/(normal)/(monitoring-operations)/linkage/components/linkage/scene-definition/items/ThingModelPropertyFormItem';

type ThingPropertyReportTriggerIdentifierProps = {
    form?: FormInstance;
    namePath?: any;
};
export const ThingPropertyReportTriggerIdentifier: FC<
    ThingPropertyReportTriggerIdentifierProps
> = ({ form, namePath }) => {
    const eventTriggerIdentifierProduct = Form.useWatch(
        [...namePath, 'identifier', 'productKey'],
        form
    );

    const handlePropertySelect = (value: any, option: any) => {
        form?.setFieldValue(
            [...namePath, 'filter', 'valueType'],
            option.valueType
        );
        form?.setFieldValue(
            [...namePath, 'filter', 'valueSpecs'],
            option.valueSpecs
        );
    };

    return (
        <Space>
            <ProductFormItem
                form={form}
                namePath={[...namePath, 'identifier', 'productKey']}
                required={true}
            />
            <DeviceFormItem
                form={form}
                namePath={[...namePath, 'identifier', 'deviceName']}
                productKey={eventTriggerIdentifierProduct}
            />
            <ThingModelPropertyFormItem
                form={form}
                namePath={[...namePath, 'identifier', 'property']}
                productId={eventTriggerIdentifierProduct}
                onSelect={handlePropertySelect}
                required={true}
            />
        </Space>
    );
};
