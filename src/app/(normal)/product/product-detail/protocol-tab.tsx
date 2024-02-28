import { FC, useEffect, useState } from 'react';
import { Button, Form, Input, message, Space } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { Layout, PageHeader } from '@trionesdev/antd-react-ext';
import styles from './product-detail.module.less';
import { deviceApi } from '@apis';
import _ from 'lodash';

type ProtocolTabProps = {
    product: any;
};
const ProtocolTab: FC<ProtocolTabProps> = ({ product }) => {
    const [editStatus, setEditStatus] = useState<boolean>(true);
    const [form] = Form.useForm();
    const handleQueryProtocolProperties = () => {
        deviceApi.queryProductById(product?.id).then((res) => {
            form.setFieldsValue({
                protocolProperties: res.protocolProperties || [],
            });
        });
    };

    const handleSave = () => {
        form.validateFields().then((values) => {
            deviceApi
                .updateProductProtocolProperties(product.id, values)
                .then(() => {
                    message.success('保存成功');
                })
                .catch((ex) => {
                    message.error(ex.message);
                });
        });
    };

    useEffect(() => {
        setEditStatus(_.eq(product?.status, 'DEVELOPMENT'));

        if (product.id) {
            handleQueryProtocolProperties();
        }
    }, [product]);

    return (
        <Layout className={styles.protocolTab} direction={`vertical`}>
            <Layout.Item>
                <PageHeader
                    title={`设备连接协议`}
                    backIcon={false}
                    extra={[
                        editStatus && (
                            <Button type={`primary`} onClick={handleSave}>
                                保存
                            </Button>
                        ),
                    ]}
                />
            </Layout.Item>
            <Layout.Item auto={true}>
                <div className={styles.protocolTabContentWrapper}>
                    <Form form={form} disabled={!editStatus}>
                        <Form.List name={`protocolProperties`}>
                            {(fields, { add, remove }) => (
                                <>
                                    {fields.map(({ key, name }) => (
                                        <Space key={key} align={`baseline`}>
                                            <Form.Item
                                                name={[name, 'label']}
                                                label={`名称`}
                                                rules={[{ required: true }]}
                                            >
                                                <Input />
                                            </Form.Item>
                                            <Form.Item
                                                name={[name, 'name']}
                                                label={`属性`}
                                                rules={[{ required: true }]}
                                            >
                                                <Input />
                                            </Form.Item>
                                            {editStatus && (
                                                <MinusCircleOutlined
                                                    onClick={() => remove(name)}
                                                />
                                            )}
                                        </Space>
                                    ))}
                                    {editStatus && (
                                        <Form.Item>
                                            <Button
                                                type="dashed"
                                                onClick={() => add()}
                                                block
                                                icon={<PlusOutlined />}
                                            >
                                                添加协议项
                                            </Button>
                                        </Form.Item>
                                    )}
                                </>
                            )}
                        </Form.List>
                    </Form>
                </div>
            </Layout.Item>
        </Layout>
    );
};
export default ProtocolTab;
