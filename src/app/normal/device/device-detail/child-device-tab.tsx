import { FC, useEffect, useState } from 'react';
import { deviceApi } from '@apis';
import { Button, Divider, notification, Popconfirm, Space, Switch } from 'antd';
import { Link } from 'react-router-dom';
import { RoutesConstants } from '@/router/routes.constants';
import { GridTable, TableToolbar, VPanel } from '@trionesdev/antd-react-ext';
import _ from 'lodash';
import ChildDeviceForm from './child-device-form';

type ChildDeviceTabProps = {
    device: any;
};

const ChildDeviceTab: FC<ChildDeviceTabProps> = ({ device }) => {
    const [querySeq, setQuerySeq] = useState(0);
    const [loading, setLoading] = useState(false);
    const [pageNum, setPageNum] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [devices, setDevices] = useState([]);
    const handleQueryDevices = () => {
        let params = {
            gatewayId: _.get(device, 'id'),
            pageNum,
            pageSize,
        };
        setLoading(true);
        deviceApi
            .queryDevicesExtPage(params)
            .then((res: any) => {
                if (res) {
                    setDevices(res.rows || []);
                }
            })
            .finally(() => {
                setLoading(false);
            });
    };

    const handleRemoveChildDevice = (id: string) => {
        deviceApi
            .removeChildDevice(device.id, [id])
            .then(() => {
                handleRefresh();
                notification.success({ message: '子设备删除成功' });
            })
            .catch((e) => {
                notification.error({ message: `${e.message}` });
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
            width: 120,
        },
        {
            title: `启用/禁用`,
            dataIndex: 'enabled',
            width: 100,
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
            width: 150,
            render: (text: string, record: any) => {
                return (
                    <Space split={<Divider type={`vertical`} />}>
                        <Button key={`view-btn`} size={`small`} type={`link`}>
                            <Link to={RoutesConstants.DEVICE_DETAIL.path(text)}>
                                查看
                            </Link>
                        </Button>
                        <Popconfirm
                            key={`del-btn`}
                            title={`确定删除设备"${record.remarkName}"？`}
                            onConfirm={() => handleRemoveChildDevice(text)}
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

    const tableBar = (
        <TableToolbar
            extra={
                <ChildDeviceForm
                    key={`add-child-device-btn`}
                    type={`primary`}
                    onSuccess={handleRefresh}
                    parentDeviceId={device.id}
                >
                    添加子设备
                </ChildDeviceForm>
            }
        />
    );

    return (
        <>
            <VPanel>
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
        </>
    );
};

export default ChildDeviceTab;
