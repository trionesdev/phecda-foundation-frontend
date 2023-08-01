import { Button, ButtonProps, Form, Input, message, Select } from 'antd';
import { FC, useEffect, useState } from 'react';
import { deviceApi, nodeApi } from '@apis';
import ProductSelect from '@components/product-select';
import ModalForm from '@/components/modal-form';

type DeviceFormProps = {
    isEdit?: boolean;
    onSuccess?: () => void;
    initValue?: Record<string, any>;
} & ButtonProps;

const DeviceForm: FC<DeviceFormProps> = ({
    onSuccess,
    isEdit,
    initValue,
    ...rest
}) => {
    const [open, setOpen] = useState(false);
    const [nodes, setNodes] = useState([]);
    const handleSubmit = (values: any) => {
        deviceApi
            .createDevice(values)
            .then(() => {
                setOpen(false);
                message.success('保存成功');
                if (onSuccess) {
                    onSuccess();
                }
            })
            .catch((ex) => {
                message.error(ex.message);
            });
    };

    const listNodes = () => {
        nodeApi.list().then((res) => {
            setNodes(res || []);
        });
    };

    useEffect(() => {
        if (open) {
            listNodes();
        }
    }, [open]);

    return (
        <ModalForm
            open={open}
            title={`添加设备`}
            trigger={<Button {...rest} />}
            layout={`vertical`}
            onOpenChange={(op) => setOpen(op)}
            onSubmit={(values) => {
                !isEdit && handleSubmit(values);
                //TODO:编辑
                isEdit && message.error('TODO');
            }}
            initialValues={
                isEdit
                    ? {
                          productId: initValue?.productId,
                          name: initValue?.name,
                          remarkName: initValue?.remarkName,
                          nodeId: initValue?.nodeId,
                      }
                    : undefined
            }
        >
            <Form.Item
                label={`产品`}
                name={`productId`}
                rules={[{ required: true }]}
            >
                <ProductSelect />
            </Form.Item>
            <Form.Item
                label={`DeviceName/设备名称`}
                name={`name`}
                rules={[{ required: true }]}
            >
                <Input />
            </Form.Item>
            <Form.Item label={`备注名称`} name={`remarkName`}>
                <Input />
            </Form.Item>
            <Form.Item
                label={`边缘节点`}
                name={`nodeId`}
                rules={[{ required: true }]}
            >
                <Select
                    options={nodes}
                    fieldNames={{ label: 'name', value: 'id' }}
                    placeholder={`请选择归属的边缘节点`}
                />
            </Form.Item>
        </ModalForm>
    );
};
export default DeviceForm;
