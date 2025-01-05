import {RouteConstants} from './routes.constants';
import {SignInPage} from "@/app/account/sign-in/page.tsx";
import {createHashRouter, RouteObject, RouterProvider} from "@trionesdev/commons-react";
import {AppLayout} from "@/app/layout";
import {UserCenterLayout} from "@/app/user-center/UserCenterLayout.tsx";
import {UserProfilePage} from "@/app/user-center/profile/page.tsx";
import {ChangePasswordPage} from "@/app/user-center/change-password/page.tsx";
import {NormalLayout} from "@/app/normal/layout";
import { DepartmentsPage } from '@/app/normal/org/departments/page';
import {OrgStructurePage} from "@/app/normal/org/org-structure/page.tsx";
import {TenantMembersPage} from "@/app/normal/org/members/page.tsx";
import {RolesPage} from "@/app/normal/org/roles/page.tsx";
import {FunctionalResourcesPage} from "@/app/boss/perm/functional-resources/page.tsx";
import {DictionariesPage} from "@/app/boss/dic/dictionaries/page.tsx";
import {DistrictsPage} from "@/app/boss/dic/districts/page.tsx";
import {CountriesPage} from "@/app/boss/dic/countries/page.tsx";
import {OperationLogsPage} from "@/app/normal/log/operation/page.tsx";
import {CodeFormatRulesPage} from "@/app/normal/base/code-format-rules/page.tsx";
import {DashboardPage} from "@app/normal/dashboard/page.tsx";
import {ProductsPage} from "@app/normal/device/products/page.tsx";
import {ProductDetailPage} from "@app/normal/device/product-detail/page.tsx";
import {DriversPage} from "@app/normal/device/drivers/page.tsx";
import {DevicesPage} from "@app/normal/device/devices/page.tsx";
import {ForwardingRulePage} from "@app/normal/message-forwarding/rule/page.tsx";
import {ForwardingRuleDetailPage} from "@app/normal/message-forwarding/rule-detail/page.tsx";
import {MessageSourceDetailPage} from "@app/normal/message-forwarding/source-detail/page.tsx";
import {LinkagesPage} from "@app/normal/linkage/linkages/page.tsx";
import {SceneDetailPage} from "@app/normal/linkage/scene-detail/page.tsx";
import {AlarmsPage} from "@app/normal/alarm/alarms/page.tsx";
import {AlarmTypesPage} from "@app/normal/alarm/alarm-types/page.tsx";
import {AlarmLevelsPage} from "@app/normal/alarm/alarm-levels/page.tsx";
import {ContactPage} from "@app/normal/notification/contact/page.tsx";
import {NotificationTemplatesPage} from "@app/normal/notification/templates/page.tsx";
import {DeviceDetailPage} from "@app/normal/device/device-detail/page.tsx";
import ProductThingModelDraftPage from "@app/normal/device/product-things-model-draft/page.tsx";

export const routes: RouteObject[] = [
    {...RouteConstants.ACCOUNT.SIGN_IN, element: <SignInPage/>},

    {
        path: () => '/', anonymous: false, element: <AppLayout/>, children: [
            {
                path: () => '/user-center', anonymous: false, element: <UserCenterLayout/>, children: [
                    {...RouteConstants.USER_CENTER.PROFILE, element: <UserProfilePage/>},
                    {...RouteConstants.USER_CENTER.PASSWORD, element: <ChangePasswordPage/>},
                ]
            },
            {
                path: () => '/', anonymous: false, element: <NormalLayout/>, children: [
                    {
                        ...RouteConstants.DASHBOARD, element: <DashboardPage/>
                    },

                    {...RouteConstants.DEVICE.PRODUCTS,element: <ProductsPage/>},
                    {...RouteConstants.DEVICE.PRODUCT_DETAIL,element: <ProductDetailPage/>},
                    {...RouteConstants.DEVICE.PRODUCT_THINGS_MODEL_DRAFT,element: <ProductThingModelDraftPage/>},
                    {...RouteConstants.DEVICE.DEVICES,element: <DevicesPage/>},
                    {...RouteConstants.DEVICE.DEVICE_DETAIL,element: <DeviceDetailPage/>},
                    {...RouteConstants.DEVICE.DRIVERS,element: <DriversPage/>},

                    {...RouteConstants.MESSAGE_FORWARDING.MESSAGE_FORWARDING_RULES,element: <ForwardingRulePage/>},
                    {...RouteConstants.MESSAGE_FORWARDING.MESSAGE_FORWARDING_RULE_DETAIL,element: <ForwardingRuleDetailPage/>},
                    {...RouteConstants.MESSAGE_FORWARDING.MESSAGE_SOURCE_DETAIL,element: <MessageSourceDetailPage/>},

                    {...RouteConstants.MONITORING_OPERATION.LINKAGE,element: <LinkagesPage/>},
                    {...RouteConstants.MONITORING_OPERATION.SCENE_DETAIL,element: <SceneDetailPage/>},

                    {...RouteConstants.ALARM.ALARMS,element: <AlarmsPage/>},
                    {...RouteConstants.ALARM.ALARM_TYPES,element: <AlarmTypesPage/>},
                    {...RouteConstants.ALARM.ALARM_LEVELS,element: <AlarmLevelsPage/>},

                    {...RouteConstants.NOTIFICATION.NOTIFICATION_CONTACTS,element: <ContactPage/>},
                    {...RouteConstants.NOTIFICATION.NOTIFICATION_TEMPLATES,element: <NotificationTemplatesPage/>},

                    {...RouteConstants.ORG.DEPARTMENTS, element: <DepartmentsPage/>},
                    {...RouteConstants.ORG.ORG_STRUCTURE, element: <OrgStructurePage/>},
                    {...RouteConstants.ORG.MEMBERS, element: <TenantMembersPage/>},
                    {...RouteConstants.ORG.ROLES, element: <RolesPage/>},

                    {...RouteConstants.DIC.DICTIONARIES, element: <DictionariesPage/>},
                    {...RouteConstants.DIC.DISTRICTS, element: <DistrictsPage/>},
                    {...RouteConstants.DIC.COUNTRIES, element: <CountriesPage/>},

                    {...RouteConstants.LOG.OPERATION_LOGS, element: <OperationLogsPage/>},
                    {...RouteConstants.BASE.CODE_FORMAT_RULES, element: <CodeFormatRulesPage/>},

                    {...RouteConstants.BOSS.PERM.FUNCTIONAL_RESOURCES, element: <FunctionalResourcesPage/>},
                ]
            },
        ]
    },


];

// 生成路由

export const routeMatch = (id: string): RouteObject | undefined => {
    const match = (id: string, routes: RouteObject[]): RouteObject | undefined => {
        for (let i = 0; i < routes.length; i++) {
            if (routes[i].id === id) {
                return routes[i]
            }
            const children = routes[i].children
            if (children) {
                const result = match(id, children)
                if (result) {
                    return result
                }
            }
        }
    }
    return match(id, routes)
}

export const AppRouter = () => {
    return <RouterProvider router={createHashRouter(routes)}/>;
};