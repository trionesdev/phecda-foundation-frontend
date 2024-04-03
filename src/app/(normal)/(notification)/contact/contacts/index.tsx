import { GridTable, Layout, TableToolbar } from '@trionesdev/antd-react-ext';
import { useState } from 'react';
import { Button, Space } from 'antd';
import { ContactForm } from '@/app/(normal)/(notification)/contact/contacts/ContactForm';

export const Contacts = () => {
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
        <Layout direction={`vertical`} style={{ padding: 4 }}>
            <Layout.Item auto={true}>
                <GridTable
                    toolbar={
                        <TableToolbar
                            extra={
                                <Space>
                                    <ContactForm>
                                        <Button type={`primary`}>
                                            新建联系人
                                        </Button>
                                    </ContactForm>
                                </Space>
                            }
                        />
                    }
                    size={`small`}
                    fit={true}
                    columns={columns}
                    dataSource={rows}
                />
            </Layout.Item>
        </Layout>
    );
};
