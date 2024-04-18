import { Card, Space, Spin, Statistic } from 'antd';
import { useState } from 'react';
import { useRequest } from 'ahooks';
import { deviceDataApi } from '@apis';

export const DeviceMessageStatistics = () => {
    const [propertiesPostStatistics, setPropertiesPostStatistics] = useState<{
        total?: number;
        mouthTotal?: number;
        dayTotal?: number;
    }>({});

    const { loading } = useRequest(
        () => {
            return deviceDataApi.queryPropertiesPostStatistics();
        },
        {
            onSuccess(data: any) {
                setPropertiesPostStatistics(data);
            },
        }
    );

    return (
        <Card
            size={`small`}
            title={`设备消息`}
            styles={{ body: { height: 120 } }}
        >
            <Spin spinning={loading}>
                <Statistic value={propertiesPostStatistics.total || 0} />
                <Space>
                    <Space>
                        <strong>本月：</strong>
                        <Statistic
                            value={propertiesPostStatistics.mouthTotal || 0}
                            valueStyle={{ fontSize: 14 }}
                        />
                    </Space>
                    <Space>
                        <strong>今日：</strong>
                        <Statistic
                            value={propertiesPostStatistics.dayTotal || 0}
                            valueStyle={{ fontSize: 14 }}
                        />
                    </Space>
                </Space>
            </Spin>
        </Card>
    );
};
