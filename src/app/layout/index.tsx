import { AppToolbar, Layout } from '@trionesdev/antd-react-ext';
import { Outlet } from 'react-router-dom';
import Icon from '@ant-design/icons';
import PhecdaSvg from './assests/phecda.svg?react';

const MainLayoutView = () => {
    return (
        <Layout direction={`vertical`}>
            <Layout.Item>
                <AppToolbar
                    avatar={{
                        icon: (
                            <Icon component={PhecdaSvg} style={{ width: 40 }} />
                        ),
                        style: { fontSize: 40 },
                    }}
                    title={`物联网平台`}
                />
            </Layout.Item>
            <Outlet />
        </Layout>
    );
};
export default MainLayoutView;
