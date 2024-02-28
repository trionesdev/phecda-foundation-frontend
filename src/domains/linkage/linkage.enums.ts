export enum LINKAGE_SCENE_EVENT_TYPE {
    /** 物模型属性上报 */
    THING_PROPERTY_REPORT = 'THING_PROPERTY_REPORT',
}

export enum STATE_CONDITION_TYPE {
    THING_PROPERTY_VALUE = 'THING_PROPERTY_VALUE',
}

/** 运算符 */
export enum OPERATOR {
    /** 等于 */
    EQUAL_TO = 'EQ',
    /** 大于 */
    GREATER_THAN = 'GT',
    /** 大于等于 */
    GREATER_THAN_OR_EQUAL_TO = 'GE',
    /**小于 */
    LESS_THAN = 'LT',
    /** 小于等于*/
    LESS_THAN_OR_EQUAL_TO = 'LE',
    /**闭区间[a,b] */
    RANGE_CLOSED = 'RANGE_CLOSED',
    /** 开区间(a,b)*/
    RANGE_OPEN = 'RANGE_OPEN',
}

export enum ACTION_TYPE {
    MESSAGE = 'MESSAGE',
}
