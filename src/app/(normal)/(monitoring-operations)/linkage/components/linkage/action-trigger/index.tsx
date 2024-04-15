import {
    Button,
    Col,
    Form,
    FormInstance,
    InputNumber,
    Row,
    Select,
    Space,
} from 'antd';
import { AlarmTriggerModeOptions } from '@/domains/alarm/alarm.constants';
import _ from 'lodash';
import { ALARM_TRIGGER_MODE } from '@/domains/alarm/alarm.enums';
import { FC } from 'react';
import styles from './action-trigger.module.less';

type ActionTriggerProps = {
    form?: FormInstance;
    namePath?: any[];
    editing?: boolean;
};

export const ActionTrigger: FC<ActionTriggerProps> = ({
    form,
    namePath = [],
    editing,
}) => {
    const triggerMode = Form.useWatch(
        _.concat([], namePath, 'triggerMode'),
        form
    );

    return (
        <>
            <Row className={styles.actionTrigger}>
                <Col flex={`auto`} className={styles.actionTriggerBody}>
                    <Space>
                        <Form.Item
                            label={`触发方式`}
                            name={[...namePath, 'triggerMode']}
                            required={true}
                        >
                            <Select
                                options={AlarmTriggerModeOptions}
                                style={{ minWidth: 175 }}
                                allowClear={true}
                            />
                        </Form.Item>
                        {_.isEqual(
                            triggerMode,
                            ALARM_TRIGGER_MODE.CONTINUOUS
                        ) && (
                            <Form.Item
                                label={`持续时间(s)`}
                                name={[...namePath, 'duration']}
                                initialValue={0}
                                required={true}
                            >
                                <InputNumber
                                    style={{ minWidth: 175 }}
                                    min={0}
                                />
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
                    </Space>
                </Col>
                {editing && (
                    <Col>
                        <Button
                            type={`link`}
                            onClick={() => {
                                form?.setFieldValue(namePath, {});
                            }}
                        >
                            删除
                        </Button>
                    </Col>
                )}
            </Row>
        </>
    );
};
