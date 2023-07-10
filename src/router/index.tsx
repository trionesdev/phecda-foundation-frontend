import React, { lazy, Suspense } from 'react';
import { useRoutes, RouteObject } from 'react-router-dom';
import SignInView from '../views/account/sign-in';
import MainLayoutView from '../views/layout';
import ProductsView from '../views/product/products';
import ProductDetailView from '../views/product/product-detail';
import { RoutesConstants } from './routes.constants';
import ProductThingsModelDraftView from '../views/product/product-things-model-draft';
import DevicesView from '../views/device/devices';
import DeviceDetailView from '../views/device/device-detail';
import ProductionDevice from '../views/assets/production-device';
import AccessoryType from '../views/assets/accessory-type';
import ProductionDeviceType from '../views/assets/production-device-type';
import AlarmLog from 'src/views/alarm/alarm-log';
import AlarmRules from 'src/views/alarm/alarm-rules';
import MonitorTrends from 'src/views/alarm/monitor-trends';
import DeviceData from 'src/views/alarm/device-data';
import MonitorView from 'src/views/alarm/monitor-view';
import ProductionDeviceDetail from '@/views/assets/production-device/detail';
import Dictionary from '@/views/system-setting/dictionary';
import DictionaryType from '@/views/system-setting/dictionary-type';
import EventResponse from '@/views/monitoring-operations/event-response';
import SceneDetail from '@/views/monitoring-operations/event-response/detail';

export const routes: RouteObject[] = [
    { path: '/sign-in', element: <SignInView /> },
    {
        path: '/',
        element: <MainLayoutView />,
        children: [
            //------告警管理-----
            {
                path: RoutesConstants.ALARM_RULES.path(),
                element: <AlarmRules />, //告警配置
            },
            {
                path: RoutesConstants.ALARM_LOG.path(),
                element: <AlarmLog />, //告警日志
            },
            {
                path: RoutesConstants.MONITOR_TRENDS.path(),
                element: <MonitorTrends />, //监控趋势
            },
            {
                path: RoutesConstants.DEVICE_DATA.path(),
                element: <DeviceData />, //设备数据
            },
            {
                path: RoutesConstants.MONITOR_VIEW.path(),
                element: <MonitorView />, //监控画面
            },
            //------资产管理-----
            {
                path: RoutesConstants.PRODUCTION_DEVICE.path(),
                element: <ProductionDevice />, //生产设备
            },
            {
                path: RoutesConstants.PRODUCTION_DEVICE_DETAIL.path(),
                element: <ProductionDeviceDetail />, //生产设备详情
            },
            {
                path: RoutesConstants.PRODUCTION_DEVICE_TYPE.path(),
                element: <ProductionDeviceType />, //生产设备类型
            },
            {
                path: RoutesConstants.ACCESSORY_TYPE.path(),
                element: <AccessoryType />, //配件类型
            },
            //------设备管理-----
            {
                path: RoutesConstants.PRODUCTS.path(),
                element: <ProductsView />,
            },
            {
                path: RoutesConstants.PRODUCT_DETAIL.path(),
                element: <ProductDetailView />,
            },
            {
                path: RoutesConstants.PRODUCT_THINGS_MODEL_DRAFT.path(),
                element: <ProductThingsModelDraftView />,
            },
            { path: RoutesConstants.DEVICES.path(), element: <DevicesView /> },
            {
                path: RoutesConstants.DEVICE_DETAIL.path(),
                element: <DeviceDetailView />,
            },
            //------监控运维------
            {
                path: RoutesConstants.MONITORING_OPERATIONS.path(),
                element: <EventResponse />, //事件响应
            },
            {
                path: RoutesConstants.SCENE_DETAIL.path(),
                element: <SceneDetail />, //场景详情
            },
            //------系统设置------
            {
                path: RoutesConstants.DICTIONARY_TYPE.path(),
                element: <DictionaryType />, //字典类型
            },
            {
                path: RoutesConstants.DICTIONARY.path(),
                element: <Dictionary />, //字典
            },
        ],
    },
];

// 生成路由
const AppRoutes = () => {
    return useRoutes(routes);
};

export default AppRoutes;
