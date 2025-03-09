import {FC, useEffect, useState} from 'react';
import {Col, Row} from 'antd';
import {deviceApi} from '@apis/tenant';
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

    return (
        <div className={styles.thingModelPropertiesDataTab}>
            <Row gutter={[16, 16]}>
                {rows.map((propertyData: any) => (
                    <Col key={propertyData?.name} span={6} xs={12}>
                        <PropertyDataCard
                            key={propertyData?.name}
                            device={device}
                            propertyData={propertyData}
                        />
                    </Col>
                ))}
            </Row>
        </div>
    );
};
export default ThingModelDataPropertiesTab;
