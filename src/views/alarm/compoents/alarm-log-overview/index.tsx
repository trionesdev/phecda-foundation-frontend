import { FC } from 'react';
import { Card, Col, Row } from 'antd';
import styles from './index.module.less';

type AlarmLogOverviewProps = {
    statisticsData: Record<string, any>;
};

const AlarmLogOverview: FC<AlarmLogOverviewProps> = ({ statisticsData }) => {
    return (
        <div className={styles.container}>
            <Row gutter={16}>
                <Col span={4}>
                    <Card bordered={true}>
                        <p className={styles.containerTitle}>全部报警</p>
                        <p
                            className={styles.containerContext}
                            style={{ color: 'red' }}
                        >
                            {statisticsData?.allAlarms ?? '--'}
                        </p>
                    </Card>
                </Col>
                <Col span={4}>
                    <Card bordered={true}>
                        <p className={styles.containerTitle}>未处理报警</p>
                        <p className={styles.containerContext}>
                            {statisticsData?.notDealAlarms ?? '--'}
                        </p>
                    </Card>
                </Col>
                <Col span={4}>
                    <Card bordered={true}>
                        <p className={styles.containerTitle}>本月全部告警</p>
                        <p className={styles.containerContext}>
                            {statisticsData?.monthlyAlarms ?? '--'}
                        </p>
                    </Card>
                </Col>
            </Row>
        </div>
    );
};

export default AlarmLogOverview;
