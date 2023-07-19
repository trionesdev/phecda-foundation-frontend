/**
 * 设备状态（资产）
 */
export enum ASSETS_STATES {
    /**报废 */
    SCRAPPED = 'SCRAPPED',
    /**停用 */
    SHUTDOWN = 'SHUTDOWN',
    /** 停机维修 */
    SHUTDOWN_FOR_REPAIR = 'SHUTDOWN_FOR_REPAIR',
    /** 带病运行 */
    OPERATION_WITH_FAULTS = 'OPERATION_WITH_FAULTS',
    /** 正常运行 */
    NORMAL_OPERATION = 'NORMAL_OPERATION',
}

/** 报警图片类型 */
export enum ALARM_IMAGE_TYPE {
    /**报警图片 */
    ALARM = 'ALARM',
    /** 处理图片 */
    DEAL = 'DEAL',
}

/** 报警状态 */
export enum DEAL_STATUS {
    /**已处理 */
    PROCESSED = 'PROCESSED',
    /** 误报警 */
    FALSE_ALARM = 'FALSE_ALARM',
    /** 待处理 */
    PENDING = 'PENDING',
}

/** 报警等级 */
export enum ALARM_LEVEL {
    /**紧急 */
    FIRST_LEVEL = 'FIRST_LEVEL',
    /** 重要 */
    SECOND_LEVEL = 'SECOND_LEVEL',
    /** 一般 */
    THIRD_LEVEL = 'THIRD_LEVEL',
}

/** 场景事件类型 */
export enum SCENE_EVENT_TYPE {
    /** 物模型属性上报 */
    THING_MODEL_PROPERTY_EXPORT = 'THING_MODEL_PROPERTY_EXPORT',
}

/** 运算符 */
export enum OPERATOR {
    /** 等于 */
    EQUAL_TO = 'EQUAL_TO',
    /** 大于 */
    GREATER_THAN = 'GREATER_THAN',
    /** 大于等于 */
    GREATER_THAN_OR_EQUAL_TO = 'GREATER_THAN_OR_EQUAL_TO',
    /**小于 */
    LESS_THAN = 'LESS_THAN',
    /** 小于等于*/
    LESS_THAN_OR_EQUAL_TO = 'LESS_THAN_OR_EQUAL_TO',
    /**闭区间[a,b] */
    CLOSED_INTERVAL = 'CLOSED_INTERVAL',
    /** 开区间(a,b)*/
    OPEN_INTERVAL = 'OPEN_INTERVAL',
}

/** 场景动作 */
export enum SCENE_ACTION {
    ALARM = 'ALARM',
}
