import { assetsApi } from '@apis/tenant';
import { useRequest } from 'ahooks';
import { useMemo } from 'react';

/** 获取所有资产 */
const useQueryAssetsAll = () => {
    const { data } = useRequest(() => assetsApi.queryAssetsAll());
    const allAssetsOptions = useMemo(() => {
        return data?.map((item: any) => {
            return {
                label: item.name,
                value: item?.sn,
                // ...item,
            };
        });
    }, [data]);
    return {
        allAssetsData: data,
        allAssetsOptions,
    };
};
export default useQueryAssetsAll;
