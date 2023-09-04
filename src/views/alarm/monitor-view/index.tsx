import React from 'react';
import styles from './index.module.less';
import VPanel from '@/components/v-panel';
import { Form, Select, Space } from 'antd';
import ReactPlayer from 'react-player';
import useQueryDeviceAll from '@/hooks/useOptions/useQueryDeviceAll';

const MonitorView: React.FC = () => {
    const { allDeviceDataOptions } = useQueryDeviceAll();
    return (
        <Form className={styles.wrapper}>
            <VPanel>
                <div className={styles.contentWrapper}>
                    <Space wrap size={30} style={{ padding: 8 }}>
                        <Form.Item name="assetSn" label={`生产设备`}>
                            <Select
                                allowClear={true}
                                style={{ width: 230 }}
                                options={allDeviceDataOptions}
                            />
                        </Form.Item>
                    </Space>
                    <div className={styles.viewWrapper}>
                        <ReactPlayer
                            url="http://192.168.10.80:8080/movie/stream.live.flv"
                            playing={true}
                            // controls={true}
                            muted={true}
                            config={{
                                file: {
                                    forceFLV: true,
                                },
                            }}
                        />
                    </div>
                </div>
            </VPanel>
        </Form>
    );
};

export default MonitorView;
