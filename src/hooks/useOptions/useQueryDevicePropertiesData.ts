import { useRequest } from 'ahooks';
import { deviceApi } from '@apis/tenant';
import { useEffect, useMemo } from 'react';

const useQueryDevicePropertiesData = (deviceName?: string) => {
    const { data, loading, run } = useRequest(
        (deviceName) => deviceApi.queryDeviceProperties(deviceName),
        { manual: false }
    );
    useEffect(() => {
        run(deviceName);
    }, [deviceName]);
    const devicePropertiesOptions = useMemo(() => {
        return data?.map((item: any) => {
            return {
                label: item.name,
                value: item.identifier,
                // ...item,
            };
        });
    }, [data]);
    return {
        devicePropertiesData: data,
        queryDeviceAllLoading: loading,
        devicePropertiesOptions,
    };
};
export default useQueryDevicePropertiesData;
