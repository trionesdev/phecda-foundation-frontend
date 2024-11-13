import { deviceApi } from '@apis/tenant';
import { isNilEmpty } from '@/commons/util/isNilEmpty';
import { useRequest } from 'ahooks';
import { useEffect, useMemo } from 'react';

const useQueryProductProperty = (id?: string) => {
    const { data, run: queryProductThingMode } = useRequest(
        (id) => deviceApi.queryProductThingModel(id),
        {
            manual: true,
        }
    );
    const propertyOptions = useMemo(() => {
        return data?.thingModel?.properties?.map(
            (item: Record<string, any>) => {
                return {
                    label: item?.name,
                    value: item?.identifier,
                };
            }
        );
    }, [data]);
    useEffect(() => {
        !isNilEmpty(id) && queryProductThingMode(id);
    }, [id, queryProductThingMode]);
    return {
        propertyOptions,
        productThingModeData: data,
        queryProductThingMode,
    };
};
export default useQueryProductProperty;
