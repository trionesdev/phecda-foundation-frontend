import { message, Select, SelectProps } from 'antd';
import { FC, useEffect, useState } from 'react';
import { useRequest } from 'ahooks';
import { notificationApi } from '@apis/tenant';

type ContactGroupSelectProps = {} & Omit<SelectProps, `options`>;
export const ContactGroupSelect: FC<ContactGroupSelectProps> = ({
    ...rest
}) => {
    const [options, setOptions] = useState([]);
    const { run: handleQueryContactGroups } = useRequest(
        () => {
            return notificationApi.findContactGroups();
        },
        {
            manual: true,
            onSuccess: (res: any) => {
                setOptions(res || []);
            },
            onError: async (err) => {
                message.error(err.message);
            },
        }
    );

    useEffect(() => {
        handleQueryContactGroups();
    }, []);
    return (
        <Select
            {...rest}
            fieldNames={{ label: `name`, value: `id` }}
            mode="multiple"
            options={options}
        />
    );
};
