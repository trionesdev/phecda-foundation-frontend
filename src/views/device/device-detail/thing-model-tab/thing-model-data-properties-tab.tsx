import { VPanel } from '@moensun/antd-react-ext';
import { FC, useEffect, useState } from 'react';
import { Button, Card, Col, Row, Space, Typography } from 'antd';
import { deviceApi } from '@apis';
import { formatDateTime } from '../../../../commons/util/date.utils';
import styles from '../device-detail.module.less';
import _ from 'lodash';
import PropertyDataModal from './property-data-modal';

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
        <VPanel className={styles.thingModelPropertiesDataTab}>
            <Row gutter={[16, 16]}>
                {rows.map((propertyData: any) => (
                    <Col key={propertyData?.name} span={6}>
                        <Card
                            key={propertyData.identifier}
                            size={`small`}
                            title={propertyData.name}
                            extra={[
                                <PropertyDataModal
                                    propertyData={propertyData}
                                />,
                            ]}
                        >
                            <Space>
                                <Typography.Paragraph>
                                    {_.get(propertyData, ['value'], '--') ||
                                        '--'}
                                </Typography.Paragraph>
                            </Space>
                            <div>
                                {formatDateTime(propertyData.latestTime) ||
                                    '--'}
                            </div>
                        </Card>
                    </Col>
                ))}
            </Row>
        </VPanel>
    );
};
export default ThingModelDataPropertiesTab;
