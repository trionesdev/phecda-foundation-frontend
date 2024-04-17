import { message, Select, SelectProps } from 'antd';
import { FC, useEffect, useState } from 'react';
import { useRequest } from 'ahooks';
import { notificationApi } from '@apis';

type ContactSelectProps = {} & Omit<SelectProps, `options`>;
export const ContactSelect: FC<ContactSelectProps> = ({ ...rest }) => {
    const [options, setOptions] = useState([]);

    const { run: handleQueryContacts } = useRequest(
        () => {
            return notificationApi.findContacts();
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
        handleQueryContacts();
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
