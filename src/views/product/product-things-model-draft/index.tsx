import {GridTable, PageHeader, TableToolbar, VPanel} from "@moensun/antd-react-ext";
import styles from "./product-things-model-draft.module.less"
import {Alert, Button, Descriptions} from "antd";
import {useState} from "react";
import ThingsModelAbilityForm from "./things-model-ability-form";
import {useParams} from "react-router-dom";


const ProductThingsModelDraftView = () => {
    const params = useParams()
    const [rows, setRows] = useState([])


    const columns = [{
        title: '功能类型',
        dataIndex: 'type'
    }]
    const breadcrumbItems = [{title: '设备管理'}];
    const header = <PageHeader breadcrumb={{items: breadcrumbItems}} title={`编辑功能定义草稿`}>
        <Descriptions>
            <Descriptions.Item label={`产品名称`}>流量</Descriptions.Item>
        </Descriptions>
        <Alert message="您正在编辑的是草稿，需点击发布后，物模型才会正式生效。" type="info"/>
    </PageHeader>
    const tableToolbar = <TableToolbar
        extra={[<ThingsModelAbilityForm key={`create-ability`} type={`primary`}
                                        productId={params.id!}>添加功能</ThingsModelAbilityForm>,
            <Button key={`publish-btn`} type={`primary`}>发布上线</Button>]}/>
    return <VPanel className={styles.productThingsModelDraftView} header={header}>
        <GridTable style={{backgroundColor: "white"}} size={`small`} toolbar={tableToolbar} columns={columns}
                   dataSource={rows}/>
    </VPanel>
}
export default ProductThingsModelDraftView