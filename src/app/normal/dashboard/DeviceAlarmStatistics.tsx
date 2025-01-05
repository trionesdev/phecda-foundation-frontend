import { Card, Space, Spin, Statistic } from 'antd';
import { useState } from 'react';
import { useRequest } from 'ahooks';
import { alarmApi, deviceDataApi } from '@apis/tenant';

export const DeviceAlarmStatistics = () => {
    const [alarmStatistics, setAlarmStatistics] = useState<{
        total?: number;
        mouthTotal?: number;
        dayTotal?: number;
    }>({});

    const { loading } = useRequest(
        () => {
            return alarmApi.queryAlarmStatistics();
        },
        {
            onSuccess(data: any) {
                setAlarmStatistics(data);
            },
        }
    );

    return (
        <Card
            size={`small`}
            title={`设备告警`}
            styles={{ body: { height: 120 } }}
        >
            <Spin spinning={loading}>
                <Statistic value={alarmStatistics?.total || 0} />
                <Space>
                    <Space>
                        <strong>本月：</strong>
                        <Statistic
                            value={alarmStatistics?.mouthTotal || 0}
                            valueStyle={{ fontSize: 14 }}
                        />
                    </Space>
                    <Space>
                        <strong>今日：</strong>
                        <Statistic
                            value={alarmStatistics.dayTotal || 0}
                            valueStyle={{ fontSize: 14 }}
                        />
                    </Space>
                </Space>
            </Spin>
        </Card>
    );
};
