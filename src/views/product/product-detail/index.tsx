import {AppToolbar, HPanel, PageHeader, VPanel} from "@moensun/antd-react-ext";
import {Breadcrumb, Button, Space, Tabs, TabsProps} from "antd";
import {useEffect, useState} from "react";
import styles from "./product-detail.module.less"
import {useParams} from "react-router-dom";
import ThingsModelTab from "./things-model-tab";
import {deviceApi} from "@apis";
import {ProductRep} from "../../../apis/device/device.rep";

const ProductDetailView = () => {
    const params = useParams()
    const [product, setProduct] = useState<ProductRep>()

    const handleQueryProduct = () => {
        deviceApi.queryProductById(params.id!).then((res: ProductRep) => {
            setProduct(res)
        })
    }

    useEffect(() => {
        if (params.id) {
            handleQueryProduct()
        }
    }, [params.id])


    const header = <div className={styles.productDetailViewHeader}>
        <PageHeader breadcrumb={{items: [{title: '设备管理'}]}} title={`流量计`}
                    extra={[<Button type={`primary`}>发布</Button>]}/>
    </div>
    const items: TabsProps['items'] = [
        {
            key: 'info',
            label: `产品信息`,
            children: `Content of Tab Pane 1`,
        },
        {
            key: 'things-model',
            label: `功能定义`,
            children: <ThingsModelTab product={product}/>,
        }
    ];
    return <VPanel className={styles.productDetailView} header={header}>
        <Tabs defaultActiveKey={`info`} items={items}/>
    </VPanel>
}
export default ProductDetailView