import { Outlet, useAuth, useNavigate } from '@trionesdev/commons-react';
import { Avatar, Button, Dropdown, Layout, Menu, Space } from 'antd';
import styles from './standalone-layout.module.less';
import { LogoutOutlined, MenuFoldOutlined, MenuUnfoldOutlined, UserOutlined } from '@ant-design/icons';
import { useState } from 'react';
import PhecdaSvg from './assests/phecda.svg';
import { useNavMenus } from '@/hooks/useNavMenus.tsx';
import NavTags from '@components/nav-tags';
import {RouteConstants} from "@/router/route.constants.ts";

export const StandAloneLayout = () => {
    const navigate = useNavigate();
    const { appMenus, generalMenus } = useNavMenus();

    const { actor, signOut } = useAuth();
    const [collapsed, setCollapsed] = useState(false);

    const menuItems: any[] = [...appMenus, ...generalMenus];

    return <Layout className={styles.standaloneLayout}>
        <Layout.Sider collapsed={collapsed}>
            <div className={styles.standaloneLayoutSiderWraper}>
                <div className={styles.logo} style={{ justifyContent: collapsed ? 'center' : 'normal' }}>
                    <Space>
                        <Avatar shape={`square`} src={PhecdaSvg} />
                        {!collapsed && <span>天玑·物联</span>}
                    </Space>
                </div>
                <div className={styles.menu}>
                    <Menu mode="inline" theme={'dark'} items={menuItems} />
                </div>
            </div>
        </Layout.Sider>
        <Layout>
            <Layout.Header className={styles.standaloneLayoutHeader}>
                <Button type={'text'} icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                        onClick={() => setCollapsed(!collapsed)} />
                <Space>
                    <Dropdown menu={{
                        items: [
                            {
                                key: `profile`,
                                label: `个人中心`,
                                icon: <UserOutlined />,
                                onClick: () => {
                                    navigate(RouteConstants.USER_CENTER.PROFILE.path!());
                                },
                            },
                            {
                                key: `logout`,
                                label: `退出登录`,
                                icon: <LogoutOutlined />,
                                onClick: () => {
                                    signOut?.();
                                },
                            },
                        ],
                    }}>
                        <Space style={{ cursor: 'default' }}><Avatar icon={<UserOutlined />} src={actor?.avatar} />
                            <span>{actor?.nickname}</span>
                        </Space>
                    </Dropdown>
                </Space>
            </Layout.Header>
            <NavTags />
            <Layout.Content style={{ overflowY: 'auto', padding: 4 }}>
                <Outlet />
            </Layout.Content>
        </Layout>
    </Layout>;
};