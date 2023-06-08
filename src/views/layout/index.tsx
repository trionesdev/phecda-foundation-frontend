import {AppToolbar, HPanel, VPanel} from "@moensun/antd-react-ext";
import {Menu, MenuProps} from "antd";
import {Outlet, useNavigate} from "react-router-dom";
import styles from "./layout.module.less"
import {RoutesConstants} from "../../router/routes.constants";

const MainLayoutView = () => {
    const navigate = useNavigate()
    const menuItems: MenuProps['items'] = [{
        key: 'device-management',
        label: '设备管理',
        children: [
            {
                key: RoutesConstants.PRODUCTS.key,
                label: '产品',
                onClick: () => navigate(RoutesConstants.PRODUCTS.path())
            },
            {
                key: RoutesConstants.DEVICES.key,
                label: `设备`,
                onClick: () => navigate(RoutesConstants.DEVICES.path())
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