interface ArrayItem {
    name: string;
    value: string;
}

export const objectToArray = (obj: { [key: string]: string }): ArrayItem[] => {
    return Object.entries(obj).map(([name, value]) => ({ name, value }));
};
