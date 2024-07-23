import { ModalForm } from '@trionesdev/antd-react-ext';
import React, { FC } from 'react';
import { Alert, Form, message } from 'antd';
import { useRequest } from 'ahooks';
import { messageForwardingApi } from '@apis';
import { SourcesSelect } from '../components/sources-select';

type SourceLinkFormProps = {
    children?: React.ReactElement;
    ruleId?: string;
    onRefresh?: () => void;
};

export const SourceLinkForm: FC<SourceLinkFormProps> = ({
    children,
    ruleId,
    onRefresh,
}) => {
    const [open, setOpen] = React.useState(false);

    const { run: handleSubmit } = useRequest(
        (values) =>
            messageForwardingApi.addForwardingRuleSource(ruleId!, values),
        {
            manual: true,
            onSuccess: async () => {
                message.success('数据源关联成功');
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
            title={`关联数据源`}
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
                                1. 数据源中配置的所有 Topic
                                的消息都会流转到规则中进行处理
                            </div>
                            <div>2. 一个流转规则只能关联一个数据源</div>
                        </>
                    }
                />
            </Form.Item>
            <Form.Item label={`数据源`} name={`sourceId`} required={true}>
                <SourcesSelect />
            </Form.Item>
        </ModalForm>
    );
};
