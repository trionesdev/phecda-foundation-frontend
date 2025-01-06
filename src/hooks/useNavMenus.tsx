import { useNavigate } from '@trionesdev/commons-react';
import { RouteConstants } from '@/router/route.constants.ts';
import { AlarmIcon, DashboardIcon, DeviceIcon, MessageForwardingIcon, MonitoringIcon, NotificationIcon } from '@icons';
import { ApartmentOutlined, DatabaseOutlined, DesktopOutlined } from '@ant-design/icons';

export const useNavMenus = () => {
    const navigate = useNavigate();
    const appMenus = [
        {
            key: RouteConstants.DASHBOARD.id,
            label: '概览',
            icon: <DashboardIcon />,
            onClick: () => navigate(RouteConstants.DASHBOARD.path()),
        },
        {
            key: 'device-management',
            label: '设备管理',
            icon: <DeviceIcon />,
            children: [
                {
                    key: RouteConstants.DEVICE.PRODUCTS.id,
                    label: '产品',
                    onClick: () => navigate(RouteConstants.DEVICE.PRODUCTS.path()),
                },
                {
                    key: RouteConstants.DEVICE.DEVICES.id,
                    label: `设备`,
                    onClick: () => navigate(RouteConstants.DEVICE.DEVICES.path()),
                },
                {
                    key: RouteConstants.DEVICE.DRIVERS.id,
                    label: `驱动`,
                    onClick: () => navigate(RouteConstants.DEVICE.DRIVERS.path()),
                },
            ],
        },
        {
            key: 'message-forwarding',
            label: `消息转发`,
            icon: <MessageForwardingIcon />,
            children: [
                {
                    key: RouteConstants.MESSAGE_FORWARDING.MESSAGE_FORWARDING_RULES.id,
                    label: '业务流转',
                    onClick: () =>
                        navigate(
                            RouteConstants.MESSAGE_FORWARDING.MESSAGE_FORWARDING_RULES.path(),
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
                    key: RouteConstants.MONITORING_OPERATION.LINKAGE.id,
                    label: `事件响应`,
                    onClick: () => navigate(RouteConstants.MONITORING_OPERATION.LINKAGE.path()),
                },
            ],
        },
        {
            key: 'alarm-management',
            label: '告警管理',
            icon: <AlarmIcon />,
            children: [
                {
                    key: RouteConstants.ALARM.ALARM_TYPES.id,
                    label: '告警类型',
                    onClick: () => navigate(RouteConstants.ALARM.ALARM_TYPES.path()),
                },
                {
                    key: RouteConstants.ALARM.ALARM_LEVELS.id,
                    label: '告警等级',
                    onClick: () =>
                        navigate(RouteConstants.ALARM.ALARM_LEVELS.path()),
                },
                {
                    key: RouteConstants.ALARM.ALARMS.id,
                    label: '告警列表',
                    onClick: () => navigate(RouteConstants.ALARM.ALARMS.path()),
                },
            ],
        },
        {
            key: 'notification',
            label: '通知管理',
            icon: <NotificationIcon />,
            children: [
                {
                    key: RouteConstants.NOTIFICATION.NOTIFICATION_CONTACTS.id,
                    label: '联系人',
                    onClick: () =>
                        navigate(RouteConstants.NOTIFICATION.NOTIFICATION_CONTACTS.path()),
                },
                {
                    key: RouteConstants.NOTIFICATION.NOTIFICATION_TEMPLATES.id,
                    label: '模板管理',
                    onClick: () =>
                        navigate(RouteConstants.NOTIFICATION.NOTIFICATION_TEMPLATES.path()),
                },
            ],
        },

    ];

    const generalMenus = [{
        key: 'org',
        label: '组织管理',
        icon: <ApartmentOutlined />,
        children: [
            {
                key: RouteConstants.ORG.MEMBERS.id,
                label: RouteConstants.ORG.MEMBERS.label,
                onClick: () => navigate(RouteConstants.ORG.MEMBERS.path!()),
            },
            {
                key: RouteConstants.ORG.DEPARTMENTS.id,
                label: RouteConstants.ORG.DEPARTMENTS.label,
                onClick: () => navigate(RouteConstants.ORG.DEPARTMENTS.path!()),
            },
            {
                key: RouteConstants.ORG.ORG_STRUCTURE.id,
                label: RouteConstants.ORG.ORG_STRUCTURE.label,
                onClick: () => navigate(RouteConstants.ORG.ORG_STRUCTURE.path()),
            },
            {
                key: RouteConstants.ORG.ROLES.id,
                label: RouteConstants.ORG.ROLES.label,
                onClick: () => navigate(RouteConstants.ORG.ROLES.path()),
            },
        ],
    },
        {
            key: 'dic',
            label: '数据字典',
            icon: <DatabaseOutlined />,
            children: [
                {
                    key: RouteConstants.DIC.DICTIONARIES.id,
                    label: RouteConstants.DIC.DICTIONARIES.label,
                    onClick: () => navigate(RouteConstants.DIC.DICTIONARIES.path!()),
                },
                {
                    key: RouteConstants.DIC.COUNTRIES.id,
                    label: RouteConstants.DIC.COUNTRIES.label,
                    onClick: () => navigate(RouteConstants.DIC.COUNTRIES.path!()),
                },
                {
                    key: RouteConstants.DIC.DISTRICTS.id,
                    label: RouteConstants.DIC.DISTRICTS.label,
                    onClick: () => navigate(RouteConstants.DIC.DISTRICTS.path!()),
                },
            ],
        },
        {
            key: 'sys',
            label: '系统管理',
            icon: <DesktopOutlined />,
            children: [
                {
                    key: RouteConstants.BOSS.PERM.FUNCTIONAL_RESOURCES.id,
                    label: RouteConstants.BOSS.PERM.FUNCTIONAL_RESOURCES.label,
                    onClick: () => navigate(RouteConstants.BOSS.PERM.FUNCTIONAL_RESOURCES.path!()),
                },
                {
                    key: RouteConstants.BASE.CODE_FORMAT_RULES,
                    label: RouteConstants.BASE.CODE_FORMAT_RULES.label,
                    onClick: () => navigate(RouteConstants.BASE.CODE_FORMAT_RULES.path!()),
                },
                {
                    key: RouteConstants.LOG.OPERATION_LOGS.id,
                    label: RouteConstants.LOG.OPERATION_LOGS.label,
                    onClick: () => navigate(RouteConstants.LOG.OPERATION_LOGS.path!()),
                },
            ],
        }];

    return { appMenus, generalMenus };
};