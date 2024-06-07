import {
    MESSAGE_SINK_TYPE,
    MESSAGE_SOURCE_TOPIC_TYPE,
    MESSAGE_SOURCE_TOPICS,
} from './message-forwarding.enums';

export const MessageSourceTopicTypeOptions = [
    {
        label: '物模型数据上报',
        value: MESSAGE_SOURCE_TOPIC_TYPE.THING_PROPERTY_REPORT,
    },
];

export const MessageSinkTypeOptions = [
    { label: 'Kafka', value: MESSAGE_SINK_TYPE.KAFKA },
];

export const MessageSourceTopicsOptions = {
    [MESSAGE_SOURCE_TOPIC_TYPE.THING_PROPERTY_REPORT]: [
        {
            label: 'thing/property/post',
            value: MESSAGE_SOURCE_TOPICS.THING_PROPERTY_REPORT,
        },
    ],
};
