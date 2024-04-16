import {
    ACTION_TYPE,
    CHANNEL_TYPE,
    CONTACTS_TYPE,
    LINKAGE_SCENE_EVENT_TYPE,
    OPERATOR,
    STATE_CONDITION_TYPE,
} from '@/app/(normal)/(monitoring-operations)/internal/linkage.enums';

export const LinkageSceneEventOptions = [
    {
        label: '物模型属性上报',
        value: LINKAGE_SCENE_EVENT_TYPE.THING_PROPERTY_REPORT,
    },
];

export const ConditionTypeOptions = [
    {
        label: '物模型属性值',
        value: STATE_CONDITION_TYPE.THING_PROPERTY_VALUE,
    },
];

export const OperatorOptions = [
    {
        label: '等于',
        value: OPERATOR.EQUAL_TO,
    },
    {
        label: '大于',
        value: OPERATOR.GREATER_THAN,
    },
    {
        label: '大于等于',
        value: OPERATOR.GREATER_THAN_OR_EQUAL_TO,
    },
    {
        label: '小于',
        value: OPERATOR.LESS_THAN,
    },
    {
        label: '小于等于',
        value: OPERATOR.LESS_THAN_OR_EQUAL_TO,
    },
    {
        label: '闭区间[a,b]',
        value: OPERATOR.RANGE_CLOSED,
    },
    {
        label: '开区间[a,b]',
        value: OPERATOR.RANGE_OPEN,
    },
];

export const ActionTypeOptions = [
    {
        label: '发送通知消息',
        value: ACTION_TYPE.NOTIFICATION,
    },
    {
        label: '告警',
        value: ACTION_TYPE.ALARM,
    },
];

export const ContactsTypeOptions = [
    {
        label: '联系人',
        value: CONTACTS_TYPE.CONTACTS,
    },
    {
        label: '联系人组',
        value: CONTACTS_TYPE.CONTACTS_GROUP,
    },
];

export const ChannelTypeOptions = [
    {
        label: '短信',
        value: CHANNEL_TYPE.SMS,
    },
];
