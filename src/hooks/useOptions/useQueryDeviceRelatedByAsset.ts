import { deviceApi } from '@apis/tenant';
import { useRequest } from 'ahooks';
import { useEffect, useMemo } from 'react';

const useQueryDeviceRelatedByAsset = (assetSn?: string) => {
    const { data, loading, run } = useRequest((assetSn) =>
        deviceApi.queryDeviceRelatedByAsset(assetSn)
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
        queryDeviceRelatedByAssetLoading: loading,
        deviceOptions,
    };
};

export default useQueryDeviceRelatedByAsset;
