import { Layout, PageHeader } from '@trionesdev/antd-react-ext';
import { Tabs, TabsProps } from 'antd';
import InfoTab from './info-tab';
import { useEffect } from 'react';
import { deviceApi } from '@apis';
import { useNavigate, useParams } from 'react-router-dom';
import styles from './device-detail.module.less';
import ThingModelDataTab from './thing-model-tab';
import _ from 'lodash';
import ProtocolTab from './protocol-tab';
import { isNilEmpty } from '@/commons/util/isNilEmpty';
import { useRequest } from 'ahooks';
import ChildDeviceTab from '@/app/(normal)/(device)/device-detail/child-device-tab';
import { CameraFrameTab } from '@/app/(normal)/(device)/device-detail/camera-frame-tab';

const DeviceDetailView = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const {
        data: device,
        run: queryDeviceExtById,
        refresh: refreshQueryDeviceExtById,
    } = useRequest(
        (id) => {
            return deviceApi.queryDeviceExtById(id);
        },
        { manual: true }
    );
    useEffect(() => {
        id && queryDeviceExtById(id);
    }, [id, queryDeviceExtById]);

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
                children: <ThingModelDataTab device={device} />,
            },
        ],
        !isNilEmpty(device?.product?.protocolProperties)
            ? [
                  {
                      key: `protocol`,
                      label: `协议`,
                      children: (
                          <ProtocolTab
                              device={device}
                              afterChange={refreshQueryDeviceExtById}
                          />
                      ),
                  },
              ]
            : [],
        _.eq('GATEWAY', device?.product?.nodeType)
            ? {
                  key: `sub-device`,
                  label: `子设备`,
                  children: <ChildDeviceTab device={device} />,
              }
            : [],
        _.isEqual('CAMERA', device?.product?.type)
            ? {
                  key: `camera-frame`,
                  label: `相机画面`,
                  children: <CameraFrameTab device={device} />,
              }
            : []
    );

    return (
        <Layout direction={`vertical`} className={styles.deviceDetailView}>
            <Layout.Item>
                {' '}
                <PageHeader
                    title={device?.name}
                    onBack={() => {
                        navigate(-1);
                    }}
                />
            </Layout.Item>
            <Layout.Item auto={true} className={styles.tabs}>
                <Tabs items={items} />
            </Layout.Item>
        </Layout>
    );
};
export default DeviceDetailView;
