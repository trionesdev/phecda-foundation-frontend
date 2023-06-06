import {GridTable, PageHeader, TableToolbar, VPanel} from "@moensun/antd-react-ext";
import styles from "./product-thing-model-draft.module.less"
import {Alert, Button, Descriptions, Divider, Space} from "antd";
import {useEffect, useState} from "react";
import ThingsModelAbilityForm, {AbilityType} from "./thing-model-ability-form";
import {useParams} from "react-router-dom";
import {deviceApi} from "@apis";
import _ from "lodash";


const ProductThingModelDraftView = () => {
    const {id} = useParams()
    const [querySeq, setQuerySeq] = useState(0)
    const [rows, setRows] = useState([])

    const handleQueryThingModel = () => {
        deviceApi.queryProductThingModel(id!).then((res: any) => {
            let thingModel = _.mapKeys(_.get(res, 'thingModel'), (value, key) => {
                switch (key) {
                    case "events":
                        return _.map(value, (ability) => _.assign(ability, {"abilityType": AbilityType.EVENT}))
                    case "properties":
                        return _.map(value, (ability) => _.assign(ability, {"abilityType": AbilityType.PROPERTY}))
                    case "services":
                        return _.map(value, (ability) => _.assign(ability, {"abilityType": AbilityType.SERVICE}))
                    default:
                        return value
                }
            })
            let abilities = _.values(thingModel).reduce((prev, cur) => _.concat(prev, cur)).sort()
            setRows(abilities || [])
        })
    }

    const handleEditSuccess = () => {
        setQuerySeq(querySeq + 1)
    }

    useEffect(() => {
        handleQueryThingModel()
    }, [id, querySeq])

    const columns = [{
        title: '功能类型',
        dataIndex: 'abilityType',
        width: 100,
        render: (text: string) => {
            switch (text) {
                case AbilityType.PROPERTY:
                    return "属性"
                case AbilityType.SERVICE:
                    return "服务"
                case AbilityType.EVENT:
                    return "事件"
            }
        }
    },
        {
            title: '功能名称',
            dataIndex: 'name',
        },
        {
            title: '标识符',
            dataIndex: 'identifier'
        },
        {
            title: '值类型',
            dataIndex: 'valueType'
        },
        {
            title: `操作`,
            dataIndex: 'identifier',
            width: 150,
            render: (text: string, record: any) => {
                return <Space split={<Divider type="vertical"/>}>
                    <ThingsModelAbilityForm key={`edit-ability`} size={`small`} type={`link`}
                                            productId={id!} editAbilityType={record.abilityType}
                                            identifier={record.identifier}
                                            onSuccess={handleEditSuccess}>编辑</ThingsModelAbilityForm>
                    <Button key={`del-btn`} size={`small`} type={`link`} danger>删除</Button>
                </Space>
            }
        }
    ]
    const breadcrumbItems = [{title: '设备管理'}];
    const header = <PageHeader breadcrumb={{items: breadcrumbItems}} title={`编辑功能定义草稿`}>
        <Descriptions>
            <Descriptions.Item label={`产品名称`}>流量</Descriptions.Item>
        </Descriptions>
        <Alert message="您正在编辑的是草稿，需点击发布后，物模型才会正式生效。" type="info"/>
    </PageHeader>
    const tableToolbar = <TableToolbar
        extra={[<ThingsModelAbilityForm key={`create-ability`} type={`primary`}
                                        productId={id!} onSuccess={handleEditSuccess}>添加功能</ThingsModelAbilityForm>,
            <Button key={`publish-btn`} type={`primary`}>发布上线</Button>]}/>
    return <VPanel className={styles.productThingsModelDraftView} header={header}>
        <GridTable style={{backgroundColor: "white"}} size={`small`} toolbar={tableToolbar} columns={columns}
                   dataSource={rows} rowKey={`identifier`}/>
    </VPanel>
}
export default ProductThingModelDraftView