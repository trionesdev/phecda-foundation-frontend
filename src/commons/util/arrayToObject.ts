interface ArrayItem {
    name: string;
    value: string;
}

export const arrayToObject = (arr: ArrayItem[]): { [key: string]: string } => {
    return arr.reduce((acc, item) => {
        acc[item.name] = item.value;
        return acc;
    }, {} as any);
};
