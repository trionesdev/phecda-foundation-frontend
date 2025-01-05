import {FC} from 'react';
import {SelectProps} from 'antd';
import {deviceApi} from '@apis/tenant';
import {FetchSelect} from "@trionesdev/antd-react-ext";

type ProductSelectProps = {
    allOption?: boolean;
} & SelectProps;
export const ProductKeySelect: FC<ProductSelectProps> = ({
                                                             allOption,
                                                             ...rest
                                                         }) => {


    return (
        <FetchSelect {...rest} fieldNames={{value: 'key', label: 'name'}}
                     fixedOptions={allOption ? [{key: '+', name: '全部产品（+）'}] : []} fetchRequest={() => {
            return deviceApi.queryProductList()
        }}/>
    );
};
