import { FC } from 'react';
import { Form, FormInstance, Input, InputNumber, Select, Space } from 'antd';
import { AlarmTriggerModeOptions } from '@/domains/alarm/alarm.constants';
import _ from 'lodash';
import { ALARM_TRIGGER_MODE } from '@/domains/alarm/alarm.enums';
import { AlarmTypeSelect } from '@/app/(normal)/(alarm)/alarms/AlarmTypeSelect';
import { AlarmLevelSelect } from '@/app/(normal)/(alarm)/alarms/AlarmLevelSelect';

type AlarmActionProps = {
    form?: FormInstance;
    namePath?: any[];
};
export const AlarmAction: FC<AlarmActionProps> = ({ form, namePath = [] }) => {
    const triggerMode = Form.useWatch(
        _.concat([], namePath, 'triggerMode'),
        form
    );
    return (
        <Space align={`start`}>
            <Form.Item
                label={`告警类型`}
                name={[...namePath, 'alarmType']}
                required={true}
            >
                <AlarmTypeSelect style={{ minWidth: 175 }} />
            </Form.Item>
            <Form.Item
                label={`告警级别`}
                name={[...namePath, 'alarmLevel']}
                required={true}
            >
                <AlarmLevelSelect style={{ minWidth: 175 }} />
            </Form.Item>
            <Form.Item
                label={`触发方式`}
                name={[...namePath, 'triggerMode']}
                required={true}
            >
                <Select
                    options={AlarmTriggerModeOptions}
                    style={{ minWidth: 175 }}
                />
            </Form.Item>
            {_.isEqual(triggerMode, ALARM_TRIGGER_MODE.CONTINUOUS) && (
                <Form.Item
                    label={`持续时间(s)`}
                    name={[...namePath, 'duration']}
                    initialValue={0}
                    required={true}
                >
                    <InputNumber style={{ minWidth: 175 }} min={0} />
                </Form.Item>
            )}
            <Form.Item
                label={`间隔时间(s)`}
                name={[...namePath, 'interval']}
                initialValue={0}
                required={true}
            >
                <InputNumber style={{ minWidth: 175 }} min={0} />
            </Form.Item>
            <Form.Item label={`描述`} name={[...namePath, 'description']}>
                <Input />
            </Form.Item>
        </Space>
    );
};
