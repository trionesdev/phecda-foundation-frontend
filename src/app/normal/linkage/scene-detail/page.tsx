import React, { useEffect, useState } from 'react';
import styles from './linkage-edit.module.less';
import { Layout, PageHeader } from '@trionesdev/antd-react-ext';
import { Button, Form, notification, Space, Tooltip } from 'antd';
import { operationApi } from '@apis/tenant';
import { useRequest } from 'ahooks';
import _ from 'lodash';
import { QuestionCircleOutlined } from '@ant-design/icons';
import { ActionDefinition } from './components/action-definition';
import { SceneDefinition } from './components/scene-definition';
import { ActionTrigger } from './components/action-trigger';
import {useNavigate, useParams} from "@trionesdev/commons-react";
import {RouteConstants} from "@/router/routes.constants.ts";

export const SceneDetailPage: React.FC = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [form] = Form.useForm();
    const [editing, setEditing] = useState(false);

    const scenes = Form.useWatch('scenes', { form, preserve: true }) || [{}];
    const actions = Form.useWatch('actions', { form, preserve: true }) || [];
    const actionTrigger = Form.useWatch('actionTrigger', {
        form,
        preserve: true,
    });

    const {
        run: handleQueryLinkScene,
        data: linkScene,
        refresh: refreshQueryScenes,
    } = useRequest((id) => operationApi.getScenesById(id), {
        manual: true,
        onSuccess: (res: any) => {
            form.setFieldsValue({
                scenes: res.scenes || [{}],
                actions: res.actions,
                actionTrigger: res.actionTrigger,
            });
        },
    });
    /** 修改场景状态 */
    const { run: editScenesStatus } = useRequest(
        (id, params) => operationApi.editScenesStatusById(id, params),
        {
            manual: true,
            onSuccess() {
                refreshQueryScenes();
            },
        }
    );
    /** 修改场景规则 */
    const { run: handleSaveRules } = useRequest(
        async () => {
            const values = await form.validateFields();
            return await operationApi.editScenesRulesById(id!, values);
        },
        {
            manual: true,
            onSuccess() {
                notification.success({ message: '保存成功' });
                setEditing(false);
            },
        }
    );

    const handleAddScene = () => {
        if (_.size(scenes) > 2) {
            return;
        }
        form.setFieldValue('scenes', _.concat([], scenes, {}));
    };

    const handleRemoveScene = (sceneIndex: number) => {
        _.pullAt(scenes, sceneIndex);
        form.setFieldValue('scenes', _.cloneDeep(scenes));
    };

    const handleAddAction = () => {
        if (_.size(actions) > 2) {
            return;
        }
        form.setFieldValue('actions', _.concat([], actions, {}));
    };

    const handleRemoveAction = (actionIndex: number) => {
        _.pullAt(actions, actionIndex);
        form.setFieldValue('actions', _.cloneDeep(actions));
    };

    useEffect(() => {
        if (id) {
            handleQueryLinkScene(id);
        }
    }, []);

    return (
        <Layout direction={`vertical`} className={styles.linkageEdit}>
            <Layout.Item>
                <PageHeader
                    onBack={() => navigate(RouteConstants.MONITORING_OPERATION.LINKAGE.path())}
                    title={linkScene?.name}
                    extra={[
                        <Button
                            key={`edit-btn`}
                            type={`primary`}
                            disabled={editing}
                            onClick={() => setEditing(true)}
                        >
                            编辑
                        </Button>,
                    ]}
                />
            </Layout.Item>
            <Layout.Item auto={true} style={{ overflowY: 'auto', padding: 8 ,backgroundColor: '#ffffff'}}>
                <Form layout={`vertical`} form={form} disabled={!editing}>
                    <div>
                        <div className={styles.linkageEditTitle}>场景定义</div>
                        <Space direction={`vertical`} style={{ width: '100%' }}>
                            {scenes.map((scene: any, index: number) => (
                                <SceneDefinition
                                    key={`scene-${index}`}
                                    index={index}
                                    form={form}
                                    namePath={['scenes', index]}
                                    editing={editing}
                                    onRemove={handleRemoveScene}
                                />
                            ))}
                        </Space>
                        {editing && _.size(scenes) < 3 && (
                            <div>
                                <Button
                                    size={`small`}
                                    type={`link`}
                                    style={{ fontSize: 12 }}
                                    onClick={handleAddScene}
                                >
                                    + 新增场景定义
                                </Button>
                            </div>
                        )}
                    </div>
                    <div>
                        <div className={styles.linkageEditTitle}>场景动作</div>
                        <Space direction={`vertical`} style={{ width: '100%' }}>
                            {actions.map((actions: any, index: number) => (
                                <ActionDefinition
                                    key={`action-${index}`}
                                    form={form}
                                    index={index}
                                    namePath={['actions', index]}
                                    editing={editing}
                                    onRemove={handleRemoveAction}
                                />
                            ))}
                        </Space>
                        {editing && _.size(actions) < 3 && (
                            <div>
                                <Button
                                    size={`small`}
                                    type={`link`}
                                    style={{ fontSize: 12 }}
                                    onClick={handleAddAction}
                                >
                                    + 新增场景动作
                                </Button>
                            </div>
                        )}
                    </div>
                    {_.size(actions) > 0 && (
                        <div>
                            <div className={styles.linkageEditTitle}>
                                动作触发设置{' '}
                                <Tooltip
                                    title={
                                        <span>
                                            默认场景触发即执行，每10分钟内最多执行1次动作
                                        </span>
                                    }
                                >
                                    <QuestionCircleOutlined />
                                </Tooltip>
                            </div>
                            <Space
                                direction={`vertical`}
                                style={{ width: '100%' }}
                            >
                                {_.isEmpty(actionTrigger) && (
                                    <div>
                                        <Button
                                            size={`small`}
                                            type={`link`}
                                            style={{ fontSize: 12 }}
                                            onClick={() => {
                                                form.setFieldValue(
                                                    'actionTrigger',
                                                    {
                                                        triggerMode: 'SINGLE',
                                                        interval: 600,
                                                    }
                                                );
                                            }}
                                        >
                                            + 设置动作触发机制
                                        </Button>
                                    </div>
                                )}
                                {!_.isEmpty(actionTrigger) && (
                                    <ActionTrigger
                                        form={form}
                                        namePath={['actionTrigger']}
                                        editing={editing}
                                    />
                                )}
                            </Space>
                        </div>
                    )}
                </Form>
            </Layout.Item>
            <Layout.Item style={{ padding: 8,backgroundColor: 'white' }}>
                {editing ? (
                    <Space>
                        <Button type={`primary`} onClick={handleSaveRules}>
                            确认
                        </Button>
                        <Button
                            onClick={() => {
                                setEditing(false);
                            }}
                        >
                            取消
                        </Button>
                    </Space>
                ) : (
                    <Space>
                        <Button type={`primary`}>运行</Button>
                        <Button
                            onClick={() =>
                                navigate(RouteConstants.MONITORING_OPERATION.LINKAGE.path())
                            }
                        >
                            返回
                        </Button>
                    </Space>
                )}
            </Layout.Item>
        </Layout>
    );
};
