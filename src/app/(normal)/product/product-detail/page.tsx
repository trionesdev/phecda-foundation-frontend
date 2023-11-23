import { Layout, PageHeader } from '@moensun/antd-react-ext';
import { Button, message, Tabs, TabsProps } from 'antd';
import { useEffect, useState } from 'react';
import styles from './product-detail.module.less';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import ThingModelTab from './thing-model-tab';
import { deviceApi } from '@apis';
import { ProductRep } from '@apis/device/device.rep';
import InfoTab from './info-tab';
import ProtocolTab from './protocol-tab';
import { RoutesConstants } from '@/router/routes.constants';
import _ from 'lodash';
import confirm from 'antd/es/modal/confirm';
import { ExclamationCircleFilled } from '@ant-design/icons';

export const ProductDetailPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [searchParams, setSearchParams] = useSearchParams();
    const [activeTab, setActiveTab] = useState<any>('info');
    const [product, setProduct] = useState<ProductRep>();
    const [queryProductSeq, setQueryProductSeq] = useState(0);

    const handleQueryProduct = () => {
        deviceApi.queryProductById(id!).then((res: ProductRep) => {
            setProduct(res);
        });
    };

    const handlePublishProduct = () => {
        deviceApi
            .publishProduct(id!)
            .then(async () => {
                message.success('产品发布成功');
                setQueryProductSeq(queryProductSeq + 1);
            })
            .catch((e) => {
                message.success(`${e.message}`);
            });
    };

    const handleRevokePublishProduct = () => {
        deviceApi
            .revokePublishProduct(id!)
            .then(async () => {
                message.success('产品撤销发布成功');
                setQueryProductSeq(queryProductSeq + 1);
            })
            .catch((e) => {
                message.success(`${e.message}`);
            });
    };

    useEffect(() => {
        if (id) {
            handleQueryProduct();
        }
    }, [id, queryProductSeq]);

    useEffect(() => {
        if (searchParams.get('tab')) {
            setActiveTab(searchParams?.get('tab'));
        }
    }, [searchParams]);

    const handleShowPublishProductConfirm = () => {
        confirm({
            title: '确认发布产品',
            icon: <ExclamationCircleFilled />,
            content: `即将发布产品：${product?.name}`,
            okText: '发布',
            type: 'confirm',
            onOk: () => {
                handlePublishProduct();
            },
        });
    };

    const handleShowRevokePublishProductConfirm = () => {
        confirm({
            title: '确认撤销发布的产品',
            icon: <ExclamationCircleFilled />,
            content: `即将撤销发布的产品：${product?.name}`,
            okText: '撤销',
            type: 'confirm',
            onOk: () => {
                handleRevokePublishProduct();
            },
        });
    };

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
        <Layout direction={`vertical`} className={styles.productDetailView}>
            <Layout.Item>
                <div className={styles.productDetailViewHeader}>
                    <PageHeader
                        breadcrumb={{ items: [{ title: '设备管理' }] }}
                        title={product?.name}
                        extra={[
                            product && _.eq(product?.status, 'RELEASE') && (
                                <Button
                                    key={`publish-btn`}
                                    type={`dashed`}
                                    onClick={
                                        handleShowRevokePublishProductConfirm
                                    }
                                >
                                    撤销发布
                                </Button>
                            ),
                            product && _.eq(product?.status, 'DEVELOPMENT') && (
                                <Button
                                    key={`publish-btn`}
                                    type={`primary`}
                                    onClick={handleShowPublishProductConfirm}
                                >
                                    发布
                                </Button>
                            ),
                        ]}
                        onBack={() => {
                            navigate(RoutesConstants.PRODUCTS.path(), {
                                replace: true,
                            });
                        }}
                    />
                </div>
            </Layout.Item>
            <Layout.Item
                auto={true}
                style={{ padding: 8, backgroundColor: 'white' }}
            >
                <Tabs
                    defaultActiveKey={`info`}
                    items={items}
                    activeKey={activeTab}
                    onTabClick={(key) => setSearchParams(`tab=${key}`)}
                />
            </Layout.Item>
        </Layout>
    );
};
