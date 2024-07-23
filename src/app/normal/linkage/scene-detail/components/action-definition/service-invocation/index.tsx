import { Form, FormInstance, Input, Space } from 'antd';
import { FC } from 'react';
import {
    DeviceSelect,
    ProductKeySelect,
    ThingModelCommandSelect,
} from '@/app/normal/device/components';

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
                    allowClear={true}
                    showSearch={true}
                />
            </Form.Item>
            <Form.Item
                label={`设备`}
                name={[...namePath, 'deviceName']}
                required={true}
            >
                <DeviceSelect
                    productKey={productKey}
                    style={{ minWidth: 180 }}
                    allowClear={true}
                    showSearch={true}
                />
            </Form.Item>
            <Form.Item
                label={`服务`}
                name={[...namePath, 'serviceIdentifier']}
                required={true}
            >
                <ThingModelCommandSelect
                    productKey={productKey}
                    style={{ minWidth: 180 }}
                />
            </Form.Item>
            <Form.Item
                label={`参数`}
                name={[...namePath, 'params']}
                initialValue={`{}`}
            >
                <Input.TextArea autoSize={{ minRows: 1, maxRows: 3 }} />
            </Form.Item>
            <Form.Item
                label={`内容`}
                name={[...namePath, 'body']}
                initialValue={`{}`}
            >
                <Input.TextArea autoSize={{ minRows: 1, maxRows: 3 }} />
            </Form.Item>
        </Space>
    );
};
