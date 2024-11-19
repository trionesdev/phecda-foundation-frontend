import {Form} from 'antd';
import {FC} from 'react';
import {DeviceSelect, ProductKeySelect} from '@/app/normal/device/components';

type ThingPropertyReportProps = {
    type?: string;
};
export const ThingPropertyReport: FC<ThingPropertyReportProps> = ({}) => {
    const form = Form.useFormInstance();
    const productKey = Form.useWatch('productKey', form);
    return (
        <>
            <Form.Item name={`productKey`}>
                <ProductKeySelect
                    placeholder={`请选择产品`}
                    allOption={true}
                    showSearch={true}
                />
            </Form.Item>
            <Form.Item name={`deviceName`} initialValue={'+'}>
                <DeviceSelect
                    showSearch={true}
                    placeholder={`请选择设备`}
                    productKey={productKey}
                    allOption={true}
                    disabled={!productKey}
                />
            </Form.Item>
            {/*<Form.Item name={`topicTemplate`} required={true}>*/}
            {/*    <Select*/}
            {/*        placeholder={`请选择Topic`}*/}
            {/*        disabled={!productKey}*/}
            {/*        options={*/}
            {/*            type ? _.get(MessageSourceTopicsOptions, type) : []*/}
            {/*        }*/}
            {/*    />*/}
            {/*</Form.Item>*/}
        </>
    );
};
