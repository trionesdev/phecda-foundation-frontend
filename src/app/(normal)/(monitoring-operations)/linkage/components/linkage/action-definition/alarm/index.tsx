import { FC } from 'react';
import { Form, FormInstance, Input, InputNumber, Select, Space } from 'antd';
import { AlarmTriggerModeOptions } from '@/app/(normal)/(alarm)/internal/alarm.constants';
import _ from 'lodash';
import { ALARM_TRIGGER_MODE } from '@/app/(normal)/(alarm)/internal/alarm.enums';
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
                <AlarmTypeSelect style={{ minWidth: 175 }} allowClear={true} />
            </Form.Item>
            <Form.Item
                label={`告警级别`}
                name={[...namePath, 'alarmLevel']}
                required={true}
            >
                <AlarmLevelSelect style={{ minWidth: 175 }} allowClear={true} />
            </Form.Item>
            <Form.Item label={`描述`} name={[...namePath, 'description']}>
                <Input allowClear={true} />
            </Form.Item>
        </Space>
    );
};
