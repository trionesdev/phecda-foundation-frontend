import { systemApi } from '@apis/tenant';
import { useRequest } from 'ahooks';
import { useEffect, useMemo } from 'react';

/** 根据typeCode获取字典的options */
const useQueryDictionaryOptions = (typeCode: string) => {
    const {
        data: optionData,
        loading,
        run: fetchTableData,
    } = useRequest(
        (tableParams) => systemApi.queryDictionariesOptions(tableParams),
        { manual: true }
    );

    const typeCodeOptions = useMemo(() => {
        return optionData?.map((item: any) => {
            return {
                label: item.label,
                value: item.code,
            };
        });
    }, [optionData]);

    useEffect(() => {
        fetchTableData({
            typeCode,
        });
    }, [fetchTableData, typeCode]);

    return {
        optionData,
        typeCodeOptions,
        loading,
    };
};
export default useQueryDictionaryOptions;
