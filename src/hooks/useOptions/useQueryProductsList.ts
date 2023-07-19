import { deviceApi } from '@/apis';
import { useRequest } from 'ahooks';
import { useMemo } from 'react';

/** 获取所有产品 */
const useQueryProductsList = () => {
    const { data, loading } = useRequest(() => deviceApi.queryProductList());
    const productOptions = useMemo(() => {
        return data?.map((item) => {
            return {
                label: item.name,
                value: item.id,
            };
        });
    }, [data]);
    return {
        productListData: data,
        productOptions,
        loading,
    };
};
export default useQueryProductsList;
