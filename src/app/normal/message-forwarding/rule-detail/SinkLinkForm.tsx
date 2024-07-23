import { ModalForm } from '@trionesdev/antd-react-ext';
import React, { FC } from 'react';
import { Alert, Form, message } from 'antd';
import { useRequest } from 'ahooks';
import { messageForwardingApi } from '@apis';
import { SinksSelect } from '../components/sinks-select';

type SinkLinkFormProps = {
    children?: React.ReactElement;
    ruleId?: string;
    onRefresh?: () => void;
};

export const SinkLinkForm: FC<SinkLinkFormProps> = ({
    children,
    ruleId,
    onRefresh,
}) => {
    const [open, setOpen] = React.useState(false);

    const { run: handleSubmit } = useRequest(
        (values) => messageForwardingApi.addForwardingRuleSink(ruleId!, values),
        {
            manual: true,
            onSuccess: async () => {
                message.success('数据目的关联成功');
                onRefresh?.();
                setOpen(false);
            },
            onError: async (ex) => {
                message.error(ex.message);
            },
        }
    );

    return (
        <ModalForm
            trigger={children}
            title={`关联数据目的`}
            open={open}
            afterOpenChange={setOpen}
            formProps={{ layout: 'vertical' }}
            onSubmit={handleSubmit}
        >
            <Form.Item>
                <Alert
                    type={`info`}
                    message={
                        <>
                            <div>
                                1. 规则处理后的数据只能流转到已关联的数据目的中
                            </div>
                            <div>2. 最多可关联10个数据目的。</div>
                        </>
                    }
                />
            </Form.Item>
            <Form.Item label={`数据目的`} name={`sinkId`} required={true}>
                <SinksSelect />
            </Form.Item>
        </ModalForm>
    );
};
