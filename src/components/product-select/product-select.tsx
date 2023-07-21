import { FC, useEffect, useState } from 'react';
import { Select, SelectProps } from 'antd';
import { deviceApi } from '@apis';
import _ from 'lodash';
import { all } from 'axios';

type ProductSelectProps = {
    allOption?: boolean;
} & SelectProps;
const ProductSelect: FC<ProductSelectProps> = ({ allOption, ...rest }) => {
    const [options, setOptions] = useState<any>([]);

    const handleQuery = () => {
        deviceApi.queryProductList().then((res: any) => {
            setOptions(
                _.concat(
                    allOption ? { value: null, name: '全部产品' } : [],
                    res || []
                )
            );
        });
    };

    useEffect(() => {
        handleQuery();
    }, []);
    console.log(options);
    return (
        <Select
            {...rest}
            fieldNames={{ value: 'id', label: 'name' }}
            placeholder={`请选择产品`}
            options={options}
        />
    );
};
export default ProductSelect;
