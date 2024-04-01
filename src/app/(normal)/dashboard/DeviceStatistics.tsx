import { Card, Col, Flex, Progress, Row, Space, Spin, Statistic } from 'antd';
import { useState } from 'react';
import { useRequest } from 'ahooks';
import { deviceApi } from '@apis';

export const DeviceStatistics = () => {
    const [count, setCount] = useState(0);
    const [enabledCount, setEnabledCount] = useState(0);
    const [disabledCount, setDisabledCount] = useState(0);

    const { loading } = useRequest(() => deviceApi.deviceStatistics(), {
        onSuccess: (res: any) => {
            if (res) {
                setCount(res.count);
                setEnabledCount(res.enabledCount);
                setDisabledCount(res.disabledCount);
            }
        },
    });

    return (
        <Card title={`设备状态`}>
            <Spin spinning={loading}>
                <Row>
                    <Col flex={`150px`}>
                        <Statistic title="设备总数" value={count} />
                    </Col>
                    <Col flex={`auto`}>
                        <Space direction={`vertical`} style={{ width: `100%` }}>
                            <div>
                                <Flex justify={`space-between`}>
                                    <span>已发布</span>
                                    <span>{enabledCount}</span>
                                </Flex>
                                <Progress
                                    percent={(enabledCount / count) * 100}
                                    showInfo={false}
                                />
                            </div>
                            <div>
                                <Flex justify={`space-between`}>
                                    <span>未发布</span>
                                    <span>{disabledCount}</span>
                                </Flex>
                                <Progress
                                    strokeColor={`#9B9B9B`}
                                    percent={(disabledCount / count) * 100}
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
