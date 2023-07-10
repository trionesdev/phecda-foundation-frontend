import {
    AppToolbar,
    HPanel,
    PageHeader,
    VPanel,
} from '@moensun/antd-react-ext';
import { Breadcrumb, Button, Space, Tabs, TabsProps } from 'antd';
import { useEffect, useState } from 'react';
import styles from './product-detail.module.less';
import { useParams, useSearchParams } from 'react-router-dom';
import ThingModelTab from './thing-model-tab';
import { deviceApi } from '@apis';
import { ProductRep } from '../../../apis/device/device.rep';
import InfoTab from './info-tab';
import ProtocolTab from './protocol-tab';

const ProductDetailView = () => {
    const { id } = useParams();
    const [searchParams, setSearchParams] = useSearchParams();
    const [activeTab, setActiveTab] = useState<any>('info');
    const [product, setProduct] = useState<ProductRep>();

    const handleQueryProduct = () => {
        deviceApi.queryProductById(id!).then((res: ProductRep) => {
            setProduct(res);
        });
    };

    useEffect(() => {
        if (id) {
            handleQueryProduct();
        }
    }, [id]);

    useEffect(() => {
        if (searchParams.get('tab')) {
            setActiveTab(searchParams?.get('tab'));
        }
    }, [searchParams]);

    const header = (
        <div className={styles.productDetailViewHeader}>
            <PageHeader
                breadcrumb={{ items: [{ title: '设备管理' }] }}
                title={product?.name}
                extra={[
                    <Button key={`publish-btn`} type={`primary`}>
                        发布
                    </Button>,
                ]}
            />
        </div>
    );
    const items: TabsProps['items'] = [
        {
            key: 'info',
            label: `产品信息`,
            children: <InfoTab product={product} />,
        },
        {
            key: 'thing-model',
            label: `功能定义`,
            children: <ThingModelTab product={product} />,
        },
        {
            key: `protocol`,
            label: `协议`,
            children: <ProtocolTab product={product} />,
        },
    ];
    return (
        <VPanel className={styles.productDetailView} header={header}>
            <Tabs
                defaultActiveKey={`info`}
                items={items}
                activeKey={activeTab}
                onTabClick={(key) => setSearchParams(`tab=${key}`)}
            />
        </VPanel>
    );
};
export default ProductDetailView;
