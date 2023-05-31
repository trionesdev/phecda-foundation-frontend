import {AppToolbar, HPanel, VPanel} from "@moensun/antd-react-ext";
import {Breadcrumb, Button, Space} from "antd";
import {useState} from "react";
import styles from "./product-detail.module.less"
import {useParams} from "react-router-dom";
import {ArrowLeftOutlined} from "@ant-design/icons";
import PageHeader from "../../../components/page-header/page-header";

const ProductDetailView = () => {
    const params = useParams()
    const [product, setProduct] = useState<any>()

    const header = <div className={styles.productDetailViewHeader}>
        <PageHeader breadcrumb={{items:[{title:'设备管理'}]}} title={`流量计`} subTitle={`ss`} extra={[<Button type={`primary`}>发布</Button>]}/>
    </div>

    return <VPanel className={styles.productDetailView} header={header}>

    </VPanel>
}
export default ProductDetailView