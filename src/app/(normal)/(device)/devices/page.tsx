import {
    GridTable,
    Layout,
    SearchToolbar,
    TableToolbar,
} from '@trionesdev/antd-react-ext';
import styles from './device.module.less';
import React, { useEffect, useState } from 'react';
import {
    Button,
    Divider,
    Input,
    message,
    Popconfirm,
    Space,
    Switch,
} from 'antd';
import DeviceForm from './device-form';
import { deviceApi } from '@apis';
import { Link } from 'react-router-dom';
import { RoutesConstants } from '@/router/routes.constants';
import { useRequest } from 'ahooks';

export const DevicesPage = () => {
    const [pageNum, setPageNum] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [total, setTotal] = useState(100);
    const [devices, setDevices] = useState([]);
    const [searchParams, setSearchParams] = useState({});

    const { run: handleQueryDevices, loading } = useRequest(
        () => {
            let params = {
                ...searchParams,
                pageNum,
                pageSize,
            };
            return deviceApi.queryDevicesExtPage(params);
        },
        {
            manual: true,
            onSuccess(res: any) {
                if (res) {
                    setDevices(res.rows || []);
                    setTotal(res.total || 0);
                }
            },
        }
    );

    const handleDeleteById = (id: string) => {
        deviceApi.deleteDeviceById(id).then(async () => {
            handleQueryDevices();
            message.success('操作成功');
        });
    };

    const handleUpdateDeviceEnabled = (id: string, enabled: boolean) => {
        deviceApi.updateDeviceEnabled(id, enabled).then(() => {
            handleQueryDevices();
        });
    };

    useEffect(() => {
        handleQueryDevices();
    }, [pageNum, pageSize]);

    const columns: any[] = [
        {
            title: '备注名称',
            dataIndex: 'remarkName',
        },
        {
            title: 'DeviceName',
            dataIndex: 'name',
        },
        {
            title: `设备所属产品`,
            dataIndex: ['product', 'name'],
        },
        {
            title: '节点类型',
            dataIndex: ['product', 'nodeTypeLabel'],
            width: 150,
        },
        {
            title: '产品类型',
            dataIndex: ['product', 'typeLabel'],
            width: 150,
        },
        {
            title: `启用/禁用`,
            dataIndex: 'enabled',
            width: 120,
            // fixed: 'right',
            render: (text: boolean, record: any) => {
                return (
                    <Switch
                        defaultChecked={text}
                        onChange={(checked) =>
                            handleUpdateDeviceEnabled(record.id, checked)
                        }
                    />
                );
            },
        },
        {
            title: '操作',
            dataIndex: 'id',
            width: 225,
            fixed: 'right',
            render: (text: string, record: any) => {
                return (
                    <Space split={<Divider type={`vertical`} />}>
                        <DeviceForm
                            key={`edit-btn`}
                            isEdit
                            id={record?.id}
                            onSuccess={handleQueryDevices}
                        >
                            <Button size={`small`} type={`link`}>
                                编辑
                            </Button>
                        </DeviceForm>
                        <Button key={`view-btn`} size={`small`} type={`link`}>
                            <Link to={RoutesConstants.DEVICE_DETAIL.path(text)}>
                                查看
                            </Link>
                        </Button>
                        <Popconfirm
                            key={`del-btn`}
                            title={`确定删除设备 ${record.name}？`}
                            onConfirm={() => handleDeleteById(text)}
                        >
                            <Button size={`small`} type={`link`} danger={true}>
                                删除
                            </Button>
                        </Popconfirm>
                    </Space>
                );
            },
        },
    ];

    return (
        <Layout direction={`vertical`} className={styles.deviceView}>
            <Layout.Item style={{ backgroundColor: 'white' }}>
                <SearchToolbar
                    items={[
                        {
                            label: 'DeviceName',
                            name: 'name',
                            children: <Input allowClear />,
                        },
                        {
                            label: '备注名称',
                            name: 'remarkName',
                            children: <Input allowClear />,
                        },
                    ]}
                    onSearchParamsChange={(values: any) => {
                        setSearchParams(values);
                    }}
                    onSearch={() => {
                        handleQueryDevices();
                    }}
                />
            </Layout.Item>
            <Layout.Item auto={true}>
                <GridTable
                    style={{ padding: '8px', backgroundColor: 'white' }}
                    fit={true}
                    size={`small`}
                    toolbar={
                        <TableToolbar
                            extra={
                                <DeviceForm
                                    key={`create-btn`}
                                    onSuccess={handleQueryDevices}
                                >
                                    <Button type={`primary`}>新建设备</Button>
                                </DeviceForm>
                            }
                        />
                    }
                    columns={columns}
                    dataSource={devices}
                    rowKey={`id`}
                    loading={loading}
                    pagination={{
                        pageSize,
                        total,
                        onChange: (page, size) => {
                            setPageNum(page);
                        },
                    }}
                    scroll={{ x: 1300 }}
                />
            </Layout.Item>
        </Layout>
    );
};
