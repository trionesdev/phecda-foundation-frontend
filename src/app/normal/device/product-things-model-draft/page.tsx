import {
    GridTable,
    Layout,
    PageHeader,
    TableToolbar,
} from '@trionesdev/antd-react-ext';
import styles from './product-thing-model-draft.module.less';
import {
    Alert,
    Button,
    Descriptions,
    message,
    Popconfirm,
    Space,
} from 'antd';
import { useEffect, useState } from 'react';
import ThingsModelAbilityForm from './thing-model-ability-form';
import { deviceApi } from '@apis/tenant';
import _ from 'lodash';
import { useRequest } from 'ahooks';
import { AbilityType } from '../internal/device.enum';
import {useNavigate, useParams} from "@trionesdev/commons-react";
import {RouteConstants} from "@/router/routes.constants.ts";

const ProductThingModelDraftPage = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [product, setProduct] = useState<any>();
    const [rows, setRows] = useState([]);
    const { run: handleQueryThingModel, loading } = useRequest(
        () => {
            return deviceApi.queryProductById(id!);
        },
        {
            manual: true,
            onSuccess: (res: any) => {
                setProduct(res);
                const thingModelData = _.get(res, 'thingModelDraft');
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

    const handleDeleteAbility = (identifier: string) => {
        deviceApi.deleteThingModelDraftAbility(id!, identifier).then(() => {
            handleQueryThingModel();
        });
    };

    const handleEditSuccess = () => {
        handleQueryThingModel();
    };

    const handleReleaseThingModel = () => {
        deviceApi.releaseThingModel(id!).then(async () => {
            message.success('发布成功');
        });
    };

    useEffect(() => {
        handleQueryThingModel();
    }, [id]);

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
        {
            title: `操作`,
            dataIndex: 'identifier',
            width: 120,
            render: (text: string, record: any) => {
                return (
                    <Space>
                        <ThingsModelAbilityForm
                            productId={id!}
                            editAbilityType={record.abilityType}
                            identifier={record.identifier}
                            onSuccess={handleEditSuccess}
                        >
                            <Button size={`small`} type={`link`}>
                                编辑
                            </Button>
                        </ThingsModelAbilityForm>
                        <Popconfirm
                            title={`确定删除该功能`}
                            onConfirm={() => handleDeleteAbility(text)}
                        >
                            <Button
                                key={`del-btn`}
                                size={`small`}
                                type={`link`}
                                danger
                            >
                                删除
                            </Button>
                        </Popconfirm>
                    </Space>
                );
            },
        },
    ];

    const breadcrumbItems = [{ title: '设备管理' }];
    return (
        <Layout
            className={styles.productThingsModelDraftView}
            direction={`vertical`}
        >
            <Layout.Item>
                <PageHeader
                    breadcrumb={{ items: breadcrumbItems }}
                    title={`编辑功能定义草稿`}
                    onBack={() =>
                        navigate(
                            `${RouteConstants.DEVICE.PRODUCT_DETAIL.path(
                                id!
                            )}?tab=thing-model`
                        )
                    }
                >
                    <Descriptions>
                        <Descriptions.Item label={`产品名称`}>
                            {product?.name}
                        </Descriptions.Item>
                    </Descriptions>
                    <Alert
                        message="您正在编辑的是草稿，需点击发布后，物模型才会正式生效。"
                        type="info"
                    />
                </PageHeader>
            </Layout.Item>
            <Layout.Item auto={true} style={{ backgroundColor: 'white' }}>
                <GridTable
                    style={{ backgroundColor: 'white', padding: '8px' }}
                    fit={true}
                    size={`small`}
                    toolbar={
                        <TableToolbar
                            extra={
                                <Space>
                                    <ThingsModelAbilityForm
                                        productId={id!}
                                        onSuccess={handleEditSuccess}
                                    >
                                        <Button>添加功能</Button>
                                    </ThingsModelAbilityForm>
                                    <Button
                                        key={`publish-btn`}
                                        type={`primary`}
                                        onClick={handleReleaseThingModel}
                                    >
                                        发布上线
                                    </Button>
                                </Space>
                            }
                        />
                    }
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
export default ProductThingModelDraftPage;
