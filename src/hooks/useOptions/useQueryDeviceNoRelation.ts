import { deviceApi } from '@apis/tenant';
import { useRequest } from 'ahooks';
import { useEffect, useMemo } from 'react';

const useQueryDeviceNoRelation = (assetSn?: string) => {
    const { data, loading, run } = useRequest(
        (assetSn) => deviceApi.queryDeviceNoRelation(assetSn),
        { manual: false }
    );
    useEffect(() => {
        run(assetSn);
    }, [assetSn]);
    const deviceOptions = useMemo(() => {
        return data?.map((item: any) => {
            return {
                label: item.remarkName,
                value: item?.name,
                ...item,
            };
        });
    }, [data]);
    return {
        deviceData: data,
        queryDeviceNoRelationLoading: loading,
        deviceOptions,
    };
};
export default useQueryDeviceNoRelation;
