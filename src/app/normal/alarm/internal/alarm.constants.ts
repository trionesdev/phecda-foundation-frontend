import { ALARM_STATUS, ALARM_TRIGGER_MODE } from './alarm.enums';

export const AlarmTriggerModeOptions = [
    {
        label: '单次触发',
        value: ALARM_TRIGGER_MODE.SINGLE,
    },
    {
        label: '持续触发',
        value: ALARM_TRIGGER_MODE.CONTINUOUS,
    },
];

export const AlarmStatusOptions = [
    {
        label: '未处理',
        value: ALARM_STATUS.UN_PROCESSED,
    },
    {
        label: '误报',
        value: ALARM_STATUS.MISREPORT,
    },
    {
        label: '已处理',
        value: ALARM_STATUS.PROCESSED,
    },
];
