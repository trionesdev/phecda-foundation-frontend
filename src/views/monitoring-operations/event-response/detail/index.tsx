import React from 'react';
import styles from './index.module.less';
import { PageHeader, VPanel } from '@moensun/antd-react-ext';
import { useNavigate, useParams } from 'react-router-dom';
import { Button, Form, Space } from 'antd';

const SceneDetail: React.FC = () => {
    const { id: typeCode } = useParams();
    const [form] = Form.useForm();
    const navigate = useNavigate();

    const pageHelper = (
        <PageHeader
            title="场景详情"
            onBack={() => {
                navigate(-1);
            }}
            extra={
                <Space>
                    <Button type="primary">启用</Button>
                    <Button type="primary">确定</Button>
                    <Button type="primary">编辑</Button>
                </Space>
            }
        ></PageHeader>
    );
    return (
        <Form form={form} className={styles.wrapper}>
            <VPanel header={pageHelper}>
                <div className={styles.contentWrapper}>场景详情</div>
            </VPanel>
        </Form>
    );
};

export default SceneDetail;
