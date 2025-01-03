type RoutesConstantsProps = {
    [key: string]: { key: string; path: (text?: string) => string };
};
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
