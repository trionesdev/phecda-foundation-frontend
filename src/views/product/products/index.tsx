import {
    AppToolbar,
    GridTable,
    HPanel,
    TableToolbar,
    VPanel,
} from '@moensun/antd-react-ext';
import { Button, Space } from 'antd';
import { useEffect, useState } from 'react';
import ProductFormBtn from './product-form-btn';
import { deviceApi } from '@apis';
import { ProductPageRep, ProductRep } from '../../../apis/device/device.rep';
import { useNavigate } from 'react-router-dom';
import { RoutesConstants } from '../../../router/routes.constants';
import styles from './products.module.less';

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

    useEffect(() => {
        handleQueryProductPage();
    }, [querySeq, pageNum, pageSize]);

    const columns = [
        {
            title: '产品名称',
            dataIndex: 'name',
        },
        {
            title: '操作',
            dataIndex: 'id',
            width: 100,
            render: (text: string, record: any) => {
                return (
                    <Space>
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
