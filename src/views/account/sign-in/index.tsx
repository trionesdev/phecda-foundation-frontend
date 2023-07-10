import { Button, Form, Input } from 'antd';
import styles from './index.module.less';
import { LockOutlined, UserOutlined } from '@ant-design/icons';

const SignInView = () => {
    const [form] = Form.useForm();

    return (
        <div className={styles.signInView}>
            <div className={styles.signInViewFormLoginContainer}>
                <div className={styles.signInViewFormLoginContainerMain}>
                    <Form form={form}>
                        <Form.Item>
                            <Input
                                placeholder={`用户名`}
                                prefix={<UserOutlined />}
                            />
                        </Form.Item>
                        <Form.Item>
                            <Input.Password
                                prefix={<LockOutlined />}
                                placeholder="密码"
                            />
                        </Form.Item>
                        <Form.Item>
                            <Button type={`primary`} block>
                                登录
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </div>
            <footer className={styles.signInViewFooter}>
                <div>北斗快速开发平台</div>
                <div>power by moensun</div>
            </footer>
        </div>
    );
};
export default SignInView;
