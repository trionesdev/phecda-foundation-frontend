import { Link } from 'react-router-dom'
import styles from './product-detail.module.less'
import { FC, useEffect, useState } from 'react'
import { RoutesConstants } from '../../../router/routes.constants'
import { GridTable, VPanel } from '@moensun/antd-react-ext'
import { deviceApi } from '@apis'
import _ from 'lodash'
import { AbilityType } from '../product-things-model-draft/thing-model-ability-form'

type ThingsModelTabProps = {
    product: any
}

const ThingModelTab: FC<ThingsModelTabProps> = ({ product }) => {
    const [loading, setLoading] = useState(false)
    const [rows, setRows] = useState([])

    const handleQueryThingModel = () => {
        setLoading(true)
        deviceApi
            .queryThingModel(product.id)
            .then((res: any) => {
                let thingModel = _.mapKeys(
                    _.get(res, 'thingModel'),
                    (value, key) => {
                        switch (key) {
                            case 'events':
                                return _.map(value, (ability) =>
                                    _.assign(ability, {
                                        abilityType: AbilityType.EVENT,
                                    })
                                )
                            case 'properties':
                                return _.map(value, (ability) =>
                                    _.assign(ability, {
                                        abilityType: AbilityType.PROPERTY,
                                    })
                                )
                            case 'services':
                                return _.map(value, (ability) =>
                                    _.assign(ability, {
                                        abilityType: AbilityType.SERVICE,
                                    })
                                )
                            default:
                                return value
                        }
                    }
                )
                let abilities = _.values(thingModel)
                    .reduce((prev, cur) => _.concat(prev, cur), [])
                    .sort()
                setRows(abilities || [])
            })
            .finally(() => {
                setLoading(false)
            })
    }

    useEffect(() => {
        if (product) {
            handleQueryThingModel()
        }
    }, [product])

    const columns = [
        {
            title: '功能类型',
            dataIndex: 'abilityType',
            width: 100,
            render: (text: string) => {
                switch (text) {
                    case AbilityType.PROPERTY:
                        return '属性'
                    case AbilityType.SERVICE:
                        return '服务'
                    case AbilityType.EVENT:
                        return '事件'
                }
            },
        },
        {
            title: '功能名称',
            dataIndex: 'name',
        },
        {
            title: '标识符',
            dataIndex: 'identifier',
        },
        {
            title: '值类型',
            dataIndex: 'valueType',
        },
    ]

    const alert = (
        <div className={styles.thingsModelTabPrompt}>
            当前展示的是已发布到线上的功能定义，如需修改，
            <Link
                to={RoutesConstants.PRODUCT_THINGS_MODEL_DRAFT.path(
                    product?.id
                )}
            >
                请点击
            </Link>
        </div>
    )
    return (
        <VPanel className={styles.thingsModelTab} header={alert}>
            <GridTable
                style={{ backgroundColor: 'white' }}
                size={`small`}
                columns={columns}
                dataSource={rows}
                loading={loading}
                rowKey={`identifier`}
            />
        </VPanel>
    )
}
export default ThingModelTab
