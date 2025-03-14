import {AccountSignIn} from '@app/account/sign-in/AccountSignIn.tsx';
import styles from './sign-in.module.less';
import {Avatar, Flex, Space, Tabs} from 'antd';
import BgImage from '../assests/bg.png';
import Logo from "../assests/phecda_with_title_round.svg?react"

export const SignInPage = () => {
    return <div className={styles.signInPage} style={{backgroundImage: `url(${BgImage})`}}>
        <div className={styles.main}>
            <div className={styles.left}>
                <div style={{transform: 'translateY(-200%) translateX(-50%)'}}>
                    <Space>
                        <div>
                            <Logo
                                style={{width: 100, height: 100, color: '#fff', borderRadius: 8, overflow: 'hidden'}}/>
                        </div>
                        <div>
                            <div className={styles.title}>天玑·物联网平台</div>
                            <div>万物互联，由此而始</div>
                        </div>
                    </Space>
                </div>
            </div>
            <div className={styles.formContainer}>
                <div className={styles.formPanel}>
                    <Tabs items={[{
                        key: 'account-sign-in',
                        label: '账号登录',
                        children: <div style={{padding: '20px 0px'}}><AccountSignIn/></div>,
                    }]}/>
                </div>
            </div>
        </div>
        <div className={styles.footer}>TrionesDev ©2015-Now TrionesDev All Rights Reserved.</div>
    </div>
}
