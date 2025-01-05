import {AppToolbar, Layout} from "@trionesdev/antd-react-ext";
import {Outlet, useAuth, useNavigate} from "@trionesdev/commons-react";
import {Avatar, Dropdown, Space} from "antd";
import Icon, {LogoutOutlined, UserOutlined} from "@ant-design/icons";
import {RouteConstants} from "@/router/routes.constants.ts";
import PhecdaSvg from './assests/phecda.svg?react';

export const TrionesLayout = () => {
    const navigate = useNavigate()
    const {actor, signOut} = useAuth()
    return <Layout direction={`vertical`}>
        <Layout.Item>
            <AppToolbar
                avatar={{
                    icon: (
                        <Icon component={PhecdaSvg} style={{ width: 40 }} />
                    ),
                    style: { fontSize: 40 },
                }}
                title={<Space style={{cursor: "pointer"}} onClick={() => {
                navigate('/')
            }}>TrionesDev</Space>} extra={<Space>
                <Dropdown menu={{
                    items: [
                        {
                            key: `profile`,
                            label: `个人中心`,
                            icon: <UserOutlined/>,
                            onClick: () => {
                                navigate(RouteConstants.USER_CENTER.PROFILE.path!())
                            }
                        },
                        {
                            key: `logout`,
                            label: `退出登录`,
                            icon: <LogoutOutlined/>,
                            onClick: () => {
                                signOut?.()
                            }
                        }
                    ]
                }}>
                    <Space style={{cursor: "default"}}><Avatar icon={<UserOutlined/>} src={actor?.avatar}/>
                        <span>{actor?.nickname}</span>
                    </Space>
                </Dropdown>
            </Space>}/>
        </Layout.Item>
        <Layout.Item auto={true} style={{overflow: "auto"}}>
            <Outlet/>
        </Layout.Item>
    </Layout>
}