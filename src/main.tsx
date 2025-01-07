import {createRoot} from 'react-dom/client';
import './index.css';
import './index.less';
import {ConfigProvider} from 'antd';
import zhCN from 'antd/es/locale/zh_CN';
import {AppRouter} from '@/router';
import {StrictMode} from 'react';
import {legacyLogicalPropertiesTransformer, StyleProvider} from '@ant-design/cssinjs';
import {AppConfigProvider} from '@components/app-config';
import {AuthProvider, PermissionProvider} from '@trionesdev/commons-react';
import {StorageUtils} from '@trionesdev/browser-commons';
import {tenantApi} from '@apis/tenant';
import {DubheApp} from "@trionesdev/dubhe-react";

DubheApp.render({
    root: createRoot(document.getElementById('root')!),
    unmount:true,
    render: () => {
        return <StrictMode>
            <StyleProvider transformers={[legacyLogicalPropertiesTransformer]}>
                <ConfigProvider locale={zhCN}>
                    <AppConfigProvider subApp={DubheApp.isSubApp()}
                                       defaultConfig={{multiTenant: false, selfHost: true}}>
                        <AuthProvider authRequest={async () => {
                            if (StorageUtils.getTrionesUserToken()) {
                                return tenantApi.queryActorMember().then((actor: any) => {
                                    return actor;
                                });
                            } else {
                                return Promise.reject(null);
                            }
                        }} onUnAuthenticated={() => {
                            window.location.href = '/#/sign-in';
                        }} onSignOut={() => {
                            StorageUtils.removeTenantUserToken();
                            window.location.href = '/#/sign-in';
                        }}>
                            <PermissionProvider
                                policyRequest={async () => {
                                    console.log('permissionRequest');
                                    return {};
                                }}>
                                <AppRouter/>
                            </PermissionProvider>
                        </AuthProvider>
                    </AppConfigProvider>
                </ConfigProvider>
            </StyleProvider>
        </StrictMode>
    }
})
