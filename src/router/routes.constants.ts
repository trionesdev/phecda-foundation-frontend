import { RouteObject } from "@trionesdev/commons-react";

/**
 * @description
 *  注意：key的名字要与path路径中的名称相对应，才能保证菜单栏的menu准确显示展开状态(src/views/layout/index.tsx:119)
 */
export const RoutesConstants = {
    DASHBOARD: {
        key: 'dashboard',
        path: () => `/`,
    },
    /** --------告警管理------- */
    // ALARM_RULES: {
    //     key: 'alarm-rules',
    //     path: () => `/alarm-management/alarm-rules`,
    // }, //告警规则配置
    // ALARM_LOG: {
    //     key: 'alarm-log',
    //     path: () => `/alarm-management/alarm-log`,
    // }, //告警日志
    // DEVICE_DATA: {
    //     key: 'device-data',
    //     path: () => `/alarm-management/device-data`,
    // }, //设备数据

    ALARM_TYPES: {
        key: 'alarm-types',
        path: () => `/alarm-management/alarm-types`,
    },
    ALARM_LEVELS: {
        key: 'alarm-levels',
        path: () => `/alarm-management/alarm-levels`,
    },
    ALARMS: { key: 'alarms', path: () => `/alarm-management/alarms` },

    //region 通知
    NOTIFICATION_CONTACTS: {
        key: 'contacts',
        path: () => `/notification/contacts`,
    },
    NOTIFICATION_TEMPLATES: {
        key: 'templates',
        path: () => `/notification/templates`,
    },
    //endregion

    //region 消息转发
    MESSAGE_FORWARDING_RULES: {
        key: 'MESSAGE_FORWARDING_RULES',
        path: () => `/message-forwarding/rules`,
    },
    MESSAGE_SOURCE_DETAIL: {
        key: 'MESSAGE_SOURCE_DETAIL',
        path: (id?: string) => `/message-forwarding/sources/${id ? id : `:id`}`,
    },
    MESSAGE_FORWARDING_RULE_DETAIL: {
        key: 'MESSAGE_FORWARDING_RULE_DETAIL',
        path: (id?: string) => `/message-forwarding/rules/${id ? id : `:id`}`,
    },
    //endregion
    MONITOR_TRENDS: {
        key: 'monitor-trends',
        path: () => `/alarm-management/monitor-trends`,
    }, //监控趋势

    // /** --------资产管理------- */
    // PRODUCTION_DEVICE: {
    //     key: 'production-device',
    //     path: () => `/assets-management/production-device`,
    // }, //生产设备
    // PRODUCTION_DEVICE_DETAIL: {
    //     key: 'production-device',
    //     path: (id?: string) =>
    //         `/assets-management/production-device/${id ? id : ':id'}/detail`,
    // }, //生产设备详情
    // PRODUCTION_DEVICE_TYPE: {
    //     key: 'production-device-type',
    //     path: () => `/assets-management/production-device-type`,
    // }, //生产设备类型
    // ACCESSORY_TYPE: {
    //     key: 'accessory-type',
    //     path: () => `/assets-management/accessory-type`,
    // }, //配件类型

    /** -------设备管理-------- */
    PRODUCTS: { key: 'products', path: () => `/device-management/products` },
    PRODUCT_DETAIL: {
        key: 'products',
        path: (id?: string) =>
            `/device-management/products/${id ? id : ':id'}/detail`,
    },
    PRODUCT_THINGS_MODEL_DRAFT: {
        key: 'devices',
        path: (id?: string) =>
            `/device-management/products/${id ? id : ':id'}/things-model/draft`,
    },
    DEVICES: { key: 'devices', path: () => `/device-management/devices` },
    DEVICE_DETAIL: {
        key: 'devices',
        path: (id?: string) =>
            `/device-management/devices/${id ? id : ':id'}/detail`,
    },
    DRIVERS: { key: 'drivers', path: () => `/device-management/drivers` },
    /** ---监控运维---- */

    LINKAGE: {
        key: 'event-response',
        path: () => `/monitoring-operations/linkage`,
    }, //事件响应
    SCENE_DETAIL: {
        key: 'event-response',
        path: (id?: string) =>
            `/monitoring-operations/event-response/${
                id ? id : ':id'
            }/scene-detail`,
    }, //场景详情
    /** ---系统设置---- */

    DICTIONARY_TYPE: {
        key: 'dictionary-type',
        path: () => `/system-setting/dictionary-type`,
    }, //字典类型
    DICTIONARY: {
        key: 'dictionary-type',
        path: (id?: string) =>
            `/system-setting/dictionary-type/${id ?? ':id'}/dictionary`,
    }, //字典

    /** ---边缘计算---- */
    EDGE_NODE: {
        key: 'edge-node',
        path: () => `/edge/node`,
    },
    EDGE_NODE_DETAIL: {
        key: 'edge-node-detail',
        path: (id?: string) => `/edge/node/${id ? id : ':id'}/detail`,
    },
};

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
        path: () => "/dashboard",
        label:'首页',
        anonymous: true,
    }

    export const DEVICE = {
        PRODUCTS: {
            ...baseConfig,
            id: 'products',
            label:'产品',
            path: () => `/device-management/products` },
        PRODUCT_DETAIL: {
            ...baseConfig,
            id: 'product-detail',
            label:'产品详情',
            path: (id?: string) =>
                `/device-management/products/${id ? id : ':id'}/detail`,
        },
        PRODUCT_THINGS_MODEL_DRAFT: {
            ...baseConfig,
            id: 'devices',
            label:'物模型',
            path: (id?: string) =>
                `/device-management/products/${id ? id : ':id'}/things-model/draft`,
        },
        DEVICES: {...baseConfig, id: 'devices',label:'设备', path: () => `/device-management/devices` },
        DEVICE_DETAIL: {
            ...baseConfig,
            id: 'device-detail',
            label:'设备详情',
            path: (id?: string) =>
                `/device-management/devices/${id ? id : ':id'}/detail`,
        },
        DRIVERS: { ...baseConfig,id: 'drivers',
            label:'驱动', path: () => `/device-management/drivers` },
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