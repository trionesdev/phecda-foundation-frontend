import { FC, useEffect, useState } from 'react';
import ModalForm from '@components/modal-form';
import { Button, ButtonProps, Form, Input, notification, Select } from 'antd';
import ProductSelect from '@components/product-select';
import { deviceApi, nodeApi } from '@apis';
import _ from 'lodash';

type NodeChildDeviceFormProps = {
    nodeId: string;
    onSuccess?: () => void;
} & ButtonProps;

const NodeChildDeviceForm: FC<NodeChildDeviceFormProps> = ({
    nodeId,
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
        nodeApi
            .addChildDevice(nodeId, deviceIds!)
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
                title={`添加终端设备`}
                trigger={<Button {...rest} />}
                layout={`vertical`}
                onOpenChange={(op) => setOpen(op)}
                onSubmit={handleSubmit}
            >
                <Form.Item label={`产品`} name={`productId`} required>
                    <ProductSelect
                        onChange={(value) => handleProductOnChange(value)}
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

export default NodeChildDeviceForm;
