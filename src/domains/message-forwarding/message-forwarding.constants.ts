import {
    MESSAGE_SINK_TYPE,
    MESSAGE_SOURCE_TOPIC_TYPE,
} from '@/domains/message-forwarding/message-forwarding.enums';

export const MessageSourceTopicTypeOptions = [
    {
        label: '物模型数据上报',
        value: MESSAGE_SOURCE_TOPIC_TYPE.THING_PROPERTY_REPORT,
    },
];

export const MessageSinkTypeOptions = [
    { label: 'Kafka', value: MESSAGE_SINK_TYPE.KAFKA },
];
