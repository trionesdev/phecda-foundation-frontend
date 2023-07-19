type MixedData = unknown | { [key: string]: MixedData } | MixedData[];

export const filterEmptyData = (data: MixedData): MixedData => {
    if (
        data === undefined ||
        data === null ||
        (typeof data === 'object' && Object.keys(data as object).length === 0)
    ) {
        return undefined; // 过滤掉undefined、null或空对象
    }

    if (Array.isArray(data)) {
        const filteredArray = data.map((item) =>
            filterEmptyData(item)
        ) as MixedData[];
        return filteredArray.filter((item) => item !== undefined);
    }

    if (typeof data === 'object') {
        const filteredObject: { [key: string]: MixedData } = {};
        for (const key in data as { [key: string]: MixedData }) {
            const filteredValue = filterEmptyData(
                (data as { [key: string]: MixedData })[key]
            );
            if (filteredValue !== undefined) {
                filteredObject[key] = filteredValue;
            }
        }
        return filteredObject;
    }

    return data; // 保留其他类型数据
};
