type RoutesConstantsProps = {
    [key: string]: { key: string; path: (text?: string) => string };
};
/**
 * @description
 *  注意：key的名字要与path路径中的名称相对应，才能保证菜单栏的menu准确显示展开状态(src/views/layout/index.tsx:119)
 */
export const RoutesConstants = {
    /** --------告警管理------- */
    ALARM_RULES: {
        key: 'alarm-rules',
        path: () => `/alarm-management/alarm-rules`,
    }, //告警规则配置
    ALARM_LOG: {
        key: 'alarm-log',
        path: () => `/alarm-management/alarm-log`,
    }, //告警日志
    DEVICE_DATA: {
        key: 'device-data',
        path: () => `/alarm-management/device-data`,
    }, //设备数据
    MONITOR_TRENDS: {
        key: 'monitor-trends',
        path: () => `/alarm-management/monitor-trends`,
    }, //监控趋势
    MONITOR_VIEW: {
        key: 'monitor-view',
        path: () => `/alarm-management/monitor-view`,
    }, //监控画面

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
    /** ---监控运维---- */

    MONITORING_OPERATIONS: {
        key: 'event-response',
        path: () => `/monitoring-operations/event-response`,
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
