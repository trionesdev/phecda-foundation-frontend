import { AppToolbar, Layout } from '@trionesdev/antd-react-ext';
import { Menu, MenuProps } from 'antd';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import styles from './layout.module.less';
import { RoutesConstants } from '@/router/routes.constants';
import { useEffect, useState } from 'react';
import Icon from '@ant-design/icons';
import { ReactComponent as PhecdaSvg } from './assests/phecda.svg';

const MainLayoutView = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [selectedKeys, setSelectedKeys] = useState<any[]>([]);
    const [openKeys, setOpenKeys] = useState<any[]>([]);
    const menuItems: MenuProps['items'] = [
        {
            key: RoutesConstants.DASHBOARD.key,
            label: '首页',
            onClick: () => navigate(RoutesConstants.DASHBOARD.path()),
        },
        {
            key: 'device-management',
            label: '设备管理',
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
            ],
        },
        {
            key: 'message-forwarding',
            label: `消息转发`,
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
            children: [
                {
                    key: RoutesConstants.LINKAGE.key,
                    label: `事件响应`,
                    onClick: () => navigate(RoutesConstants.LINKAGE.path()),
                },
            ],
        },
        // {
        //     key: 'alarm-management',
        //     label: '数据中心',
        //     children: [
        //         /*{
        //             key: RoutesConstants.ALARM_RULES.key,
        //             label: `告警配置`,
        //             onClick: () => navigate(RoutesConstants.ALARM_RULES.path()),
        //         },*/
        //         {
        //             key: RoutesConstants.ALARM_LOG.key,
        //             label: '告警日志',
        //             onClick: () => navigate(RoutesConstants.ALARM_LOG.path()),
        //         },
        //         {
        //             key: RoutesConstants.MONITOR_VIEW.key,
        //             label: `监控画面`,
        //             onClick: () =>
        //                 navigate(RoutesConstants.MONITOR_VIEW.path()),
        //         },
        //         /*{
        //             key: RoutesConstants.DEVICE_DATA.key,
        //             label: `设备数据`,
        //             onClick: () => navigate(RoutesConstants.DEVICE_DATA.path()),
        //         },
        //      ,*/
        //     ],
        // },
        {
            key: 'alarm-management',
            label: '告警管理',
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
            children: [
                {
                    key: RoutesConstants.NOTIFICATION_CONTACTS.key,
                    label: '联系人',
                    onClick: () =>
                        navigate(RoutesConstants.NOTIFICATION_CONTACTS.path()),
                },
            ],
        },
        {
            key: 'edge-management',
            label: '边缘节点',
            children: [
                {
                    key: RoutesConstants.EDGE_NODE.key,
                    label: '节点管理',
                    onClick: () => navigate(RoutesConstants.EDGE_NODE.path()),
                },
            ],
        },
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
        <Layout direction={`vertical`}>
            <Layout.Item>
                <AppToolbar
                    avatar={{
                        icon: (
                            <Icon component={PhecdaSvg} style={{ width: 40 }} />
                        ),
                        style: { fontSize: 40 },
                    }}
                    title={`物联网平台`}
                />
            </Layout.Item>
            <Layout className={styles.layoutViewContent}>
                <Layout.Item>
                    <div className={styles.layoutViewSider}>
                        <Menu
                            style={{ minWidth: 250 }}
                            mode={`inline`}
                            items={menuItems}
                            openKeys={openKeys}
                            onOpenChange={onOpenChange}
                            selectedKeys={selectedKeys}
                        />
                    </div>
                </Layout.Item>
                <Layout.Item auto={true}>
                    <Outlet />
                </Layout.Item>
            </Layout>
        </Layout>
    );
};
export default MainLayoutView;
