import { FC } from 'react';
import { Card, Col, Row } from 'antd';
import styles from './index.module.less';

type AlarmLogOverviewProps = {};

const AlarmLogOverview: FC<AlarmLogOverviewProps> = () => {
    return (
        <div className={styles.container}>
            <Row gutter={16}>
                <Col span={4}>
                    <Card bordered={true}>
                        <p className={styles.containerTitle}>未处理报警</p>
                        <p
                            className={styles.containerContext}
                            style={{ color: 'red' }}
                        >
                            0
                        </p>
                    </Card>
                </Col>
                <Col span={4}>
                    <Card bordered={true}>
                        <p className={styles.containerTitle}>已处理报警</p>
                        <p className={styles.containerContext}>0</p>
                    </Card>
                </Col>
                <Col span={4}>
                    <Card bordered={true}>
                        <p className={styles.containerTitle}>本月全部告警</p>
                        <p className={styles.containerContext}>0</p>
                    </Card>
                </Col>
            </Row>
        </div>
    );
};

export default AlarmLogOverview;
