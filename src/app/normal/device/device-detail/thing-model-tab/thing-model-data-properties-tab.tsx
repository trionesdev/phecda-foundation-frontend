import { FC, useEffect, useState } from 'react';
import { Row } from 'antd';
import { deviceApi } from '@apis/tenant';
import styles from '../device-detail.module.less';
import PropertyDataCard from './property-data-card';

type ThingModelDataPropertiesTabProps = {
    device: any;
    properties: any[];
};

const ThingModelDataPropertiesTab: FC<ThingModelDataPropertiesTabProps> = ({
    device,
    properties,
}) => {
    const [rows, setRows] = useState<any>([]);
    const handleQueryPropertiesData = () => {
        deviceApi.queryDevicePropertiesData(device?.id).then((res: any) => {
            setRows(res || []);
        });
    };

    useEffect(() => {
        if (device?.product?.id) {
            handleQueryPropertiesData();
        }
    }, [device]);
    console.log(rows);
    return (
        <div className={styles.thingModelPropertiesDataTab}>
            <Row gutter={[16, 16]}>
                {rows.map((propertyData: any) => (
                    <PropertyDataCard
                        key={propertyData?.name}
                        device={device}
                        propertyData={propertyData}
                    />
                ))}
            </Row>
        </div>
    );
};
export default ThingModelDataPropertiesTab;
