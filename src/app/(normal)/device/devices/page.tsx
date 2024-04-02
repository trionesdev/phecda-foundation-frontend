import {
    // GridTable,
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
import GridTable from '@components/grid-table';

export const DevicesPage = () => {
    const [querySeq, setQuerySeq] = useState(0);
    const [pageNum, setPageNum] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [total, setTotal] = useState(100);
    const [devices, setDevices] = useState([]);
    const [formData, setFormData] = useState({});

    const { run: handleQueryDevices, loading } = useRequest(
        () => {
            let params = {
                ...formData,
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
            handleRefresh();
            message.success('操作成功');
        });
    };

    const handleUpdateDeviceEnabled = (id: string, enabled: boolean) => {
        deviceApi.updateDeviceEnabled(id, enabled).then(() => {
            handleRefresh();
        });
    };

    const handleRefresh = () => {
        setQuerySeq(querySeq + 1);
    };

    useEffect(() => {
        handleQueryDevices();
    }, [querySeq, pageNum, pageSize]);

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
            title: `启用/禁用`,
            dataIndex: 'enabled',
            width: 120,
            fixed: 'right',
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
                            type="link"
                            size={`small`}
                            isEdit
                            id={record?.id}
                            onSuccess={handleRefresh}
                        >
                            编辑
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
                    span={6}
                    xxl={4}
                    xl={6}
                    lg={6}
                    md={8}
                    sm={12}
                    xs={24}
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
                    onSearch={(values: any) => {
                        setFormData(values);
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
                                    type={`primary`}
                                    onSuccess={handleRefresh}
                                >
                                    新建设备
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
