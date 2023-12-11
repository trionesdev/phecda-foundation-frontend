import { Form, FormInstance, Select } from 'antd';
import ProductSelect from '@components/product-select';
import { FC } from 'react';
import DeviceSelect from '@components/device-select';

type ThingPropertyReportProps = {};
export const ThingPropertyReport: FC<ThingPropertyReportProps> = ({}) => {
    const form = Form.useFormInstance();
    const productId = Form.useWatch('productId', form);
    return (
        <>
            <Form.Item name={`productId`}>
                <ProductSelect placeholder={`请选择产品`} />
            </Form.Item>
            <Form.Item name={`deviceName`} initialValue={'+'}>
                <DeviceSelect
                    placeholder={`请选择设备`}
                    productId={productId}
                    allOption={{ label: '全部设备（+）', value: '+' }}
                    disabled={!productId}
                />
            </Form.Item>
            <Form.Item name={`topicTemplate`} required={true}>
                <Select placeholder={`请选择Topic`} disabled={!productId}>
                    <Select.Option value={`THING_PROPERTY_POST`}>
                        thing/event/property/post
                    </Select.Option>
                </Select>
            </Form.Item>
        </>
    );
};
