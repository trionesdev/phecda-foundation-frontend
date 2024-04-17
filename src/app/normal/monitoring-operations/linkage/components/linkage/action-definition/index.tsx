import { Button, Col, Form, FormInstance, Row, Select, Space } from 'antd';
import { FC } from 'react';
import styles from './action-definition.module.less';
import _ from 'lodash';
import { ActionTypeOptions } from '@/app/normal/monitoring-operations/internal/linkage.constants';
import { ACTION_TYPE } from '@/app/normal/monitoring-operations/internal/linkage.enums';
import { NotificationAction } from '@/app/normal/monitoring-operations/linkage/components/linkage/action-definition/notification';
import { AlarmAction } from '@/app/normal/monitoring-operations/linkage/components/linkage/action-definition/alarm';
import { ServiceInvocationAction } from '@/app/normal/monitoring-operations/linkage/components/linkage/action-definition/service-invocation';

type ActionDefinitionProps = {
    editing?: boolean;
    form?: FormInstance;
    namePath?: any;
    index?: number;
    onRemove?: (index: number) => void;
};
export const ActionDefinition: FC<ActionDefinitionProps> = ({
    editing,
    namePath,
    form,
    index = 0,
    onRemove,
}) => {
    const actionType = Form.useWatch(_.concat([], namePath, 'type'), form);
    return (
        <>
            <Row className={styles.action}>
                <Col flex={`auto`} className={styles.actionBody}>
                    <Space direction={`vertical`} style={{ width: '100%' }}>
                        <div>场景动作{index + 1}</div>
                        <Space align={`start`}>
                            <Form.Item
                                label={`场景动作类型`}
                                name={[...namePath, 'type']}
                                required={true}
                            >
                                <Select
                                    style={{ minWidth: 180 }}
                                    options={ActionTypeOptions}
                                    allowClear={true}
                                />
                            </Form.Item>
                            {_.isEqual(
                                actionType,
                                ACTION_TYPE.NOTIFICATION
                            ) && (
                                <NotificationAction
                                    form={form}
                                    namePath={namePath}
                                />
                            )}
                            {_.isEqual(actionType, ACTION_TYPE.ALARM) && (
                                <AlarmAction form={form} namePath={namePath} />
                            )}
                            {_.isEqual(
                                ACTION_TYPE.SERVICE_INVOCATION,
                                actionType
                            ) && (
                                <ServiceInvocationAction
                                    form={form}
                                    namePath={namePath}
                                />
                            )}
                        </Space>
                    </Space>
                </Col>
                {editing && (
                    <Col>
                        <Button type={`link`} onClick={() => onRemove?.(index)}>
                            删除
                        </Button>
                    </Col>
                )}
            </Row>
        </>
    );
};
