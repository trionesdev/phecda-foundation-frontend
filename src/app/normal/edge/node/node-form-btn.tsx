import { FC, useState } from 'react';
import { Button, ButtonProps, Form, Input, message } from 'antd';
import { nodeApi } from '@apis';
import DrawerForm from '@components/drawer-form';

type NodeFormBtnProps = {
    id?: string;
    isEdit?: boolean;
    initValue?: Record<string, any>;
    onSuccess?: () => void;
} & ButtonProps;
const NodeFormBtn: FC<NodeFormBtnProps> = ({
    id,
    onSuccess,
    isEdit,
    initValue,
    ...rest
}) => {
    const [open, setOpen] = useState(false);
    const handleSubmit = (values: any) => {
        let request: Promise<any>;
        if (id) {
            const params = {
                id,
                ...values,
            };
            request = nodeApi.updateById(params);
        } else {
            request = nodeApi.save(values);
        }
        request.then(() => {
            setOpen(false);
            message.success('操作成功');
            if (onSuccess) {
                onSuccess();
            }
        });
    };

    return (
        <DrawerForm
            open={open}
            trigger={<Button {...rest} />}
            title={`${isEdit ? '编辑' : '新建'}节点`}
            layout={`vertical`}
            onOpenChange={(op) => setOpen(op)}
            initialValues={isEdit ? { ...initValue } : { nodeType: 'DIRECT' }}
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
                label={`标识`}
                name={`identifier`}
                rules={[{ required: true }]}
            >
                <Input />
            </Form.Item>
            <Form.Item label={`备注`} name={`remark`}>
                <Input />
            </Form.Item>
        </DrawerForm>
    );
};
export default NodeFormBtn;
