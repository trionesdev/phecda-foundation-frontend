import React, { FC, useEffect, useState } from 'react';
import { Button, ButtonProps, Form, Input, message, Radio, Tag } from 'antd';
import { deviceApi } from '@apis';
import {
    AccessChannel,
    DeviceNodeType,
} from '@/app/(normal)/(product)/internal/device.constants';
import _ from 'lodash';
import { ModalForm } from '@trionesdev/antd-react-ext';

type ProductFormBtnProps = {
    id?: string;
    isEdit?: boolean;
    onSuccess?: () => void;
} & ButtonProps;
const ProductFormBtn: FC<ProductFormBtnProps> = ({
    id,
    onSuccess,
    isEdit,
    ...rest
}) => {
    const [open, setOpen] = useState(false);
    const [formValues, setFormValues] = useState({});
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
                setFormValues(res);
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
            open={open}
            trigger={<Button {...rest} />}
            title={`${isEdit ? '编辑' : '新建'}产品`}
            layout={`vertical`}
            afterOpenChange={(op: boolean) => setOpen(op)}
            formValues={
                isEdit
                    ? { ...formValues }
                    : { nodeType: 'DIRECT', accessChannel: 'MQTT' }
            }
            onSubmit={handleSubmit}
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
                    {_.map(DeviceNodeType, (value, key) => (
                        <Radio.Button key={key} value={key}>
                            {value}
                        </Radio.Button>
                    ))}
                </Radio.Group>
            </Form.Item>
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
            <Form.Item label={`驱动服务名称`} name={`driverName`}>
                <Input />
            </Form.Item>
        </ModalForm>
    );
};
export default ProductFormBtn;
