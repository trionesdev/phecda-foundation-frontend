import Cookies from 'js-cookie';

const TENANT_USER_TOKEN = 'DubheUserToken';

export const setTenantUserToken = (token: string) => {
    sessionStorage.setItem(TENANT_USER_TOKEN, token);
    Cookies.set(TENANT_USER_TOKEN, token);
};

export const getTenantUserToken = () => {
    return (
        sessionStorage.getItem(TENANT_USER_TOKEN) ||
        Cookies.get(TENANT_USER_TOKEN)
    );
};

export const removeTenantUserToken = () => {
    sessionStorage.removeItem(TENANT_USER_TOKEN);
    Cookies.remove(TENANT_USER_TOKEN);
};
