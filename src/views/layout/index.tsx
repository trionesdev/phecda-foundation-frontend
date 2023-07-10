import { AppToolbar, HPanel, VPanel } from '@moensun/antd-react-ext'
import { Menu, MenuProps } from 'antd'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import styles from './layout.module.less'
import { RoutesConstants } from '../../router/routes.constants'
import { useEffect, useState } from 'react'

const MainLayoutView = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const [selectedKeys, setSelectedKeys] = useState<any[]>([])
    const [openKeys, setOpenKeys] = useState<any[]>([])
    const menuItems: MenuProps['items'] = [
        {
            key: 'alarm-management',
            label: '告警管理',
            children: [
                {
                    key: RoutesConstants.ALARM_RULES.key,
                    label: `告警配置`,
                    onClick: () => navigate(RoutesConstants.ALARM_RULES.path()),
                },
                {
                    key: RoutesConstants.ALARM_LOG.key,
                    label: '告警日志',
                    onClick: () => navigate(RoutesConstants.ALARM_LOG.path()),
                },
                {
                    key: RoutesConstants.MONITOR_TRENDS.key,
                    label: `监控趋势`,
                    onClick: () =>
                        navigate(RoutesConstants.MONITOR_TRENDS.path()),
                },
                {
                    key: RoutesConstants.DEVICE_DATA.key,
                    label: `设备数据`,
                    onClick: () => navigate(RoutesConstants.DEVICE_DATA.path()),
                },
                {
                    key: RoutesConstants.MONITOR_VIEW.key,
                    label: `监控画面`,
                    onClick: () =>
                        navigate(RoutesConstants.MONITOR_VIEW.path()),
                },
            ],
        },
        {
            key: 'assets-management',
            label: '资产管理',
            children: [
                {
                    key: RoutesConstants.PRODUCTION_DEVICE.key,
                    label: '生产设备',
                    onClick: () =>
                        navigate(RoutesConstants.PRODUCTION_DEVICE.path()),
                },
                // 因为采用字典方式，暂不需要
                // {
                //     key: RoutesConstants.PRODUCTION_DEVICE_TYPE.key,
                //     label: `生产设备类型`,
                //     onClick: () =>
                //         navigate(RoutesConstants.PRODUCTION_DEVICE_TYPE.path()),
                // },
                {
                    key: RoutesConstants.ACCESSORY_TYPE.key,
                    label: `配件类型`,
                    onClick: () =>
                        navigate(RoutesConstants.ACCESSORY_TYPE.path()),
                },
            ],
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
            key: 'monitoring-operations',
            label: '监控运维',
            children: [
                {
                    key: RoutesConstants.MONITORING_OPERATIONS.key,
                    label: `事件响应`,
                    onClick: () =>
                        navigate(RoutesConstants.MONITORING_OPERATIONS.path()),
                },
            ],
        },
        {
            key: 'system-setting',
            label: '系统设置',
            children: [
                {
                    key: RoutesConstants.DICTIONARY_TYPE.key,
                    label: `字典类型`,
                    onClick: () =>
                        navigate(RoutesConstants.DICTIONARY_TYPE.path()),
                },
            ],
        },
    ]

    const onOpenChange: MenuProps['onOpenChange'] = (keys) => {
        const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1)
        setOpenKeys(latestOpenKey ? [latestOpenKey] : [])
    }

    useEffect(() => {
        if (location && location.pathname) {
            const keyArr = location.pathname.split('/')
            setOpenKeys([keyArr?.[1]])
            setSelectedKeys([keyArr?.[2]])
        }
    }, [location])
    const appBar = <AppToolbar title={`物联网`} />
    const sider = (
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
    )
    return (
        <VPanel className={styles.layoutView} header={appBar}>
            <HPanel className={styles.layoutViewContent} left={sider}>
                <Outlet />
            </HPanel>
        </VPanel>
    )
}
export default MainLayoutView
