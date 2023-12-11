import { EventTrigger } from '@/app/(normal)/monitoring-operations/linkage/components/linkage/scene-definition/EventTrigger';
import { Button, Col, FormInstance, Row, Space, Typography } from 'antd';
import { Conditions } from '@/app/(normal)/monitoring-operations/linkage/components/linkage/scene-definition/Conditions';
import { FC } from 'react';
import _ from 'lodash';
import styles from './scene-definition.module.less';

type SceneDefinitionProps = {
    editing?: boolean;
    form?: FormInstance;
    namePath?: any;
    index?: number;
    onRemove?: (index: number) => void;
};
export const SceneDefinition: FC<SceneDefinitionProps> = ({
    editing,
    form,
    namePath,
    index = 0,
    onRemove,
}) => {
    return (
        <Row className={styles.scene}>
            <Col flex={`auto`} className={styles.sceneContent}>
                <Space direction={`vertical`} style={{ width: '100%' }}>
                    <div>场景定义{index + 1}</div>
                    <div style={{ fontWeight: 'bold' }}>当以下事件发生</div>
                    <EventTrigger
                        editing={editing}
                        namePath={_.concat([], namePath, 'eventTrigger')}
                        form={form}
                    />
                    <Conditions
                        editing={editing}
                        namePath={[...namePath, 'conditions']}
                        form={form}
                    />
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
    );
};
