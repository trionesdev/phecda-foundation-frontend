import { FC, useEffect } from 'react'
import { Button, Col, Form, Input, notification, Row, Space } from 'antd'
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons'
import { PageHeader, VPanel } from '@moensun/antd-react-ext'
import styles from './product-detail.module.less'
import { deviceApi } from '@apis'

type ProtocolTabProps = {
    product: any
}
const ProtocolTab: FC<ProtocolTabProps> = ({ product }) => {
    const [form] = Form.useForm()
    const handleQueryProtocolProperties = () => {
        deviceApi.queryProductById(product?.id).then((res) => {
            form.setFieldsValue({
                protocolProperties: res.protocolProperties || [],
            })
        })
    }

    const handleSave = () => {
        form.validateFields().then((values) => {
            deviceApi
                .updateProductProtocolProperties(product.id, values)
                .then(() => {
                    notification.success({ message: '保存成功' })
                })
                .catch((ex) => {
                    notification.error({ message: ex.message })
                })
        })
    }

    useEffect(() => {
        if (product.id) {
            handleQueryProtocolProperties()
        }
    }, [product])

    const tabToolbar = (
        <PageHeader
            title={`设备连接协议`}
            backIcon={false}
            extra={[
                <Button type={`primary`} onClick={handleSave}>
                    保存
                </Button>,
            ]}
        />
    )
    return (
        <VPanel className={styles.protocolTab} header={tabToolbar}>
            <div className={styles.protocolTabContentWrapper}>
                <Form form={form}>
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
                                        <MinusCircleOutlined
                                            onClick={() => remove(name)}
                                        />
                                    </Space>
                                ))}
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
                            </>
                        )}
                    </Form.List>
                </Form>
            </div>
        </VPanel>
    )
}
export default ProtocolTab
