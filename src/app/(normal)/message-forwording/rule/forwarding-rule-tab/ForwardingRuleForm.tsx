import { ModalForm } from '@trionesdev/antd-react-ext';
import React, { FC, useEffect, useState } from 'react';
import { Form, Input, message } from 'antd';
import { useRequest } from 'ahooks';
import { messageForwardingApi } from '@apis';

type ForwardingRuleFormInnerProps = {
    ruleId?: string;
};

const ForwardingRuleFormInner: FC<ForwardingRuleFormInnerProps> = ({
    ruleId,
}) => {
    const form = Form.useFormInstance();
    const { run: handleQueryById } = useRequest(
        () => messageForwardingApi.queryForwardingRuleById(ruleId!),
        {
            manual: true,
            onSuccess: (res: any) => {
                form.setFieldsValue(res);
            },
        }
    );

    useEffect(() => {
        if (ruleId) {
            handleQueryById();
        }
    }, [ruleId]);

    return (
        <>
            <Form.Item label={`规则名称`} name={`name`} required={true}>
                <Input placeholder={`请输入规则名称`} />
            </Form.Item>
            <Form.Item label={`规则名称`} name={`description`}>
                <Input.TextArea
                    placeholder={`请输入规则描述`}
                    autoSize={{ maxRows: 4 }}
                />
            </Form.Item>
        </>
    );
};

type ForwardingRuleFormProps = {
    children?: React.ReactElement;
    id?: string;
    onRefresh?: () => void;
};
export const ForwardingRuleForm: FC<ForwardingRuleFormProps> = ({
    children,
    id,
    onRefresh,
}) => {
    const [open, setOpen] = useState(false);

    const { run: handleSubmit } = useRequest(
        (values: any) => {
            if (id) {
                return messageForwardingApi.updateForwardingRuleById(
                    id,
                    values
                );
            } else {
                return messageForwardingApi.createForwardingRule(values);
            }
        },
        {
            manual: true,
            onSuccess: async () => {
                message.success(`${id ? '修改' : '创建'}成功`);
                onRefresh?.();
                setOpen(false);
            },
            onError: async (error: any) => {
                message.error(error.message);
            },
        }
    );

    return (
        <ModalForm
            trigger={children}
            title={`${id ? '修改' : '创建'}消息流转规则`}
            open={open}
            afterOpenChange={setOpen}
            layout={`vertical`}
            onSubmit={handleSubmit}
        >
            <ForwardingRuleFormInner ruleId={id} />
        </ModalForm>
    );
};
