import { ALARM_LEVEL, ASSETS_STATES, DEAL_STATUS } from './enums';

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
