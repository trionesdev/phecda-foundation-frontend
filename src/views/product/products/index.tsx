import {
    AppToolbar,
    GridTable,
    HPanel,
    TableToolbar,
    VPanel,
} from '@moensun/antd-react-ext';
import { Button, Popconfirm, Space } from 'antd';
import { useEffect, useState } from 'react';
import ProductFormBtn from './product-form-btn';
import { deviceApi } from '@apis';
import { ProductPageRep, ProductRep } from '../../../apis/device/device.rep';
import { useNavigate } from 'react-router-dom';
import { RoutesConstants } from '../../../router/routes.constants';
import styles from './products.module.less';
import { formatDateTime } from '@/commons/util/date.utils';
import {
    DeviceNodeType,
    DeviceNodeTypeKeys,
} from '../support/device.constants';
import { useRequest } from 'ahooks';

const ProductsView = () => {
    const navigate = useNavigate();
    const [querySeq, setQuerySeq] = useState(0);
    const [pageNum, setPageNum] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [loading, setLoading] = useState(false);
    const [products, setProducts] = useState<ProductRep[]>([]);

    const handleQueryProductPage = () => {
        let params = {
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
    }, [querySeq, pageNum, pageSize]);

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
            width: 225,
            render: (text: string, record: any) => {
                return (
                    <Space>
                        <ProductFormBtn
                            key={`update-product`}
                            type={`link`}
                            onSuccess={handleRefresh}
                            id={record?.id}
                            initValue={{
                                name: record?.name,
                                nodeType: record?.nodeType,
                            }}
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
                        >
                            <Button size={`small`} type={`link`} danger={true}>
                                删除
                            </Button>
                        </Popconfirm>
                    </Space>
                );
            },
        },
    ];

    const tableBar = (
        <TableToolbar
            extra={[
                <ProductFormBtn
                    key={`create-product`}
                    type={`primary`}
                    onSuccess={handleRefresh}
                >
                    新建产品
                </ProductFormBtn>,
            ]}
        />
    );

    return (
        <VPanel className={styles.productsView}>
            <GridTable
                style={{ backgroundColor: 'white', padding: '8px' }}
                toolbar={tableBar}
                size={`small`}
                columns={columns}
                dataSource={products}
                rowKey={`id`}
                loading={loading}
            />
        </VPanel>
    );
};
export default ProductsView;
