import {FC} from 'react';
import {Card, Space} from 'antd';
import PropertyDataModal from './property-data-modal';
import {DateUtils} from "@trionesdev/commons";

type PropertyDataCardProps = {
    device: any;
    propertyData: any;
};

const PropertyDataCard: FC<PropertyDataCardProps> = ({
                                                         device,
                                                         propertyData,
                                                     }) => {

    return (

        <Card
            key={propertyData?.identifier}
            size={`small`}
            title={propertyData?.name}
            extra={[
                <PropertyDataModal
                    propertyData={propertyData}
                    deviceData={device}
                />,
            ]}
        >
            <Space direction={`vertical`}>
                <div style={{fontSize: 24}}>{propertyData.value ?? '--'}</div>
                <div>{DateUtils.formatDateTime(propertyData?.ts) ?? '--'}</div>
            </Space>

        </Card>
    );
};
export default PropertyDataCard;
