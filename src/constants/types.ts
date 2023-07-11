export type TableParams = {
    pageSize: number;
    pageNum: number;
    total?: number;
    [key: string]: any;
};

export type OptionsType = {
    label: React.ReactNode;
    value: any;
    [key: string]: any;
};
