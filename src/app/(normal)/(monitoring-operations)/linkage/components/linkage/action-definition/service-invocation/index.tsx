import { Form, FormInstance, Input, Space } from 'antd';
import { FC } from 'react';
import ProductKeySelect from '@components/product-key-select';
import DeviceSelect from '@components/device-select';
import ThingModelServiceSelect from '@components/thing-model-service-select';

type ServiceInvocationActionProps = {
    form?: FormInstance;
    namePath?: any[];
};
export const ServiceInvocationAction: FC<ServiceInvocationActionProps> = ({
    form,
    namePath = [],
}) => {
    const productKey = Form.useWatch([...namePath, 'productKey'], form);
    return (
        <Space align={`start`}>
            <Form.Item
                label={`产品`}
                name={[...namePath, 'productKey']}
                required={true}
            >
                <ProductKeySelect
                    style={{ minWidth: 180 }}
                    placeholder={`请选择产品`}
                />
            </Form.Item>
            <Form.Item label={`设备`} name={[...namePath, 'deviceName']}>
                <DeviceSelect
                    productKey={productKey}
                    style={{ minWidth: 180 }}
                />
            </Form.Item>
            <Form.Item
                label={`服务`}
                name={[...namePath, 'serviceIdentifier']}
                required={true}
            >
                <ThingModelServiceSelect
                    productKey={productKey}
                    style={{ minWidth: 180 }}
                />
            </Form.Item>
            <Form.Item label={`参数`} name={[...namePath, 'params']}>
                <Input.TextArea autoSize={{ minRows: 1, maxRows: 3 }} />
            </Form.Item>
        </Space>
    );
};
