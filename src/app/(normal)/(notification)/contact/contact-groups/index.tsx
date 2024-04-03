import { useState } from 'react';
import { GridTable } from '@trionesdev/antd-react-ext';

export const ContactGroups = () => {
    const [rows, setRows] = useState([]);

    const columns = [
        {
            title: '联系人',
            dataIndex: 'name',
            key: 'name',
            width: 200,
        },
    ];
    return (
        <>
            <GridTable
                size={`small`}
                fit={true}
                columns={columns}
                dataSource={rows}
            />
        </>
    );
};
