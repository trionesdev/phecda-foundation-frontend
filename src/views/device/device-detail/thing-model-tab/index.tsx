import { FC, useEffect, useState } from 'react';
import styles from '../device-detail.module.less';
import { Tabs, TabsProps } from 'antd';
import ThingModelDataPropertiesTab from './thing-model-data-properties-tab';
import { deviceApi } from '@apis';
import _ from 'lodash';
import ThingModelDataEvent from './thing-model-data-event';
import ThingModelDataService from './thing-model-data-service';

type ThingModelDataTabProps = {
    device: any;
};
const ThingModelDataTab: FC<ThingModelDataTabProps> = ({ device }) => {
    const [properties, setProperties] = useState([]);
    const [events, setEvents] = useState([]);
    const [services, setServices] = useState([]);

    const handleQueryThingModel = () => {
        deviceApi.queryThingModel(device?.product?.id).then((res: any) => {
            if (res) {
                setProperties(_.get(res, ['thingModel', 'properties'], []));
                setEvents(_.get(res, ['thingModel', 'events'], []));
                setServices(_.get(res, ['thingModel', 'services'], []));
            }
        });
    };

    useEffect(() => {
        if (device?.product?.id) {
            handleQueryThingModel();
        }
    }, [device]);

    const items: TabsProps['items'] = [
        {
            key: 'properties',
            label: `运行状态`,
            children: (
                <ThingModelDataPropertiesTab
                    device={device}
                    properties={properties}
                />
            ),
        },
        {
            key: 'events',
            label: `事件管理`,
            children: <ThingModelDataEvent />,
        },
        {
            key: 'services',
            label: `服务调用`,
            children: <ThingModelDataService />,
        },
    ];
    return (
        <div className={styles.thingModelDataTab}>
            <Tabs size={`small`} items={items} />
        </div>
    );
};
export default ThingModelDataTab;
