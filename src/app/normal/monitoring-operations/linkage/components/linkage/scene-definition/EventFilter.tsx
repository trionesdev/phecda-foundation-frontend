// 事件过滤条件
import { FC } from 'react';
import { Button, Form, FormInstance, Space } from 'antd';
import _ from 'lodash';
import { LINKAGE_SCENE_EVENT_TYPE } from '@/app/normal/monitoring-operations/internal/linkage.enums';
import OperatorFormItem from '@/app/normal/monitoring-operations/linkage/components/OperatorFormItem';
import { ThingPropertyValueFormItem } from '@/app/normal/monitoring-operations/linkage/components/linkage/scene-definition/items/ThingPropertyValueFormItem';

type EventFilterProps = {
    editing?: boolean;
    eventType?: LINKAGE_SCENE_EVENT_TYPE;
    form?: FormInstance;
    namePath?: any[];
};
export const EventFilter: FC<EventFilterProps> = ({
    editing,
    eventType,
    form,
    namePath = [],
}) => {
    const eventTriggerType = Form.useWatch([...namePath, 'type'], form);
    const handleRemoveEventTriggerFilter = () => {
        form?.setFieldValue([...namePath, 'filter'], null);
    };
    return (
        <Space>
            {_.isEqual(
                LINKAGE_SCENE_EVENT_TYPE.THING_PROPERTY_REPORT,
                eventTriggerType
            ) && (
                <>
                    <OperatorFormItem namePath={[...namePath]} />
                    <ThingPropertyValueFormItem
                        form={form}
                        namePath={[...namePath]}
                    />
                </>
            )}
            {editing && (
                <Button
                    size={`small`}
                    type={`link`}
                    onClick={handleRemoveEventTriggerFilter}
                >
                    删除
                </Button>
            )}
        </Space>
    );
};
