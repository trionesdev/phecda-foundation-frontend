import { Form, FormInstance, Select } from 'antd';
import { FC, useEffect, useState } from 'react';
import { useRequest } from 'ahooks';
import { deviceApi } from '@apis/tenant';

type DeviceFormItemProps = {
    productKey?: string;
    required?: boolean;
    form?: FormInstance;
    namePath?: any;
};
export const DeviceFormItem: FC<DeviceFormItemProps> = ({
    productKey,
    required,
    form,
    namePath,
}) => {
    const [options, setOptions] = useState([]);
    const { run: handleQueryDevicesByProductId } = useRequest(
        () => deviceApi.queryDeviceByParams({ productKey }),
        {
            manual: true,
            onSuccess: (res: any) => {
                setOptions(res);
            },
        }
    );

    useEffect(() => {
        if (productKey) {
            handleQueryDevicesByProductId();
        } else {
            setOptions([]);
        }
    }, [productKey]);

    return (
        <Form.Item label={`设备`} name={[...namePath]} required={required}>
            <Select
                style={{ minWidth: 180 }}
                placeholder={`请选择设备`}
                options={options}
                fieldNames={{ label: 'name', value: 'name' }}
            />
        </Form.Item>
    );
};
