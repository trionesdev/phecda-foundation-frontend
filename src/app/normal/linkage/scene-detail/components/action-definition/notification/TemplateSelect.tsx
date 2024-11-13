import { message, Select, SelectProps } from 'antd';
import { FC, useEffect, useState } from 'react';
import { useRequest } from 'ahooks';
import { notificationApi } from '@apis/tenant';

type NotificationTemplateSelectProps = {} & Omit<SelectProps, `options`>;
export const TemplateSelect: FC<NotificationTemplateSelectProps> = ({
    ...rest
}) => {
    const [options, setOptions] = useState([]);
    const { run: handleQueryTemplates } = useRequest(
        () => {
            return notificationApi.findTemplates();
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
        handleQueryTemplates();
    }, []);
    return (
        <Select
            {...rest}
            fieldNames={{ label: `title`, value: `id` }}
            options={options}
        />
    );
};
