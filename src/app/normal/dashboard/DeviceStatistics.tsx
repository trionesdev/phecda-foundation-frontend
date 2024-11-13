import { Card, Col, Flex, Progress, Row, Space, Spin, Statistic } from 'antd';
import { useState } from 'react';
import { useRequest } from 'ahooks';
import { deviceApi } from '@apis/tenant';

export const DeviceStatistics = () => {
    const [deviceStatistics, setDeviceStatistics] = useState<{
        count?: number;
        enabledCount?: number;
        disabledCount?: number;
    }>({});

    const { loading } = useRequest(() => deviceApi.deviceStatistics(), {
        onSuccess: (res: any) => {
            if (res) {
                setDeviceStatistics(res);
            }
        },
    });

    return (
        <Card
            size={`small`}
            title={`设备状态`}
            styles={{ body: { height: 120 } }}
        >
            <Spin spinning={loading}>
                <Row>
                    <Col flex={`150px`}>
                        <Statistic
                            title="设备总数"
                            value={deviceStatistics?.count || 0}
                        />
                    </Col>
                    <Col flex={`auto`}>
                        <Space direction={`vertical`} style={{ width: `100%` }}>
                            <div>
                                <Flex justify={`space-between`}>
                                    <span>已发布</span>
                                    <span>{}</span>
                                </Flex>
                                <Progress
                                    percent={
                                        ((deviceStatistics?.enabledCount || 0) /
                                            (deviceStatistics?.count || 0)) *
                                        100
                                    }
                                    showInfo={false}
                                />
                            </div>
                            <div>
                                <Flex justify={`space-between`}>
                                    <span>未发布</span>
                                    <span>
                                        {deviceStatistics.disabledCount || 0}
                                    </span>
                                </Flex>
                                <Progress
                                    strokeColor={`#9B9B9B`}
                                    percent={
                                        ((deviceStatistics.disabledCount || 0) /
                                            (deviceStatistics?.count || 0)) *
                                        100
                                    }
                                    showInfo={false}
                                />
                            </div>
                        </Space>
                    </Col>
                </Row>
            </Spin>
        </Card>
    );
};
