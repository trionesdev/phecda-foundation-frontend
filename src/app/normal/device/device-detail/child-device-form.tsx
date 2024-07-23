import React, { FC, useEffect, useState } from 'react';
import { Button, ButtonProps, Form, notification, Select } from 'antd';
import { deviceApi } from '@apis';
import _ from 'lodash';
import { ModalForm } from '@trionesdev/antd-react-ext';
import { ProductKeySelect } from '../components';

type ChildDeviceFormProps = {
    parentDeviceId: string;
    onSuccess?: () => void;
} & ButtonProps;

const ChildDeviceForm: FC<ChildDeviceFormProps> = ({
    parentDeviceId,
    onSuccess,
    ...rest
}) => {
    const [open, setOpen] = useState(false);
    const [productId, setProductId] = useState<string>();
    const [devices, setDevices] = useState<[]>([]);

    const handleQueryDeviceList = (productId: string) => {
        deviceApi
            .queryDeviceByParams({
                productId: productId,
            })
            .then((res) => {
                setDevices(res || []);
            })
            .catch((ex) => {
                notification.success({ message: ex.message });
            });
    };

    const handleProductOnChange = (value: string) => {
        setProductId(value);
    };

    useEffect(() => {
        handleQueryDeviceList(productId!);
    }, [productId]);

    const handleSubmit = (values: any) => {
        const deviceIds = _.get(values, 'deviceIds');
        deviceApi
            .addChildDevice(parentDeviceId, deviceIds!)
            .then(() => {
                setOpen(false);
                notification.success({ message: '保存成功' });
                if (onSuccess) {
                    onSuccess();
                }
            })
            .catch((ex) => {
                notification.success({ message: ex.message });
            });
    };

    return (
        <>
            <ModalForm
                open={open}
                title={`添加子设备`}
                trigger={<Button {...rest} />}
                formProps={{ layout: 'vertical' }}
                afterOpenChange={(op) => setOpen(op)}
                onSubmit={handleSubmit}
            >
                <Form.Item label={`产品`} name={`productId`} required>
                    <ProductKeySelect
                        onChange={(value: any) => handleProductOnChange(value)}
                    />
                </Form.Item>
                <Form.Item label={`设备`} name={`deviceIds`} required>
                    <Select
                        options={devices}
                        fieldNames={{ label: 'remarkName', value: 'id' }}
                        mode={'multiple'}
                        placeholder={`请选择设备`}
                        disabled={productId == null}
                        labelInValue={false}
                    />
                </Form.Item>
            </ModalForm>
        </>
    );
};

export default ChildDeviceForm;
