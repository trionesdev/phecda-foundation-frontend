import styles from './dashboard.module.less';
import { Col, Row } from 'antd';
import { ProductStatistics } from '@/app/(normal)/dashboard/ProductStatistics';
import { DeviceStatistics } from '@/app/(normal)/dashboard/DeviceStatistics';
import { AlarmStatistics1 } from '@/app/(normal)/dashboard/AlarmStatistics1';
import { DeviceMessageStatistics } from '@/app/(normal)/dashboard/DeviceMessageStatistics';
import { DeviceAlarmStatistics } from '@/app/(normal)/dashboard/DeviceAlarmStatistics';
import { AlarmLevelStatistics } from '@/app/(normal)/dashboard/AlarmLevelStatistics';
import { AlarmTable } from '@/app/(normal)/dashboard/AlarmTable';

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
