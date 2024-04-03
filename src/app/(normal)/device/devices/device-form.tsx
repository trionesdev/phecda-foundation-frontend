import { Button, ButtonProps, Form, Input, message, Select, Tag } from 'antd';
import React, { FC, useEffect, useState } from 'react';
import { deviceApi } from '@apis';
import ProductSelect from '@components/product-select';
import { ModalForm } from '@trionesdev/antd-react-ext';

type DeviceFormProps = {
    id?: string;
    isEdit?: boolean;
    onSuccess?: () => void;
} & ButtonProps;

const DeviceForm: FC<DeviceFormProps> = ({
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
            const params = {
                id,
                ...values,
            };
            request = deviceApi.updateDevice(params);
        } else {
            request = deviceApi.createDevice(values);
        }
        request
            .then(async () => {
                setOpen(false);
                message.success('操作成功');
                if (onSuccess) {
                    onSuccess();
                }
            })
            .catch(async (ex) => {
                message.error(ex.message);
            });
    };

    const getById = (id: any) => {
        deviceApi.queryDeviceExtById(id!).then((res: any) => {
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
            title={`${isEdit ? '编辑' : '新建'}设备`}
            trigger={<Button {...rest} />}
            layout={`vertical`}
            afterOpenChange={(op: boolean) => setOpen(op)}
            onSubmit={handleSubmit}
            formValues={formValues}
        >
            <Form.Item
                label={`产品`}
                name={`productKey`}
                rules={[{ required: true }]}
            >
                <ProductSelect disabled={!!id} />
            </Form.Item>
            <Form.Item
                label={
                    <>
                        DeviceName/设备名称
                        <span style={{ color: '#0000005c', fontSize: 12 }}>
                            必须英文字母开头
                        </span>
                    </>
                }
                name={`name`}
                rules={[
                    { required: true },
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
                <Input disabled={!!id} />
            </Form.Item>
            <Form.Item label={`备注名称`} name={`remarkName`}>
                <Input />
            </Form.Item>
        </ModalForm>
    );
};
export default DeviceForm;
