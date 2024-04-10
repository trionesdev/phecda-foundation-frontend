import React from 'react';
import {
    createHashRouter,
    RouteObject,
    RouterProvider,
} from 'react-router-dom';
import MainLayoutView from '../app/layout';
import { RoutesConstants } from './routes.constants';
import MonitorView from 'src/views/alarm/monitor-view';
import NodeDetailView from '@/app/(normal)/edge/node-detail';
import { EdgeNodePage } from '@/app/(normal)/edge/node/page';
import { DashboardPage } from '@/app/(normal)/dashboard/page';
import { AlarmTypesPage } from '@/app/(normal)/(alarm)/alarm-types/page';
import { AlarmLevelsPage } from '@/app/(normal)/(alarm)/alarm-levels/page';
import { AlarmsPage } from '@/app/(normal)/(alarm)/alarms/page';
import { ContactPage } from '@/app/(normal)/(notification)/contact/page';
import { CoreLayoutView } from '@/app/layout/CoreLayoutView';
import ProductsView from '@/app/(normal)/(product)/products';
import { ProductDetailPage } from '@/app/(normal)/(product)/product-detail/page';
import { DevicesPage } from '@/app/(normal)/(device)/devices/page';
import DeviceDetailView from '@/app/(normal)/(device)/device-detail';
import SceneDetail from '@/app/(normal)/(monitoring-operations)/linkage/detail';
import { ForwardingRulePage } from '@/app/(normal)/(message-forwarding)/rule/page';
import { MessageSourceDetailPage } from '@/app/(normal)/(message-forwarding)/source-detail/page';
import { ForwardingRuleDetailPage } from '@/app/(normal)/(message-forwarding)/rule-detail/page';
import { LinkagePage } from '@/app/(normal)/(monitoring-operations)/linkage/page';
import ProductThingsModelDraft from '@/app/(normal)/(product)/product-things-model-draft';
import { NotificationTemplatesPage } from '@/app/(normal)/(notification)/templates/page';

export const routes: RouteObject[] = [
    {
        path: '/',
        element: <MainLayoutView />,
        children: [
            {
                path: '/',
                element: <CoreLayoutView />,
                children: [
                    {
                        index: true,
                        // path: RoutesConstants.PRODUCTS.path(),
                        element: <DashboardPage />,
                    },
                    {
                        path: RoutesConstants.ALARM_TYPES.path(),
                        element: <AlarmTypesPage />,
                    },
                    {
                        path: RoutesConstants.ALARM_LEVELS.path(),
                        element: <AlarmLevelsPage />,
                    },
                    {
                        path: RoutesConstants.ALARMS.path(),
                        element: <AlarmsPage />,
                    },

                    {
                        path: RoutesConstants.NOTIFICATION_CONTACTS.path(),
                        element: <ContactPage />,
                    },
                    {
                        path: RoutesConstants.NOTIFICATION_TEMPLATES.path(),
                        element: <NotificationTemplatesPage />,
                    },

                    // //------告警管理-----
                    // {
                    //     path: RoutesConstants.ALARM_RULES.path(),
                    //     element: <AlarmRules />, //告警配置
                    // },
                    // {
                    //     path: RoutesConstants.ALARM_LOG.path(),
                    //     element: <AlarmLog />, //告警日志
                    // },
                    // {
                    //     path: RoutesConstants.MONITOR_TRENDS.path(),
                    //     element: <MonitorTrends />, //监控趋势
                    // },
                    // {
                    //     path: RoutesConstants.DEVICE_DATA.path(),
                    //     element: <DeviceData />, //设备数据
                    // },
                    {
                        path: RoutesConstants.MONITOR_VIEW.path(),
                        element: <MonitorView />, //监控画面
                    },

                    //------设备管理-----
                    // {
                    //     element: <ProductsView />,
                    // },
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
                        element: <ProductThingsModelDraft />,
                    },
                    {
                        path: RoutesConstants.DEVICES.path(),
                        element: <DevicesPage />,
                    },
                    {
                        path: RoutesConstants.DEVICE_DETAIL.path(),
                        element: <DeviceDetailView />,
                    },
                    //------监控运维------
                    {
                        path: RoutesConstants.LINKAGE.path(),
                        element: <LinkagePage />, //事件响应
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
                    //region 消息流转
                    {
                        path: RoutesConstants.MESSAGE_FORWARDING_RULES.path(),
                        element: <ForwardingRulePage />,
                    },
                    {
                        path: RoutesConstants.MESSAGE_SOURCE_DETAIL.path(),
                        element: <MessageSourceDetailPage />,
                    },
                    {
                        path: RoutesConstants.MESSAGE_FORWARDING_RULE_DETAIL.path(),
                        element: <ForwardingRuleDetailPage />,
                    },
                    //endregion
                ],
            },
        ],
    },
];

// 生成路由

export const AppRouter = () => {
    return <RouterProvider router={createHashRouter(routes)} />;
};
