import {FC, useEffect} from 'react';
import {Form, Input, Space, Button, message} from 'antd';
import styles from './device-detail.module.less';
import {Layout, PageHeader} from '@trionesdev/antd-react-ext';
import {useRequest} from 'ahooks';
import {deviceApi} from '@apis/tenant';
import {arrayToObject} from '@/commons/util/arrayToObject';
import {objectToArray} from '@/commons/util/objectToArray';

type ProtocolTabProps = {
    device: any;
    afterChange: () => void;
};
const ProtocolTab: FC<ProtocolTabProps> = ({device, afterChange}) => {
    const [form] = Form.useForm();
    const protocolProperties = device?.product?.protocolProperties;

    const {run: updateDeviceProtocolProperties} = useRequest(
        (id, data) => {
            return deviceApi.updateDeviceProtocolProperties(id, data);
        },
        {
            manual: true,
            onSuccess() {
                message.success('保存成功');
                afterChange();
            },
        }
    );
    useEffect(() => {
        const value = arrayToObject(device?.protocols ?? []);
        form.setFieldsValue({...value});
    }, [device, form]);


    return (
        <Layout className={styles.ProtocolTab}>
            <Layout.Item>
                <PageHeader
                    title={`设备连接协议`}
                    backIcon={false}
                    extra={[
                        <Button
                            type={`primary`}
                            onClick={() => {
                                const value = form.getFieldsValue(true);
                                const protocolsValue = objectToArray(value);
                                console.log(protocolsValue);
                                updateDeviceProtocolProperties(device?.id, {
                                    protocols: protocolsValue,
                                });
                            }}
                        >
                            保存
                        </Button>,
                    ]}
                />
            </Layout.Item>
            <Layout.Item auto={true}>
                <Form form={form}>
                    <Space wrap>
                        {protocolProperties?.map(
                            (item: { label: string; name: string }) => {
                                return (
                                    <Form.Item
                                        key={item.name}
                                        name={item.name}
                                        label={item.label}
                                        rules={[{required: true}]}
                                    >
                                        <Input/>
                                    </Form.Item>
                                );
                            }
                        )}
                    </Space>{' '}
                </Form>
            </Layout.Item>
        </Layout>
    );
};
export default ProtocolTab;
