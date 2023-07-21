import { PageHeader, VPanel } from '@moensun/antd-react-ext';
import { Tabs, TabsProps } from 'antd';
import InfoTab from './info-tab';
import { useEffect, useState } from 'react';
import { deviceApi } from '@apis';
import { useNavigate, useParams } from 'react-router-dom';
import styles from './device-detail.module.less';
import Index from './thing-model-tab';
import _ from 'lodash';
import ChildDeviceTab from '@views/device/device-detail/child-device-tab';

const DeviceDetailView = () => {
    const { id } = useParams();
    const [device, setDevice] = useState<any>();
    const navigate = useNavigate();

    const handleQueryDevice = () => {
        deviceApi.queryDeviceExtById(id!).then((res: any) => {
            setDevice(res);
        });
    };

    useEffect(() => {
        if (id) {
            handleQueryDevice();
        }
    }, [id]);

    const items: TabsProps['items'] = _.concat(
        [
            {
                key: 'info',
                label: `设备信息`,
                children: <InfoTab device={device} />,
            },
            {
                key: `thing-model-data`,
                label: `物模型数据`,
                children: <Index device={device} />,
            },
        ],
        _.eq('GATEWAY', device?.product?.nodeType)
            ? {
                  key: `sub-device`,
                  label: `子设备`,
                  children: <ChildDeviceTab device={device} />,
              }
            : []
    );

    const pageHelper = (
        <PageHeader
            title={device?.name}
            onBack={() => {
                navigate(-1);
            }}
        />
    );
    return (
        <VPanel className={styles.deviceDetailView} header={pageHelper}>
            <Tabs items={items} />
        </VPanel>
    );
};
export default DeviceDetailView;
