type RoutesConstantsProps = {
    [key: string]: { key: string; path: (text?: string) => string }
}
export const RoutesConstants: RoutesConstantsProps = {
    /** --------告警管理------- */
    ALARM_RULES: {
        key: 'ALARM_RULES',
        path: () => `/alarm-rules`,
    }, //告警规则配置
    ALARM_LOG: {
        key: 'ALARM_LOG',
        path: () => `/alarm-log`,
    }, //告警日志
    DEVICE_DATA: {
        key: 'DEVICE_DATA',
        path: () => `/device-data`,
    }, //设备数据
    MONITOR_TRENDS: {
        key: 'MONITOR_TRENDS',
        path: () => `/monitor-trends`,
    }, //监控趋势
    MONITOR_VIEW: {
        key: 'MONITOR_VIEW',
        path: () => `/monitor-view`,
    }, //监控画面

    /** --------资产管理------- */
    PRODUCTION_DEVICE: {
        key: 'PRODUCTION_DEVICE',
        path: () => `/production-device`,
    }, //生产设备
    PRODUCTION_DEVICE_TYPE: {
        key: 'PRODUCTION_DEVICE_TYPE',
        path: () => `/production-device-type`,
    }, //生产设备类型
    ACCESSORY_TYPE: {
        key: 'ACCESSORY_TYPE',
        path: () => `/accessory-type`,
    }, //配件类型

    /** -------设备管理-------- */
    PRODUCTS: { key: 'PRODUCTS', path: () => `/products` },
    PRODUCT_DETAIL: {
        key: 'PRODUCT_DETAIL',
        path: (id?: string) => `/products/${id ? id : ':id'}/detail`,
    },
    PRODUCT_THINGS_MODEL_DRAFT: {
        key: 'PRODUCT_THINGS_MODEL_DRAFT',
        path: (id?: string) =>
            `/products/${id ? id : ':id'}/things-model/draft`,
    },
    DEVICES: { key: 'DEVICES', path: () => `/devices` },
    DEVICE_DETAIL: {
        key: 'DEVICE_DETAIL',
        path: (id?: string) => `/devices/${id ? id : ':id'}/detail`,
    },
}
