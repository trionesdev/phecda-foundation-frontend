import { Outlet } from '@trionesdev/commons-react';
import styles from './normal-layout.module.less';
import { Layout } from '@trionesdev/antd-react-ext';
import { Menu } from 'antd';
import { useNavMenus } from '@/hooks/useNavMenus.tsx';

export const TrionesLayout = () => {
    const {appMenus,generalMenus} = useNavMenus()

    const menuItems: any[] = [...appMenus,...generalMenus]

    return (
        <Layout className={styles.normalLayout}>
            <Layout.Sider>
                <Menu mode="inline" items={menuItems}/>
            </Layout.Sider>
            <Layout.Item auto style={{padding: 4, backgroundColor: '#f1f1f1'}}>
                <Outlet/>
            </Layout.Item>
        </Layout>
    );
}