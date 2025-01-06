import {
    GridTable,
    Layout,
    SearchToolbar,
    TableToolbar,
} from '@trionesdev/antd-react-ext';
import { Button, Input, message, Popconfirm, Select, Space, Tag } from 'antd';
import { useEffect, useState } from 'react';
import ProductForm from './product-form';
import { deviceApi } from '@apis/tenant';
import { ProductRep } from '@apis/tenant/device/device.rep';
import styles from './products.module.less';
import { formatDateTime } from '@commons/util/date.utils';
import { useRequest } from 'ahooks';
import { OptionsType } from '@/constants/types';
import _ from 'lodash';
import { DeviceNodeTypeOptions } from '../internal/device.constants';
import { PlusCircleOutlined } from '@ant-design/icons';
import {useNavigate} from "@trionesdev/commons-react";
import {RouteConstants} from "@/router/route.constants.ts";

export const ProductsPage = () => {
    const navigate = useNavigate();
    const [pageNum, setPageNum] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [products, setProducts] = useState<ProductRep[]>([]);
    const [total, setTotal] = useState<number>(0);
    const [searchParams, setSearchParams] = useState({});

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

    const { run: handleQueryProductPage, loading } = useRequest(
        () => {
            let params = {
                ...searchParams,
                pageNum,
                pageSize,
            };
            return deviceApi.queryProductPage(params);
        },
        {
            manual: true,
            onSuccess: (res: any) => {
                setProducts(res?.rows || []);
                setTotal(res?.total || 0);
            },
            onError: async (err) => {
                message.error(err?.message);
            },
        }
    );

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
    }, [pageNum, pageSize]);

    const columns: any[] = [
        {
            title: '产品名称',
            dataIndex: 'name',
        },
        {
            title: `ProductKey`,
            dataIndex: 'key',
            width: 180,
        },
        {
            title: '节点类型',
            dataIndex: 'nodeType',
            width: 100,
            render: (value: any) => {
                return DeviceNodeTypeOptions.find((item) => {
                    return item.value === value;
                })?.label;
            },
        },
        {
            title: `类型`,
            dataIndex: 'typeLabel',
            width: 100,
        },

        {
            title: '状态',
            dataIndex: 'status',
            width: 100,
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
            width: 150,
            render: (value: number) => {
                return formatDateTime(value);
            },
        },
        {
            title: '更新时间',
            dataIndex: 'updatedAt',
            width: 150,
            render: (value: number) => {
                return formatDateTime(value);
            },
        },
        {
            title: '操作',
            dataIndex: 'id',
            width: 230,
            fixed: 'right',
            render: (text: string, record: any) => {
                return (
                    <Space>
                        <ProductForm
                            key={`update-product`}
                            onSuccess={handleQueryProductPage}
                            id={record?.id}
                            isEdit
                        >
                            <Button
                                type={`link`}
                                disabled={!_.eq(record?.status, 'DEVELOPMENT')}
                            >
                                编辑
                            </Button>
                        </ProductForm>
                        <Button
                            size={`small`}
                            type={`link`}
                            onClick={() =>
                                navigate(
                                    RouteConstants.DEVICE.PRODUCT_DETAIL.path(text)
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
                    items={items}
                    onSearchParamsChange={(values: any) => {
                        setSearchParams(values);
                    }}
                    onSearch={() => {
                        handleQueryProductPage();
                    }}
                />
            </Layout.Item>
            <Layout.Item auto={true}>
                <GridTable
                    style={{
                        backgroundColor: 'white',
                        boxSizing: 'border-box',
                    }}
                    toolbar={
                        <TableToolbar
                            extra={
                                <ProductForm
                                    key={`create-product`}
                                    onSuccess={handleQueryProductPage}
                                >
                                    <Button
                                        type={`primary`}
                                        icon={<PlusCircleOutlined />}
                                    >
                                        新建产品
                                    </Button>
                                </ProductForm>
                            }
                        />
                    }
                    fit={true}
                    size={`small`}
                    columns={columns}
                    dataSource={products}
                    rowKey={`id`}
                    scroll={{ x: 1000 }}
                    loading={loading}
                    pagination={{
                        current: pageNum,
                        pageSize,
                        total: total,
                        onChange: (page, pageSize) => {
                            setPageNum(page);
                            setPageSize(pageSize);
                        },
                    }}
                />
            </Layout.Item>
        </Layout>
    );
};
