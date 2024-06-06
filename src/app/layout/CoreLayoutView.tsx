import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Menu, MenuProps } from 'antd';
import { RoutesConstants } from '@/router/routes.constants';
import { Layout } from '@trionesdev/antd-react-ext';
import styles from '@/app/layout/layout.module.less';
import {
    AlarmIcon,
    DashboardIcon,
    DeviceIcon,
    MessageForwardingIcon,
    MonitoringIcon,
    NotificationIcon,
} from '@icons';

export const CoreLayoutView = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [selectedKeys, setSelectedKeys] = useState<any[]>([]);
    const [openKeys, setOpenKeys] = useState<any[]>([]);
    const menuItems: MenuProps['items'] = [
        {
            key: RoutesConstants.DASHBOARD.key,
            label: '概览',
            icon: <DashboardIcon />,
            onClick: () => navigate(RoutesConstants.DASHBOARD.path()),
        },
        {
            key: 'device-management',
            label: '设备管理',
            icon: <DeviceIcon />,
            children: [
                {
                    key: RoutesConstants.PRODUCTS.key,
                    label: '产品',
                    onClick: () => navigate(RoutesConstants.PRODUCTS.path()),
                },
                {
                    key: RoutesConstants.DEVICES.key,
                    label: `设备`,
                    onClick: () => navigate(RoutesConstants.DEVICES.path()),
                },
                {
                    key: RoutesConstants.DRIVERS.key,
                    label: `驱动`,
                    onClick: () => navigate(RoutesConstants.DRIVERS.path()),
                },
            ],
        },
        {
            key: 'message-forwarding',
            label: `消息转发`,
            icon: <MessageForwardingIcon />,
            children: [
                {
                    key: RoutesConstants.MESSAGE_FORWARDING_RULES.key,
                    label: '业务流转',
                    onClick: () =>
                        navigate(
                            RoutesConstants.MESSAGE_FORWARDING_RULES.path()
                        ),
                },
            ],
        },
        {
            key: 'monitoring-operations',
            label: '监控运维',
            icon: <MonitoringIcon />,
            children: [
                {
                    key: RoutesConstants.LINKAGE.key,
                    label: `事件响应`,
                    onClick: () => navigate(RoutesConstants.LINKAGE.path()),
                },
            ],
        },
        {
            key: 'alarm-management',
            label: '告警管理',
            icon: <AlarmIcon />,
            children: [
                {
                    key: RoutesConstants.ALARM_TYPES.key,
                    label: '告警类型',
                    onClick: () => navigate(RoutesConstants.ALARM_TYPES.path()),
                },
                {
                    key: RoutesConstants.ALARM_LEVELS.key,
                    label: '告警等级',
                    onClick: () =>
                        navigate(RoutesConstants.ALARM_LEVELS.path()),
                },
                {
                    key: RoutesConstants.ALARMS.key,
                    label: '告警列表',
                    onClick: () => navigate(RoutesConstants.ALARMS.path()),
                },
            ],
        },
        {
            key: 'notification',
            label: '通知管理',
            icon: <NotificationIcon />,
            children: [
                {
                    key: RoutesConstants.NOTIFICATION_CONTACTS.key,
                    label: '联系人',
                    onClick: () =>
                        navigate(RoutesConstants.NOTIFICATION_CONTACTS.path()),
                },
                {
                    key: RoutesConstants.NOTIFICATION_TEMPLATES.key,
                    label: '模板管理',
                    onClick: () =>
                        navigate(RoutesConstants.NOTIFICATION_TEMPLATES.path()),
                },
            ],
        },
        // {
        //     key: 'edge-management',
        //     label: '边缘节点',
        //     children: [
        //         {
        //             key: RoutesConstants.EDGE_NODE.key,
        //             label: '节点管理',
        //             onClick: () => navigate(RoutesConstants.EDGE_NODE.path()),
        //         },
        //     ],
        // },
    ];

    const onOpenChange: MenuProps['onOpenChange'] = (keys) => {
        const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1);
        setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
    };

    useEffect(() => {
        if (location && location.pathname) {
            const keyArr = location.pathname.split('/');
            setOpenKeys([keyArr?.[1]]);
            setSelectedKeys([keyArr?.[2]]);
        }
    }, [location]);

    return (
        <Layout className={styles.layoutViewContent}>
            <Layout.Sider width={250} className={styles.layoutViewSider}>
                <Menu
                    items={menuItems}
                    openKeys={openKeys}
                    onOpenChange={onOpenChange}
                    selectedKeys={selectedKeys}
                />
            </Layout.Sider>
            <Layout.Item auto={true} style={{ padding: 8 }}>
                <div style={{ height: '100%' }}>
                    <Outlet />
                </div>
            </Layout.Item>
        </Layout>
    );
};
