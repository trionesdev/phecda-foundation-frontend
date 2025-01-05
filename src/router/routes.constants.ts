import { RouteObject } from "@trionesdev/commons-react";

export namespace RouteConstants {
    const baseConfig = {
        anonymous: false,
    } as RouteObject;

    export const ACCOUNT = {
        SIGN_IN: {
            id: 'sign-in',
            path: () => "/sign-in",
            anonymous: true,
        } as RouteObject,
    }

    export const DASHBOARD = {
        id: 'home',
        path: () => "/",
        label:'首页',
        anonymous: true,
    }

    export const DEVICE = {
        PRODUCTS: {
            ...baseConfig,
            id: 'products',
            label:'产品',
            path: () => `/device-management/products`
        },
        PRODUCT_DETAIL: {
            ...baseConfig,
            id: 'product-detail',
            label:'产品详情',
            path: (id?: string) => `/device-management/products/${id ? id : ':id'}/detail`,
        },
        PRODUCT_THINGS_MODEL_DRAFT: {
            ...baseConfig,
            id: 'products-things-model-draft',
            label:'物模型',
            path: (id?: string) => `/device-management/products/${id ? id : ':id'}/things-model/draft`,
        },
        DEVICES: {
            ...baseConfig,
            id: 'devices',
            label:'设备',
            path: () => `/device-management/devices`
        },
        DEVICE_DETAIL: {
            ...baseConfig,
            id: 'device-detail',
            label:'设备详情',
            path: (id?: string) => `/device-management/devices/${id ? id : ':id'}/detail`,
        },
        DRIVERS: {
            ...baseConfig,
            id: 'drivers',
            label:'驱动',
            path: () => `/device-management/drivers`
        },
    }

    export const MESSAGE_FORWARDING = {
        MESSAGE_FORWARDING_RULES: {
            id: 'MESSAGE_FORWARDING_RULES',
            label:"业务流转",
            path: () => `/message-forwarding/rules`,
        },
        MESSAGE_SOURCE_DETAIL: {
            id: 'MESSAGE_SOURCE_DETAIL',
            label:'数据源详情',
            path: (id?: string) => `/message-forwarding/sources/${id ? id : `:id`}`,
        },
        MESSAGE_FORWARDING_RULE_DETAIL: {
            id: 'MESSAGE_FORWARDING_RULE_DETAIL',
            label:'规则详情',
            path: (id?: string) => `/message-forwarding/rules/${id ? id : `:id`}`,
        },
    }

    export const MONITORING_OPERATION = {
        LINKAGE: {
            id: 'event-response',
            label:'事件响应',
            path: () => `/monitoring-operations/linkage`,
        }, //事件响应
        SCENE_DETAIL: {
            id: 'scene-detail',
            label:'场景详情',
            path: (id?: string) =>
                `/monitoring-operations/event-response/${
                    id ? id : ':id'
                }/scene-detail`,
        }, //场景详情
    }

    export const ALARM = {
        ALARM_TYPES: {
            id: 'alarm-types',
            label:'告警类型',
            path: () => `/alarm-management/alarm-types`,
        },
        ALARM_LEVELS: {
            id: 'alarm-levels',
            label:'告警级别',
            path: () => `/alarm-management/alarm-levels`,
        },
        ALARMS: { id: 'alarms',
            label:'告警列表',
            path: () => `/alarm-management/alarms` },
    }

    export const NOTIFICATION = {
        NOTIFICATION_CONTACTS: {
            id: 'contacts',
            label:'联系人',
            path: () => `/notification/contacts`,
        },
        NOTIFICATION_TEMPLATES: {
            id: 'templates',
            label:'通知模版',
            path: () => `/notification/templates`,
        },
    }

    export const USER_CENTER = {
        PROFILE: {
            ...baseConfig,
            id: 'user-profile',
            label: '个人信息',
            path: () => "/user-center/profile",
        },
        PASSWORD: {
            ...baseConfig,
            id: 'user-password',
            label: '修改密码',
            path: () => "/user-center/password",
        }
    }

    export const ORG = {
        DEPARTMENTS: {
            ...baseConfig,
            id: 'departments',
            label: '部门管理',
            path: () => "/org/departments",
        } as RouteObject,
        ORG_STRUCTURE: {
            ...baseConfig,
            id: 'org-structure',
            label: '组织架构',
            path: () => "/org/structure",
        },
        MEMBERS: {
            ...baseConfig,
            id: 'org-members',
            label: '成员管理',
            path: () => "/org/members",
        },
        ROLES: {
            ...baseConfig,
            id: 'roles',
            label: '角色管理',
            path: () => "/org/roles",
        }
    }

    export const DIC = {
        DICTIONARIES: {
            ...baseConfig,
            id: 'dictionaries',
            label: '字典管理',
            path: () => "/dic/dictionaries",
        } as RouteObject,
        DISTRICTS: {
            ...baseConfig,
            id: 'districts',
            label: '地区管理',
            path: () => "/dic/districts",
        } as RouteObject,
        COUNTRIES: {
            ...baseConfig,
            id: 'countries',
            label: '国家管理',
            path: () => "/dic/countries",
        }
    }


    export const LOG = {
        OPERATION_LOGS: {
            ...baseConfig,
            id: 'operation-log',
            label: '操作日志',
            path: () => "/log/operation-logs",
        } as RouteObject,
    }


    export const BASE = {
        CODE_FORMAT_RULES:{
            ...baseConfig,
            id: 'code-format-rules',
            label: '编码规则',
            path: () => "/base/code-format-rules",
        }
    }

    export namespace BOSS {
        export const PERM = {
            FUNCTIONAL_RESOURCES: {
                ...baseConfig,
                id: 'functional-resources',
                label: '功能资源',
                path: () => "/boss/perm/functional-resources",
            } as RouteObject,
        }
    }


}