import { GridTable, Layout, TableToolbar } from '@trionesdev/antd-react-ext';
import { Button, Input, Popconfirm, Select, Space, Tag } from 'antd';
import React, { useEffect, useState } from 'react';
import ProductFormBtn from './product-form-btn';
import { deviceApi } from '@apis';
import { ProductPageRep, ProductRep } from '@apis/device/device.rep';
import { useNavigate } from 'react-router-dom';
import { RoutesConstants } from '@/router/routes.constants';
import styles from './products.module.less';
import { formatDateTime } from '@/commons/util/date.utils';
import {
    DeviceNodeType,
    DeviceNodeTypeKeys,
} from '../support/device.constants';
import { useRequest } from 'ahooks';
import { OptionsType } from '@/constants/types';
import _ from 'lodash';
import { SearchToolbar } from '@components';

const ProductsView = () => {
    const navigate = useNavigate();
    const [querySeq, setQuerySeq] = useState(0);
    const [pageNum, setPageNum] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [loading, setLoading] = useState(false);
    const [products, setProducts] = useState<ProductRep[]>([]);
    const [formData, setFormData] = useState({});

    const nodeTypes: OptionsType[] = [
        {
            label: '直连设备',
            value: 'DIRECT',
        },
        {
            label: '网关设备',
            value: 'GATEWAY',
        },
        {
            label: '网关子设备',
            value: 'GATEWAY_SUB',
        },
    ];

    const handleQueryProductPage = () => {
        let params = {
            ...formData,
            pageNum,
            pageSize,
        };
        setLoading(false);
        deviceApi
            .queryProductPage(params)
            .then((res: ProductPageRep) => {
                setProducts(res.rows);
            })
            .finally(() => {
                setLoading(false);
            });
    };

    const handleRefresh = () => {
        setQuerySeq(querySeq + 1);
    };

    const { run: deleteProductById } = useRequest(
        (id) => {
            return deviceApi.deleteProductById(id);
        },
        {
            manual: true,
            onSuccess: () => {
                handleQueryProductPage();
            },
        }
    );
    useEffect(() => {
        handleQueryProductPage();
    }, [formData, querySeq, pageNum, pageSize]);

    const columns = [
        {
            title: '产品名称',
            dataIndex: 'name',
        },
        {
            title: '节点类型',
            dataIndex: 'nodeType',
            render: (value: DeviceNodeTypeKeys) => {
                return DeviceNodeType?.[value];
            },
        },
        {
            title: '状态',
            dataIndex: 'status',
            render: (value: number) => {
                if (_.eq(value, 'RELEASE')) {
                    return <Tag color={'blue'}>已发布</Tag>;
                } else if (_.eq(value, 'DEVELOPMENT')) {
                    return <Tag>未发布</Tag>;
                } else {
                    return <Tag color={'red'}>未知</Tag>;
                }
            },
        },
        {
            title: '创建时间',
            dataIndex: 'createdAt',
            render: (value: number) => {
                return formatDateTime(value);
            },
        },
        {
            title: '更新时间',
            dataIndex: 'updatedAt',
            render: (value: number) => {
                return formatDateTime(value);
            },
        },
        {
            title: '操作',
            dataIndex: 'id',
            width: 230,
            render: (text: string, record: any) => {
                return (
                    <Space>
                        <ProductFormBtn
                            key={`update-product`}
                            type={`link`}
                            onSuccess={handleRefresh}
                            id={record?.id}
                            disabled={!_.eq(record?.status, 'DEVELOPMENT')}
                            isEdit
                        >
                            编辑
                        </ProductFormBtn>
                        <Button
                            size={`small`}
                            type={`link`}
                            onClick={() =>
                                navigate(
                                    RoutesConstants.PRODUCT_DETAIL.path(text)
                                )
                            }
                        >
                            查看
                        </Button>
                        <Popconfirm
                            key={`del-btn`}
                            title={`确定删除 ${record.name}？`}
                            onConfirm={() => deleteProductById(record?.id)}
                            disabled={!_.eq(record?.status, 'DEVELOPMENT')}
                        >
                            <Button
                                size={`small`}
                                type={`link`}
                                disabled={!_.eq(record?.status, 'DEVELOPMENT')}
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

    const items = [
        {
            label: '名称',
            name: 'name',
            children: <Input allowClear />,
        },
        {
            label: '节点类型',
            name: 'nodeType',
            children: <Select options={nodeTypes} allowClear={true} />,
        },
    ];

    return (
        <Layout direction={`vertical`} className={styles[`products`]}>
            <Layout.Item className={styles[`search-toolbar`]}>
                <SearchToolbar
                    span={6}
                    xxl={4}
                    xl={6}
                    lg={6}
                    md={8}
                    sm={12}
                    xs={24}
                    items={items}
                    onSearch={(values: any) => {
                        setFormData(values);
                    }}
                />
            </Layout.Item>
            <Layout.Item auto={true}>
                <GridTable
                    style={{
                        backgroundColor: 'white',
                        padding: 8,
                        boxSizing: 'border-box',
                    }}
                    toolbar={
                        <TableToolbar
                            extra={
                                <ProductFormBtn
                                    key={`create-product`}
                                    type={`primary`}
                                    onSuccess={handleRefresh}
                                >
                                    新建产品
                                </ProductFormBtn>
                            }
                        />
                    }
                    fit={true}
                    size={`small`}
                    columns={columns}
                    dataSource={products}
                    rowKey={`id`}
                    loading={loading}
                />
            </Layout.Item>
        </Layout>
    );
};
export default ProductsView;
