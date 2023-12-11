import { Button, Col, Form, FormInstance, Row, Select, Space } from 'antd';
import { FC } from 'react';
import { ActionTypeOptions } from '@/domains/linkage/linkage.constants';
import styles from './action-definition.module.less';

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
    return (
        <>
            <Row className={styles.action}>
                <Col flex={`auto`} className={styles.actionBody}>
                    <Space direction={`vertical`} style={{ width: '100%' }}>
                        <div>场景动作{index + 1}</div>
                        <Space>
                            <Form.Item
                                label={`场景动作类型`}
                                name={[...namePath, 'type']}
                                required={true}
                            >
                                <Select
                                    style={{ minWidth: 180 }}
                                    options={ActionTypeOptions}
                                />
                            </Form.Item>
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
