import React, { useEffect, useState } from 'react';
import styles from './index.module.less';
import { PageHeader, VPanel } from '@moensun/antd-react-ext';
import { useNavigate, useParams } from 'react-router-dom';
import { Button, Form, Input, Space } from 'antd';
import { operationApi } from '@/apis';
import { useRequest } from 'ahooks';
import DrawerForm from '@/components/drawer-form';
import { SceneContextProvider } from '../components/SceneProvider';
import SceneDefinition from '../components/SceneDefinition';
import { filterEmptyData } from '@/commons/util/fliterEmptyData';

const SceneDetail: React.FC = () => {
    const { id } = useParams();
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const [open, setOpen] = useState<boolean>(false);
    const [modalFormeValue, setModalFormeValue] = useState<Record<string, any>>(
        {}
    );
    const {
        run: queryScenes,
        data: scenesData,
        refresh: refreshQueryScenes,
    } = useRequest((id) => operationApi.getScenesById(id), {
        manual: true,
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
    const { run: editScenesRules } = useRequest(
        (id, params) => operationApi.editScenesRulesById(id, params),
        {
            manual: true,
            onSuccess() {
                refreshQueryScenes();
            },
        }
    );

    /** 修改场景 */
    const { run: editScenes } = useRequest(
        (id, params) => operationApi.editScenesById(id, params),
        {
            manual: true,
            onSuccess() {
                setOpen(false);
                refreshQueryScenes();
            },
        }
    );
    useEffect(() => {
        queryScenes(id);
    }, [id, queryScenes]);

    const pageHelper = (
        <PageHeader
            title={scenesData?.name}
            onBack={() => {
                navigate(-1);
            }}
            extra={
                <Space>
                    <Button
                        type={scenesData?.enabled ? 'default' : 'primary'}
                        onClick={() => {
                            editScenesStatus(id, !scenesData?.enabled);
                        }}
                    >
                        {scenesData?.enabled ? '禁用' : '启用'}
                    </Button>
                    <Button
                        type="primary"
                        onClick={async () => {
                            await form.validateFields();
                            const values = form.getFieldsValue(true);
                            // editScenesRules(id, values);
                            const filteredData = filterEmptyData(values);
                            console.log(values);
                            console.log(filteredData);
                        }}
                    >
                        确定
                    </Button>
                    <Button
                        type="primary"
                        onClick={() => {
                            setOpen(true);
                            setModalFormeValue({
                                name: scenesData?.name,
                                description: scenesData?.description,
                            });
                        }}
                    >
                        编辑
                    </Button>
                </Space>
            }
        />
    );
    return (
        <Form form={form} className={styles.wrapper}>
            <SceneContextProvider
                value={{
                    sceneForm: form,
                }}
            >
                <VPanel header={pageHelper}>
                    <div className={styles.contentWrapper}>
                        <SceneDefinition />
                    </div>
                </VPanel>
                <DrawerForm
                    open={open}
                    title={`编辑${scenesData?.name}`}
                    onOpenChange={(op) => {
                        setOpen(op);
                    }}
                    layout="vertical"
                    onSubmit={(v) => {
                        editScenes(id, v);
                        setOpen(false);
                    }}
                    formValues={modalFormeValue}
                >
                    <Form.Item
                        name="name"
                        label="场景名称"
                        rules={[{ required: true }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item name="description" label="场景描述">
                        <Input.TextArea />
                    </Form.Item>
                </DrawerForm>
            </SceneContextProvider>
        </Form>
    );
};

export default SceneDetail;
