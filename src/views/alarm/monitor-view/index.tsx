import React, { useEffect, useState } from 'react';
import styles from './index.module.less';
import VPanel from '@/components/v-panel';
import { Form, Select, Space } from 'antd';
import useQueryProductsList from '@/hooks/useOptions/useQueryProductsList';
import useQueryDeviceByParams from '@/hooks/useOptions/useQueryDeviceByParams';
import { useRequest } from 'ahooks';
import { deviceApi } from '@apis/tenant';
import { isNilEmpty } from '@/commons/util/isNilEmpty';
import NoVideoJpg from '@/images/no-video.jpg';
import FlvVideo from '@components/flv-video';

const MonitorView: React.FC = () => {
    const [form] = Form.useForm();
    const { deviceData, queryDeviceList } = useQueryDeviceByParams();
    const { productOptions } = useQueryProductsList();
    const [deviceOptions, setDeviceOptions] = useState<any>();
    const [url, setUrl] = useState<string>();
    const { runAsync: startPushStreaming } = useRequest(
        (id: string) => deviceApi.startPushStreaming(id),
        { manual: true }
    );

    const handleProductChange = (value: string) => {
        queryDeviceList({
            productId: value,
        });

        form.resetFields(['device']);
        setUrl(undefined);
    };

    const handleDeviceChange = (value: string) => {
        startPushStreaming(value).then((res) => {
            setUrl(res);
        });
    };

    const handlePlayError = () => {
        setUrl(undefined);
    };

    useEffect(() => {
        const options = deviceData?.map((item: any) => {
            return {
                label: item.remarkName,
                value: item?.id,
                ...item,
            };
        });
        setDeviceOptions(options);
    }, [deviceData]);

    return (
        <Form form={form} className={styles.wrapper}>
            <VPanel>
                <div className={styles.contentWrapper}>
                    <Space wrap size={30} style={{ padding: 8 }}>
                        <Form.Item name="product" label={`产品`}>
                            <Select
                                style={{ width: 230 }}
                                options={productOptions}
                                onChange={handleProductChange}
                            />
                        </Form.Item>
                        <Form.Item name="device" label={`设备`}>
                            <Select
                                style={{ width: 230 }}
                                options={deviceOptions}
                                onChange={handleDeviceChange}
                            />
                        </Form.Item>
                    </Space>
                    <div className={styles.viewWrapper}>
                        {isNilEmpty(url) && (
                            <img
                                style={{
                                    width: 640,
                                    height: 360,
                                    marginLeft: 8,
                                }}
                                src={NoVideoJpg}
                                alt=""
                            />
                        )}
                        {!isNilEmpty(url) && (
                            <FlvVideo url={url} onError={handlePlayError} />
                        )}
                    </div>
                </div>
            </VPanel>
        </Form>
    );
};

export default MonitorView;
