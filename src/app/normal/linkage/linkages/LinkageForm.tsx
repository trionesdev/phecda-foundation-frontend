import { Form, Input, message, Spin } from 'antd';
import { ModalForm } from '@trionesdev/antd-react-ext';
import React, { FC, useEffect } from 'react';
import { operationApi } from '@apis';
import { useRequest } from 'ahooks';

type LinkageFormProps = {
    children: React.ReactElement;
    id?: string;
    onRefresh?: () => void;
};
export const LinkageForm: FC<LinkageFormProps> = ({
    children,
    id,
    onRefresh,
}) => {
    const [open, setOpen] = React.useState(false);
    const [formValues, setFormValues] = React.useState({});

    const { run, loading } = useRequest(() => operationApi.getScenesById(id!), {
        manual: true,
        onSuccess: (res) => {
            setFormValues(res);
        },
    });

    useEffect(() => {
        if (id && open) {
            run();
        }
    }, [id, open]);

    return (
        <ModalForm
            trigger={children}
            open={open}
            title={`${id ? '编辑' : '新建'}场景`}
            formProps={{ layout: 'vertical' }}
            afterOpenChange={(op) => setOpen(op)}
            onSubmit={(values) => {
                let request = id
                    ? operationApi.editScenesStatusById(id, values)
                    : operationApi.addScenes(values);
                request
                    .then(async () => {
                        message.success(`${id ? '编辑' : '新建'}场景成功`);
                        setOpen(false);
                        onRefresh && onRefresh();
                    })
                    .catch(async (e) => {
                        message.error(e.message);
                    });
            }}
            formValues={formValues}
        >
            <Spin spinning={loading}>
                <Form.Item
                    name="name"
                    label="场景名称"
                    rules={[{ required: true }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item name="description" label="场景描述">
                    <Input.TextArea autoSize={{ minRows: 2, maxRows: 4 }} />
                </Form.Item>
            </Spin>
        </ModalForm>
    );
};
