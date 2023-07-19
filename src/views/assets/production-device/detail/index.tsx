import { PageHeader, VPanel } from '@moensun/antd-react-ext';
import { useNavigate, useParams } from 'react-router-dom';
import styles from './index.module.less';
import { Tabs, TabsProps } from 'antd';
import { useRequest } from 'ahooks';
import { assetsApi } from '@/apis';
import { useEffect } from 'react';
import BasicInfo from './BasicInfo';
import DeviceInfo from './DeviceInfo';
import useQueryDictionaryOptions from '@/hooks/useOptions/useQueryDictionaryOptions';
import useQueryDeviceAll from '@/hooks/useOptions/useQueryDeviceAll';

const ProductionDeviceDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { allDeviceDataOptions } = useQueryDeviceAll();
    const { typeCodeOptions: assetsTypeOptions } =
        useQueryDictionaryOptions('assets_type');
    const { typeCodeOptions: locationCodeOptions } =
        useQueryDictionaryOptions('location_code');
    /** 查询设备信息 */
    const { data, run: getAssetById } = useRequest(
        (id) => assetsApi.getAssetById(id),
        {
            manual: true,
        }
    );
    useEffect(() => {
        getAssetById(id);
    }, [getAssetById, id]);
    const pageHelper = (
        <PageHeader
            title={data?.name}
            onBack={() => {
                navigate(-1);
            }}
        />
    );
    console.log(data);
    const items: TabsProps['items'] = [
        {
            key: '1',
            label: `基本信息`,
            children: (
                <div className={styles.infoWrapper}>
                    <BasicInfo
                        data={data}
                        assetsTypeOptions={assetsTypeOptions}
                        locationCodeOptions={locationCodeOptions}
                    />
                </div>
            ),
        },
        {
            key: '2',
            label: `设备情况`,
            children: (
                <div className={styles.infoWrapper}>
                    <DeviceInfo
                        allDeviceDataOptions={allDeviceDataOptions}
                        sn={data?.sn}
                    />
                </div>
            ),
        },
    ];
    return (
        <VPanel className={styles.wrapper} header={pageHelper}>
            <Tabs items={items} />
        </VPanel>
    );
};
export default ProductionDeviceDetail;
