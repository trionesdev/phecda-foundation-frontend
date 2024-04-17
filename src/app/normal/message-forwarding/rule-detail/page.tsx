import { Layout, PageHeader } from '@trionesdev/antd-react-ext';
import styles from './rule-detail.module.less';
import { Button, Space, Steps } from 'antd';
import React, { useEffect, useState } from 'react';
import _ from 'lodash';
import { useNavigate, useParams } from 'react-router-dom';
import { useRequest } from 'ahooks';
import { messageForwardingApi } from '@apis';
import { SourceStep } from './SourceStep';
import { SinkStep } from './SinkStep';
import { ForwardingRuleForm } from '../rule/forwarding-rule-tab/ForwardingRuleForm';

export const ForwardingRuleDetailPage = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [rule, setRule] = useState<any>();
    const [step, setStep] = useState(0);

    const { run: handleQueryRuleById } = useRequest(
        () => messageForwardingApi.queryForwardingRuleById(id!),
        {
            manual: true,
            onSuccess: (result) => {
                setRule(result);
            },
        }
    );

    useEffect(() => {
        if (id) {
            handleQueryRuleById();
        }
    }, [id]);

    return (
        <Layout direction={`vertical`} className={styles.ruleDetailPage}>
            <Layout.Item>
                <PageHeader
                    onBack={() => navigate(-1)}
                    title={rule?.name}
                    extra={
                        <Space>
                            <ForwardingRuleForm key={`edit-btn`} id={id}>
                                <Button>编辑</Button>
                            </ForwardingRuleForm>
                        </Space>
                    }
                />
            </Layout.Item>
            <Layout direction={`vertical`}>
                <Layout.Item>
                    <div className={styles.ruleDetailPageSteps}>
                        <Steps
                            current={step}
                            onChange={setStep}
                            items={[
                                {
                                    title: '数据源',
                                },
                                {
                                    title: '数据目的',
                                },
                            ]}
                        />
                    </div>
                </Layout.Item>
                <Layout.Item auto={true}>
                    {_.isEqual(0, step) && (
                        <SourceStep ruleId={id!} rule={rule} />
                    )}
                    {_.isEqual(1, step) && (
                        <SinkStep ruleId={id!} rule={rule} />
                    )}
                </Layout.Item>
            </Layout>
        </Layout>
    );
};
