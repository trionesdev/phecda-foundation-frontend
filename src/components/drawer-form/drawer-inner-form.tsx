import { Form, FormInstance, FormProps } from 'antd';
import React, { forwardRef, useEffect, useImperativeHandle } from 'react';

export interface DrawerInnerFormHandle {
    submit: () => void;
}

type DrawerInnerFormProps = {
    children?: React.ReactElement | React.ReactNode;
    formValues?: any;
    onSubmit?: (values: any, form?: FormInstance<any>) => Promise<any> | void;
    scopeOpen?: boolean;
} & FormProps;
export const DrawerInnerForm = forwardRef<
    DrawerInnerFormHandle,
    DrawerInnerFormProps
>(({ children, formValues, onSubmit, scopeOpen, ...rest }, componentRef) => {
    const [form] = Form.useForm();
    useImperativeHandle(componentRef, () => {
        return {
            submit: () => {
                form.validateFields()
                    .then((values: any) => {
                        if (onSubmit) {
                            return onSubmit(values, form);
                        } else {
                            return Promise.resolve();
                        }
                    })
                    .catch((ex: any) => {
                        console.log(ex);
                    });
            },
        };
    });

    useEffect(() => {
        if (formValues) {
            form.setFieldsValue(formValues);
        } else {
            form.resetFields();
        }
    }, [form, formValues]);
    useEffect(() => {
        if (!scopeOpen) {
            form.resetFields();
        }
    }, [form, scopeOpen]);
    return (
        <Form form={form} {...rest}>
            {children}
        </Form>
    );
});
export default DrawerInnerForm;
