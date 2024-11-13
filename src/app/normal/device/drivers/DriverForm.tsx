import React, { FC, useEffect } from 'react';
import { ModalForm } from '@trionesdev/antd-react-ext';
import { Form, Input, message, Spin } from 'antd';
import { driverApi } from '@apis/tenant';
import { useRequest } from 'ahooks';

type DriverFormProps = {
    children?: React.ReactElement;
    id?: string;
    onRefresh?: () => void;
};
export const DriverForm: FC<DriverFormProps> = ({
    children,
    id,
    onRefresh,
}) => {
    const [open, setOpen] = React.useState(false);
    const [form] = Form.useForm();

    const { run: handleQueryDriverById, loading } = useRequest(
        () => {
            return driverApi.queryDriverById(id!!);
        },
        {
            manual: true,
            onSuccess: (res: any) => {
                form.setFieldsValue(res);
            },
        }
    );

    const handleSubmit = (values: any) => {
        let request = id
            ? driverApi.updateDriverById(id, values)
            : driverApi.createDriver(values);
        request
            .then(async () => {
                message.success(`${id ? '编辑' : '新建'}成功`);
                onRefresh?.();
                setOpen(false);
            })
            .catch(async (ex: any) => {
                message.error(ex.message);
            });
    };

    useEffect(() => {
        if (open && id) {
            handleQueryDriverById();
        }
    }, [open, id]);

    return (
        <ModalForm
            form={form}
            trigger={children}
            open={open}
            afterOpenChange={(open) => {
                setOpen(open);
            }}
            title={`${id ? '编辑' : '新建'}驱动`}
            formProps={{ layout: 'vertical' }}
            onSubmit={handleSubmit}
        >
            <Spin spinning={loading}>
                <Form.Item label={`名称`} name={`name`}>
                    <Input />
                </Form.Item>
                <Form.Item label={`描述`} name={`description`}>
                    <Input.TextArea autoSize={{ maxRows: 3 }} />
                </Form.Item>
            </Spin>
        </ModalForm>
    );
};
