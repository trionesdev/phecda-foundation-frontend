import { Form, Select } from 'antd';
import ProductSelect from '@components/product-select';
import { FC } from 'react';
import DeviceSelect from '@components/device-select';

type ThingPropertyReportProps = {};
export const ThingPropertyReport: FC<ThingPropertyReportProps> = ({}) => {
    const form = Form.useFormInstance();
    const productKey = Form.useWatch('productKey', form);
    return (
        <>
            <Form.Item name={`productKey`}>
                <ProductSelect placeholder={`请选择产品`} showSearch={true} />
            </Form.Item>
            <Form.Item name={`deviceName`} initialValue={'+'}>
                <DeviceSelect
                    showSearch={true}
                    placeholder={`请选择设备`}
                    productKey={productKey}
                    allOption={{ label: '全部设备（+）', value: '+' }}
                    disabled={!productKey}
                />
            </Form.Item>
            <Form.Item name={`topicTemplate`} required={true}>
                <Select placeholder={`请选择Topic`} disabled={!productKey}>
                    <Select.Option value={`THING_PROPERTY_POST`}>
                        thing/event/property/post
                    </Select.Option>
                </Select>
            </Form.Item>
        </>
    );
};
