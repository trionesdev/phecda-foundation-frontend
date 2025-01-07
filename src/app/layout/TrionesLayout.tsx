import {AppToolbar, Layout} from "@trionesdev/antd-react-ext";
import {Outlet, useNavigate} from "@trionesdev/commons-react";
import {Space} from "antd";
import Icon from "@ant-design/icons";
import PhecdaSvg from './assests/phecda.svg?react';

export const TrionesLayout = () => {
    const navigate = useNavigate()
    return <Layout direction={`vertical`} style={{backgroundColor: "white"}}>
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
            }}>天玑·物联</Space>} />
        </Layout.Item>
        <Layout.Item auto={true} style={{overflow: "auto"}}>
            <Outlet/>
        </Layout.Item>
    </Layout>
}