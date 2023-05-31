import {AppToolbar, HPanel, VPanel} from "@moensun/antd-react-ext";
import {Menu, MenuProps} from "antd";
import {Outlet, useNavigate} from "react-router-dom";
import styles from "./layout.module.less"

const MainLayoutView = () => {
    const navigate = useNavigate()
    const menuItems: MenuProps['items'] = [{
        key: 'device-management',
        label: '设备管理',
        children: [
            {
                key: 'product',
                label: '产品',
                onClick: () => navigate("/products")
            }
        ]
    }]

    const appBar = <AppToolbar title={`物联网`}/>
    const sider = <div className={styles.layoutViewSider}>
        <Menu style={{minWidth: 250}} mode={`inline`} items={menuItems}/>
    </div>
    return <VPanel className={styles.layoutView} header={appBar}>
        <HPanel className={styles.layoutViewContent} left={sider}>
            <Outlet/>
        </HPanel>
    </VPanel>
}
export default MainLayoutView