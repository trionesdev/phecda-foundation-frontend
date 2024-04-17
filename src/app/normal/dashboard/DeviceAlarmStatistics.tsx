import { Card, Space, Statistic } from 'antd';

export const DeviceAlarmStatistics = () => {
    return (
        <Card
            size={`small`}
            title={`设备告警`}
            styles={{ body: { height: 120 } }}
        >
            <Statistic value={1000000} />
            <Space>
                <Space>
                    <strong>本月：</strong>
                    <Statistic value={1128} valueStyle={{ fontSize: 14 }} />
                </Space>
                <Space>
                    <strong>今日：</strong>
                    <Statistic value={1128} valueStyle={{ fontSize: 14 }} />
                </Space>
            </Space>
        </Card>
    );
};
