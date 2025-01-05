import { FC, useEffect, useState } from 'react';
import styles from '../device-detail.module.less';
import { Tabs, TabsProps } from 'antd';
import ThingModelDataPropertiesTab from './thing-model-data-properties-tab';
import { deviceApi } from '@apis/tenant';
import _ from 'lodash';
import ThingModelDataEvent from './thing-model-data-event';
import ThingModelDataService from './thing-model-data-service';

type ThingModelDataTabProps = {
    device: any;
};
const ThingModelDataTab: FC<ThingModelDataTabProps> = ({ device }) => {
    const [properties, setProperties] = useState([]);
    const [events, setEvents] = useState([]);
    const [commands, setCommands] = useState([]);

    const handleQueryThingModel = () => {
        deviceApi.queryThingModel(device?.product?.id).then((res: any) => {
            if (res) {
                setProperties(_.get(res, ['thingModel', 'properties'], []));
                setEvents(_.get(res, ['thingModel', 'events'], []));
                setCommands(_.get(res, ['thingModel', 'commands'], []));
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
            children: <ThingModelDataEvent deviceData={device} />,
        },
        {
            key: 'commands',
            label: `指令调用`,
            children: <ThingModelDataService deviceData={device} />,
        },
    ];
    return (
        <div className={styles.thingModelDataTab}>
            <Tabs size={`small`} items={items} />
        </div>
    );
};
export default ThingModelDataTab;
