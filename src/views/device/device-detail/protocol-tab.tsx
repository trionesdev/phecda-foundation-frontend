import { FC } from 'react';
import { Typography, Form, Input, Space, Button } from 'antd';
import styles from './device-detail.module.less';
import VPanel from '@/components/v-panel';
import { PageHeader } from '@moensun/antd-react-ext';
import { useRequest } from 'ahooks';
import { deviceApi } from '@/apis';

type ProtocolTabProps = {
    device: any;
};
const ProtocolTab: FC<ProtocolTabProps> = ({ device }) => {
    const [form] = Form.useForm();
    const protocolProperties = device?.product?.protocolProperties;
    console.log(device);
    const { run: updateDeviceProtocolProperties } = useRequest(
        (id, data) => {
            return deviceApi.updateDeviceProtocolProperties(id, data);
        },
        { manual: true }
    );
    const tabToolbar = (
        <PageHeader
            title={`设备连接协议`}
            backIcon={false}
            extra={[
                <Button
                    type={`primary`}
                    onClick={() => {
                        const value = form.getFieldsValue(true);
                        console.log(value);
                        return;
                        updateDeviceProtocolProperties(device?.id, value);
                    }}
                >
                    保存
                </Button>,
            ]}
        />
    );
    return (
        <>
            <VPanel className={styles.ProtocolTab} header={tabToolbar}>
                <Form form={form}>
                    <Space wrap>
                        {protocolProperties?.map(
                            (item: { label: string; name: string }) => {
                                return (
                                    <Form.Item
                                        key={item.name}
                                        name={item.name}
                                        label={item.label}
                                        rules={[{ required: true }]}
                                    >
                                        <Input />
                                    </Form.Item>
                                );
                            }
                        )}
                    </Space>{' '}
                </Form>
            </VPanel>
        </>
    );
};
export default ProtocolTab;
