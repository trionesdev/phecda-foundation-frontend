import styles from './dashboard.module.less';
import { Col, Row } from 'antd';
import { ProductStatistics } from '@/app/(normal)/dashboard/ProductStatistics';
import { DeviceStatistics } from '@/app/(normal)/dashboard/DeviceStatistics';
import { AlarmStatistics } from '@/app/(normal)/dashboard/AlarmStatistics';
import { NodeTypeStatistics } from '@/app/(normal)/dashboard/NodeTypeStatistics';

export const DashboardPage = () => {
    return (
        <div className={styles.dashboardPage}>
            <Row gutter={[8, 8]} wrap={false}>
                <Col flex="auto">
                    <Row gutter={[8, 8]}>
                        <Col span={12}>
                            <ProductStatistics />
                        </Col>
                        <Col span={12}>
                            <DeviceStatistics />
                        </Col>
                        <Col span={24}>
                            <AlarmStatistics />
                        </Col>
                    </Row>
                </Col>
                <Col flex="400px">
                    <Row gutter={[8, 8]}>
                        <Col span={24}>
                            <NodeTypeStatistics />
                        </Col>
                    </Row>
                </Col>
            </Row>
        </div>
    );
};
