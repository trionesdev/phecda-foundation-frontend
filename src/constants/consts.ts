import {
    ALARM_LEVEL,
    ASSETS_STATES,
    DEAL_STATUS,
    OPERATOR,
    SCENE_ACTION,
    SCENE_CONDITION_TYPE,
    SCENE_EVENT_TYPE,
} from './enums';

export const AssetsStatesConfig = {
    [ASSETS_STATES.SCRAPPED]: '报废',
    [ASSETS_STATES.SHUTDOWN]: '停用',
    [ASSETS_STATES.SHUTDOWN_FOR_REPAIR]: '停机维修',
    [ASSETS_STATES.OPERATION_WITH_FAULTS]: '带病运行',
    [ASSETS_STATES.NORMAL_OPERATION]: '正常运行',
};
export const AssetsStatesOptions = [
    {
        label: '报废',
        value: ASSETS_STATES.SCRAPPED,
    },
    {
        label: '停用',
        value: ASSETS_STATES.SHUTDOWN,
    },
    {
        label: '停机维修',
        value: ASSETS_STATES.SHUTDOWN_FOR_REPAIR,
    },
    {
        label: '带病运行',
        value: ASSETS_STATES.OPERATION_WITH_FAULTS,
    },
    {
        label: '正常运行',
        value: ASSETS_STATES.NORMAL_OPERATION,
    },
];

export const AlarmLevelConfig = {
    [ALARM_LEVEL.FIRST_LEVEL]: '紧急',
    [ALARM_LEVEL.SECOND_LEVEL]: '重要',
    [ALARM_LEVEL.THIRD_LEVEL]: '一般',
};

export const DealStatusConfig = {
    [DEAL_STATUS.PROCESSED]: '已处理',
    [DEAL_STATUS.FALSE_ALARM]: '误报警',
    [DEAL_STATUS.PENDING]: '待处理',
};

export const DealStatusOptions = [
    {
        label: '已处理',
        value: DEAL_STATUS.PROCESSED,
    },
    {
        label: '误报警',
        value: DEAL_STATUS.FALSE_ALARM,
    },
    {
        label: '待处理',
        value: DEAL_STATUS.PENDING,
    },
];

export const SceneEventOptions = [
    {
        label: '物模型属性上报',
        value: SCENE_EVENT_TYPE.THING_MODEL_PROPERTY_EXPORT,
    },
];

export const SceneConditionOptions = [
    {
        label: '物模型属性上报',
        value: SCENE_CONDITION_TYPE.THING_MODEL_PROPERTY,
    },
];

export const operatorOptions = [
    {
        label: '=',
        value: OPERATOR.EQUAL_TO,
    },
    {
        label: '>',
        value: OPERATOR.GREATER_THAN,
    },
    {
        label: '>=',
        value: OPERATOR.GREATER_THAN_OR_EQUAL_TO,
    },
    {
        label: '<',
        value: OPERATOR.LESS_THAN,
    },
    {
        label: '<=',
        value: OPERATOR.LESS_THAN_OR_EQUAL_TO,
    },
    {
        label: '闭区间[a,b]',
        value: OPERATOR.CLOSED_INTERVAL,
    },
    {
        label: '开区间[a,b]',
        value: OPERATOR.OPEN_INTERVAL,
    },
];

export const sceneActionOptions = [
    {
        label: '设备告警',
        value: SCENE_ACTION.ALARM,
    },
];
