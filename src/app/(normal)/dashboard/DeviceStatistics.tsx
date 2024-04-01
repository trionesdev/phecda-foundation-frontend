import { Card, Col, Flex, Progress, Row, Space, Statistic } from 'antd';

export const DeviceStatistics = () => {
    return (
        <Card title={`设备状态`}>
            <Row>
                <Col flex={`150px`}>
                    <Statistic title="设备总数" value={112893} />
                </Col>
                <Col flex={`auto`}>
                    <Space direction={`vertical`} style={{ width: `100%` }}>
                        <div>
                            <Flex justify={`space-between`}>
                                <span>已发布</span>
                                <span>11</span>
                            </Flex>
                            <Progress percent={50} showInfo={false} />
                        </div>
                        <div>
                            <Flex justify={`space-between`}>
                                <span>未发布</span>
                                <span>11</span>
                            </Flex>
                            <Progress
                                strokeColor={`#9B9B9B`}
                                percent={50}
                                showInfo={false}
                            />
                        </div>
                    </Space>
                </Col>
            </Row>
        </Card>
    );
};
