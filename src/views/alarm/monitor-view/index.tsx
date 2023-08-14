import React from 'react';
import styles from './index.module.less';
import VPanel from '@/components/v-panel';
import { Form, Select, Space } from 'antd';
import useQueryDictionaryOptions from '@/hooks/useOptions/useQueryDictionaryOptions';
import useQueryAssetsAll from '@/hooks/useOptions/useQueryAssetsAll';

const MonitorView: React.FC = () => {
    const { typeCodeOptions: locationCodeOptions } =
        useQueryDictionaryOptions('location_code');

    const { allAssetsOptions } = useQueryAssetsAll();
    return (
        <Form className={styles.wrapper}>
            <VPanel>
                <div className={styles.contentWrapper}>
                    <Space wrap size={30} style={{ padding: 8 }}>
                        <Form.Item
                            rules={[{ required: true }]}
                            name="locationCode"
                            label="区域位置"
                        >
                            <Select
                                options={locationCodeOptions}
                                style={{ width: 230 }}
                            />
                        </Form.Item>
                        <Form.Item name="assetSn" label={`生产设备`}>
                            <Select
                                allowClear={true}
                                style={{ width: 230 }}
                                options={allAssetsOptions}
                            />
                        </Form.Item>
                        <Form.Item name="typeCode" label={`监控设备`}>
                            <Select style={{ width: 230 }} options={[]} />
                        </Form.Item>
                    </Space>
                    <div className={styles.viewWrapper}>监控视图：TODO</div>
                </div>
            </VPanel>
        </Form>
    );
};

export default MonitorView;
