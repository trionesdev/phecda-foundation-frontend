import { Form, Select } from 'antd';
import { FC } from 'react';
import { DeviceSelect, ProductKeySelect } from '@/app/normal/device/components';
import { MessageSourceTopicsOptions } from '@/app/normal/message-forwarding/internal/message-forwarding.constants';
import _ from 'lodash';

type ThingPropertyReportProps = {
    type?: string;
};
export const ThingPropertyReport: FC<ThingPropertyReportProps> = ({ type }) => {
    const form = Form.useFormInstance();
    const productKey = Form.useWatch('productKey', form);
    return (
        <>
            <Form.Item name={`productKey`}>
                <ProductKeySelect
                    placeholder={`请选择产品`}
                    showSearch={true}
                />
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
                <Select
                    placeholder={`请选择Topic`}
                    disabled={!productKey}
                    options={
                        type ? _.get(MessageSourceTopicsOptions, type) : []
                    }
                />
            </Form.Item>
        </>
    );
};
