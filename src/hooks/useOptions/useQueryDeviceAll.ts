import { deviceApi } from '@apis/tenant';
import { useRequest } from 'ahooks';
import { useMemo } from 'react';

const useQueryDeviceAll = () => {
    const { data, loading } = useRequest(() => deviceApi.queryDeviceAll());
    const allDeviceDataOptions = useMemo(() => {
        return data?.map((item: any) => {
            return {
                label: item.remarkName,
                value: item?.name,
                ...item,
            };
        });
    }, [data]);
    return {
        allDeviceData: data,
        queryDeviceAllLoading: loading,
        allDeviceDataOptions,
    };
};
export default useQueryDeviceAll;
