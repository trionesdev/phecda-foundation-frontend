import { FC, useState } from 'react';
import { Card, Col, Space, Typography } from 'antd';
import { formatDateTime } from '@/commons/util/date.utils';
import PropertyDataModal from './property-data-modal';

type ThingModelDataPropertiesTabProps = {
    device: any;
    propertyData: any;
};

const PropertyDataCard: FC<ThingModelDataPropertiesTabProps> = ({
    device,
    propertyData,
}) => {
    const [latestData, setLatestData] = useState<any>({});
    // const { data: latestData, run: queryDeviceDataListLatest } = useRequest(
    //     (params: any) => {
    //         return deviceDataApi.queryDeviceDataListLatest(params);
    //     },
    //     { manual: true }
    // );
    // useEffect(() => {
    //     if (isNilEmpty(propertyData) || isNilEmpty(device)) return;
    //     queryDeviceDataListLatest({
    //         deviceName: device?.name,
    //         propertyIdentifier: propertyData?.identifier,
    //     });
    // }, [device, propertyData, queryDeviceDataListLatest]);
    return (
        <Col key={propertyData?.name} span={6}>
            <Card
                key={propertyData.identifier}
                size={`small`}
                title={propertyData.name}
                extra={[
                    <PropertyDataModal
                        propertyData={propertyData}
                        deviceData={device}
                    />,
                ]}
            >
                <Space>
                    <Typography.Paragraph>
                        {latestData?.value ?? '--'}
                    </Typography.Paragraph>
                </Space>
                <div>{formatDateTime(latestData?.ts) ?? '--'}</div>
            </Card>
        </Col>
    );
};
export default PropertyDataCard;
