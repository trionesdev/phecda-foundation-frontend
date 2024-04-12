import { Card, Col, Flex, Progress, Row, Space, Spin, Statistic } from 'antd';
import { useState } from 'react';
import { useRequest } from 'ahooks';
import { deviceApi } from '@apis';

export const ProductStatistics = () => {
    const [count, setCount] = useState(0);
    const [publishedCount, setPublishedCount] = useState(0);
    const [unpublishedCount, setUnpublishedCount] = useState(0);

    const { loading } = useRequest(() => deviceApi.productStatistics(), {
        onSuccess: (res: any) => {
            if (res) {
                setCount(res.count);
                setPublishedCount(res.publishedCount);
                setUnpublishedCount(res.unpublishedCount);
            }
        },
    });

    return (
        <Card
            size={`small`}
            title={`产品状态`}
            styles={{ body: { height: 120 } }}
        >
            <Spin spinning={loading}>
                <Row>
                    <Col flex={`150px`}>
                        <Statistic title="产品总数" value={count} />
                    </Col>
                    <Col flex={`auto`}>
                        <Space direction={`vertical`} style={{ width: `100%` }}>
                            <div>
                                <Flex justify={`space-between`}>
                                    <span>已发布</span>
                                    <span>{publishedCount}</span>
                                </Flex>
                                <Progress
                                    percent={(publishedCount / count) * 100}
                                    showInfo={false}
                                />
                            </div>
                            <div>
                                <Flex justify={`space-between`}>
                                    <span>未发布</span>
                                    <span>{unpublishedCount}</span>
                                </Flex>
                                <Progress
                                    strokeColor={`#9B9B9B`}
                                    percent={(unpublishedCount / count) * 100}
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
