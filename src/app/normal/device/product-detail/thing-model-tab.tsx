import { Link } from 'react-router-dom';
import styles from './product-detail.module.less';
import { FC, useEffect, useState } from 'react';
import { RoutesConstants } from '@/router/routes.constants';
import { GridTable, Layout, TableToolbar } from '@trionesdev/antd-react-ext';
import { deviceApi } from '@apis/tenant';
import _ from 'lodash';
import { Alert, Button, Space } from 'antd';
import { AbilityType } from '../internal/device.enum';
import { useRequest } from 'ahooks';
import { ThingModelProfileModal } from '@/app/normal/device/product-detail/ThingModelProfileModal';

type ThingsModelTabProps = {
    product: any;
};

const ThingModelTab: FC<ThingsModelTabProps> = ({ product }) => {
    const [rows, setRows] = useState([]);
    const { run: handleQueryThingModel, loading } = useRequest(
        () => {
            return deviceApi.queryThingModel(product.id);
        },
        {
            manual: true,
            onSuccess: (res: any) => {
                const thingModelData = _.cloneDeep(res);
                _.get(thingModelData, 'events')?.map((ability: any) => {
                    _.assign(ability, {
                        abilityType: AbilityType.EVENT,
                    });
                });
                _.get(thingModelData, 'properties')?.map((ability: any) => {
                    _.assign(ability, {
                        abilityType: AbilityType.PROPERTY,
                    });
                });
                _.get(thingModelData, 'commands')?.map((ability: any) => {
                    _.assign(ability, {
                        abilityType: AbilityType.COMMAND,
                    });
                });
                let abilities = _.values(thingModelData)
                    .reduce((prev, cur) => _.concat(prev, cur), [])
                    .sort();
                setRows(abilities || []);
            },
        }
    );

    useEffect(() => {
        if (product) {
            handleQueryThingModel();
        }
    }, [product]);

    const columns = [
        {
            title: '功能类型',
            dataIndex: 'abilityType',
            width: 100,
            render: (text: string) => {
                switch (text) {
                    case AbilityType.PROPERTY:
                        return '属性';
                    case AbilityType.COMMAND:
                        return '指令';
                    case AbilityType.EVENT:
                        return '事件';
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
    ];

    return (
        <Layout className={styles.thingsModelTab} direction={`vertical`}>
            <Layout.Item>
                <div className={styles.thingsModelTabPrompt}>
                    {product && _.eq(product?.status, 'DEVELOPMENT') && (
                        <>
                            当前展示的是已发布到线上的功能定义，如需修改，
                            <Link
                                to={RoutesConstants.PRODUCT_THINGS_MODEL_DRAFT.path(
                                    product?.id
                                )}
                            >
                                请点击
                            </Link>
                        </>
                    )}
                    {product && _.eq(product?.status, 'RELEASE') && (
                        <Alert
                            message="当前展示的是已发布到线上的功能定义，如需编辑请先撤销发布"
                            type="info"
                            showIcon
                        />
                    )}
                </div>
            </Layout.Item>
            <Layout.Item auto={true}>
                <GridTable
                    style={{ backgroundColor: 'white' }}
                    fit={true}
                    toolbar={
                        <TableToolbar
                            title={
                                <Space>
                                    <ThingModelProfileModal id={product?.id} />
                                </Space>
                            }
                        />
                    }
                    size={`small`}
                    columns={columns}
                    dataSource={rows}
                    loading={loading}
                    rowKey={`identifier`}
                    pagination={false}
                />
            </Layout.Item>
        </Layout>
    );
};
export default ThingModelTab;
