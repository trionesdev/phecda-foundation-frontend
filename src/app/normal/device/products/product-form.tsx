import React, { FC, useEffect, useState } from 'react';
import { Form, Input, message, Radio, Select } from 'antd';
import { deviceApi } from '@apis';
import _ from 'lodash';
import { ModalForm } from '@trionesdev/antd-react-ext';
import {
    ACCESS_CHANNEL,
    NODE_TYPE,
    PRODUCT_TYPE,
} from '../internal/device.enum';
import {
    AccessChannel,
    DeviceNodeTypeOptions,
    ProductTypeOptions,
} from '../internal/device.constants';
import { DriverSelect } from '@/app/normal/device/components/driver-select';

type ProductFormBtnProps = {
    children?: React.ReactElement;
    id?: string;
    isEdit?: boolean;
    onSuccess?: () => void;
};
const ProductForm: FC<ProductFormBtnProps> = ({
    children,
    id,
    onSuccess,
    isEdit,
}) => {
    const [form] = Form.useForm();
    const [open, setOpen] = useState(false);

    const nodeType = Form.useWatch('nodeType', form);
    const accessChannel = Form.useWatch('accessChannel', form);
    console.log(accessChannel);

    const handleSubmit = (values: any) => {
        let request: Promise<any>;
        if (id) {
            request = deviceApi.updateProductById(id, values);
        } else {
            request = deviceApi.createProduct(values);
        }
        request.then(async () => {
            setOpen(false);
            message.success('操作成功');
            if (onSuccess) {
                onSuccess();
            }
        });
    };

    const getById = (id: any) => {
        deviceApi.queryProductById(id!).then((res: any) => {
            if (res) {
                form.setFieldsValue(res);
            }
        });
    };

    useEffect(() => {
        if (id && open && isEdit) {
            getById(id);
        }
    }, [id, open, isEdit]);

    return (
        <ModalForm
            form={form}
            open={open}
            trigger={children}
            title={`${isEdit ? '编辑' : '新建'}产品`}
            layout={`vertical`}
            afterOpenChange={(op: boolean) => setOpen(op)}
            onSubmit={handleSubmit}
            initialValues={{ nodeType: 'DIRECT', accessChannel: 'DRIVER' }}
        >
            <Form.Item
                rules={[{ required: true }]}
                label={`名称`}
                name={`name`}
            >
                <Input />
            </Form.Item>
            <Form.Item
                label={
                    <span>
                        KEY{' '}
                        <span style={{ color: '#0000005c', fontSize: 12 }}>
                            产品唯一标识，不填则随机生成(必须英文字母开头)
                        </span>
                    </span>
                }
                name={`key`}
                rules={[
                    {
                        validator: (rule, value) => {
                            if (value && !/^[a-zA-Z]/.test(value)) {
                                return Promise.reject(
                                    'DeviceName必须英文字母开头'
                                );
                            }
                            return Promise.resolve();
                        },
                    },
                ]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                label={`节点类型`}
                name={`nodeType`}
                rules={[{ required: true }]}
            >
                <Radio.Group>
                    {_.map(DeviceNodeTypeOptions, (nodeType, key) => (
                        <Radio.Button
                            key={nodeType.value}
                            value={nodeType.value}
                        >
                            {nodeType.label}
                        </Radio.Button>
                    ))}
                </Radio.Group>
            </Form.Item>
            {_.includes([NODE_TYPE.DIRECT, NODE_TYPE.GATEWAY], nodeType) && (
                <Form.Item
                    label={`接入通道`}
                    name={`accessChannel`}
                    rules={[{ required: true }]}
                >
                    <Radio.Group>
                        {_.map(AccessChannel, (value, key) => (
                            <Radio.Button key={key} value={key}>
                                {value}
                            </Radio.Button>
                        ))}
                    </Radio.Group>
                </Form.Item>
            )}
            {_.includes([ACCESS_CHANNEL.DRIVER], accessChannel) && (
                <Form.Item label={`驱动服务名称`} name={`driverName`}>
                    <DriverSelect />
                </Form.Item>
            )}
            {_.includes(
                [NODE_TYPE.DIRECT, NODE_TYPE.GATEWAY_SUB],
                nodeType
            ) && (
                <Form.Item
                    label={`产品类型`}
                    name={`type`}
                    required={true}
                    initialValue={PRODUCT_TYPE.SENSOR}
                >
                    <Select options={ProductTypeOptions} />
                </Form.Item>
            )}
        </ModalForm>
    );
};
export default ProductForm;
