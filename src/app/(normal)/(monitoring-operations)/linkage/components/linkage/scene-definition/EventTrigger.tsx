import { Button, Form, FormInstance, Input, Select, Space } from 'antd';
import React, { FC, useEffect } from 'react';
import _ from 'lodash';
import { LINKAGE_SCENE_EVENT_TYPE } from '@/domains/linkage/linkage.enums';
import { SceneEventTypeFormItem } from '@/app/(normal)/(monitoring-operations)/linkage/components/linkage/scene-definition/items/SceneEventTypeFormItem';
import { ThingPropertyReportTriggerIdentifier } from '@/app/(normal)/(monitoring-operations)/linkage/components/linkage/scene-definition/identifier/ThingPropertyReportTriggerIdentifier';
import { ThingPropertyReportFilter } from '@/app/(normal)/(monitoring-operations)/linkage/components/linkage/scene-definition/filter/ThingPropertyReportFilter';

// 事件条件

type SceneEventConditionProps = {
    editing?: boolean;
    form?: FormInstance;
    namePath?: any;
};
export const EventTrigger: FC<SceneEventConditionProps> = ({
    editing,
    form,
    namePath,
}) => {
    const eventTriggerType = Form.useWatch(
        _.concat([], namePath, 'type'),
        form
    );
    const eventTriggerFilter = Form.useWatch(_.concat(namePath, 'filter'), {
        form,
        preserve: true,
    });
    const handleAddEventTriggerFilter = () => {
        form!.setFieldValue([...namePath, 'filter'], {});
    };

    useEffect(() => {
        form?.setFieldValue(
            [...namePath, 'identifier', 'type'],
            eventTriggerType
        );
    }, [eventTriggerType]);

    return (
        <Space direction={`vertical`}>
            <Space>
                <div>
                    <SceneEventTypeFormItem
                        namePath={_.concat([], namePath, 'type')}
                    />
                    <Form.Item
                        noStyle={true}
                        name={[...namePath, 'identifier', 'type']}
                        hidden={true}
                    >
                        <Input />
                    </Form.Item>
                </div>
                {_.isEqual(
                    LINKAGE_SCENE_EVENT_TYPE.THING_PROPERTY_REPORT,
                    eventTriggerType
                ) && (
                    <ThingPropertyReportTriggerIdentifier
                        form={form}
                        namePath={[...namePath]}
                    />
                )}
            </Space>
            {editing &&
                !eventTriggerFilter &&
                _.includes(
                    [LINKAGE_SCENE_EVENT_TYPE.THING_PROPERTY_REPORT],
                    eventTriggerType
                ) && (
                    <Button
                        size={`small`}
                        type={`link`}
                        style={{ fontSize: 12 }}
                        onClick={handleAddEventTriggerFilter}
                    >
                        + 新增事件过滤条件
                    </Button>
                )}
            {eventTriggerFilter &&
                _.includes(
                    [LINKAGE_SCENE_EVENT_TYPE.THING_PROPERTY_REPORT],
                    eventTriggerType
                ) && (
                    <ThingPropertyReportFilter
                        editing={editing}
                        form={form}
                        namePath={[...namePath]}
                    />
                )}
        </Space>
    );
};
