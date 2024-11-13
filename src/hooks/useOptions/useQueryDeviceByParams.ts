import { deviceApi } from '@apis/tenant';
import { isNilEmpty } from '@/commons/util/isNilEmpty';
import { useRequest } from 'ahooks';
import { useEffect, useMemo } from 'react';

const useQueryDeviceByParams = (params?: Record<string, any>) => {
    const { data, run: queryDeviceList } = useRequest(
        (params) => deviceApi.queryDeviceByParams(params),
        {
            manual: true,
        }
    );
    const deviceDataOptions = useMemo(() => {
        return data?.map((item: any) => {
            return {
                label: item.remarkName,
                value: item?.name,
                ...item,
            };
        });
    }, [data]);
    useEffect(() => {
        !isNilEmpty(params) && queryDeviceList(params);
    }, [params, queryDeviceList]);

    return {
        deviceData: data,
        deviceDataOptions,
        queryDeviceList,
    };
};
export default useQueryDeviceByParams;
