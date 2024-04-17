import { Card, Space, Statistic } from 'antd';

export const DeviceMessageStatistics = () => {
    return (
        <Card
            size={`small`}
            title={`设备消息`}
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
