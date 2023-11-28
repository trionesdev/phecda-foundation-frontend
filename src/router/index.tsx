import React from 'react';
import {
    createHashRouter,
    RouteObject,
    RouterProvider,
} from 'react-router-dom';
import MainLayoutView from '../app/layout';
import ProductsView from '@/app/(normal)/product/products';
import { RoutesConstants } from './routes.constants';
import ProductThingsModelDraftView from '@/app/(normal)/product/product-things-model-draft';
import DeviceDetailView from '@/app/(normal)/device/device-detail';
import AlarmLog from 'src/views/alarm/alarm-log';
import AlarmRules from 'src/views/alarm/alarm-rules';
import MonitorTrends from 'src/views/alarm/monitor-trends';
import DeviceData from 'src/views/alarm/device-data';
import MonitorView from 'src/views/alarm/monitor-view';
import EventResponse from '@/views/monitoring-operations/event-response';
import SceneDetail from '@/views/monitoring-operations/event-response/detail';
import NodeDetailView from '@/app/(normal)/edge/node-detail';
import { EdgeNodePage } from '@/app/(normal)/edge/node/page';
import { DevicesPage } from '@/app/(normal)/device/devices/page';
import { ProductDetailPage } from '@/app/(normal)/product/product-detail/page';

export const routes: RouteObject[] = [
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
            //------设备管理-----
            {
                index: true,
                element: <ProductsView />,
            },
            {
                path: RoutesConstants.PRODUCTS.path(),
                element: <ProductsView />,
            },
            {
                path: RoutesConstants.PRODUCT_DETAIL.path(),
                element: <ProductDetailPage />,
            },
            {
                path: RoutesConstants.PRODUCT_THINGS_MODEL_DRAFT.path(),
                element: <ProductThingsModelDraftView />,
            },
            { path: RoutesConstants.DEVICES.path(), element: <DevicesPage /> },
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
            //------边缘计算-----
            {
                path: RoutesConstants.EDGE_NODE.path(),
                element: <EdgeNodePage />,
            },
            {
                path: RoutesConstants.EDGE_NODE_DETAIL.path(),
                element: <NodeDetailView />,
            },
        ],
    },
];

// 生成路由

export const AppRouter = () => {
    return <RouterProvider router={createHashRouter(routes)} />;
};
