import { Button, Form, Space } from 'antd';
import {
    ForwardRefRenderFunction,
    ReactNode,
    forwardRef,
    useCallback,
    useImperativeHandle,
} from 'react';

import styles from './index.module.less';

type ISearchToolbar = {
    formItems?: ReactNode;
    hideSearch?: boolean;
    hideReset?: boolean;
    onSearch?: (values: Record<string, any>) => void;
    addButtons?: ReactNode;
};

const SearchToolbar: ForwardRefRenderFunction<any, ISearchToolbar> = (
    { formItems, hideSearch = false, hideReset = false, onSearch, addButtons },
    ref
) => {
    const [form] = Form.useForm();

    const onFinish = useCallback(
        (values: any) => {
            onSearch?.(values);
        },
        [onSearch]
    );

    useImperativeHandle(
        ref,
        () => {
            return {
                setFieldValue: (field: string, value: string) => {
                    form.setFieldValue(field, value);
                },
            };
        },
        [form]
    );

    return (
        <Form
            form={form}
            onFinish={onFinish}
            className={styles['search-toolbar']}
        >
            {formItems}
            <div className={styles['buttons-occupier']}></div>
            <Form.Item className={styles['buttons']}>
                <Space>
                    {!hideSearch && (
                        <Button type="primary" htmlType="submit">
                            查询
                        </Button>
                    )}
                    {!hideReset && (
                        <Button
                            htmlType="button"
                            onClick={() => {
                                form.resetFields();
                                onSearch?.(form.getFieldsValue());
                            }}
                        >
                            重置
                        </Button>
                    )}
                    {addButtons}
                </Space>
            </Form.Item>
        </Form>
    );
};

export default forwardRef(SearchToolbar);
