import { TableToolbar, VPanel } from '@moensun/antd-react-ext';
import styles from './device.module.less';
import React, { useEffect, useMemo, useState } from 'react';
import {
    Button,
    Divider,
    Form,
    Input,
    message,
    Popconfirm,
    Select,
    Space,
    Switch,
} from 'antd';
import DeviceForm from './device-form';
import { deviceApi } from '@apis';
import { Link } from 'react-router-dom';
import { RoutesConstants } from '../../../router/routes.constants';
import GridTable from '@components/grid-table';
import ProductFormBtn from '@views/product/products/product-form-btn';
import SearchToolbar from '@components/search-toolbar';
const DevicesView = () => {
    const [querySeq, setQuerySeq] = useState(0);
    const [loading, setLoading] = useState(false);
    const [pageNum, setPageNum] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [devices, setDevices] = useState([]);
    const [formData, setFormData] = useState({});

    const handleQueryDevices = () => {
        let params = {
            ...formData,
            pageNum,
            pageSize,
        };
        setLoading(true);
        deviceApi
            .queryDevicesExtPage(params)
            .then((res: any) => {
                console.log(res);
                if (res) {
                    setDevices(res.rows || []);
                }
            })
            .finally(() => {
                setLoading(false);
            });
    };

    const handleDeleteById = (id: string) => {
        deviceApi.deleteDeviceById(id).then(() => {
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
    }, [formData, querySeq, pageNum, pageSize]);

    const columns = [
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
            render: (text: string, record: any) => {
                return (
                    <Space split={<Divider type={`vertical`} />}>
                        <DeviceForm
                            key={`edit-btn`}
                            type="link"
                            size={`small`}
                            isEdit
                            initValue={record}
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

    const searchForm = useMemo(() => {
        return (
            <>
                <Form.Item name="name" label="DeviceName">
                    <Input allowClear />
                </Form.Item>
                <Form.Item name="remarkName" label={`备注名称`}>
                    <Input allowClear />
                </Form.Item>
            </>
        );
    }, []);

    const tableBar = (
        <SearchToolbar
            formItems={searchForm}
            onSearch={(values) => {
                setFormData(values);
            }}
            addButtons={
                <DeviceForm
                    key={`create-btn`}
                    type={`primary`}
                    onSuccess={handleRefresh}
                >
                    新建设备
                </DeviceForm>
            }
        />
    );
    return (
        <VPanel className={styles.deviceView}>
            <GridTable
                style={{ padding: '8px', backgroundColor: 'white' }}
                fit={true}
                size={`small`}
                toolbar={tableBar}
                columns={columns}
                scroll={{ y: 'max-content' }}
                dataSource={devices}
                rowKey={`id`}
                loading={loading}
            />
        </VPanel>
    );
};
export default DevicesView;
