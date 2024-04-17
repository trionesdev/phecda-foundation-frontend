import { DeviceStatistics } from './DeviceStatistics';
import { ProductStatistics } from './ProductStatistics';
import styles from './dashboard.module.less';
import { Col, Row } from 'antd';
import { DeviceAlarmStatistics } from './DeviceAlarmStatistics';
import { AlarmLevelStatistics } from './AlarmLevelStatistics';
import { AlarmTable } from './AlarmTable';
import { DeviceMessageStatistics } from './DeviceMessageStatistics';
import { AlarmStatistics1 } from './AlarmStatistics1';

export const DashboardPage = () => {
    return (
        <div className={styles.dashboardPage}>
            <Row gutter={[8, 8]} wrap={false}>
                <Col span={6}>
                    <ProductStatistics />
                </Col>
                <Col span={6}>
                    <DeviceStatistics />
                </Col>
                <Col span={6}>
                    <DeviceMessageStatistics />
                </Col>
                <Col span={6}>
                    <DeviceAlarmStatistics />
                </Col>
            </Row>
            <Row gutter={[8, 8]} style={{ marginTop: 8 }} wrap={false}>
                <Col flex={`auto`}>
                    <AlarmStatistics1 />
                </Col>
                <Col flex={`400px`}>
                    <AlarmLevelStatistics />
                </Col>
            </Row>
            <Row gutter={[8, 8]} style={{ marginTop: 8 }} wrap={false}>
                <Col span={24}>
                    <AlarmTable />
                </Col>
            </Row>
        </div>
    );
};
