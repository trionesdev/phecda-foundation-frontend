import React, {lazy, Suspense} from 'react';
import {useRoutes, RouteObject} from 'react-router-dom';
import SignInView from '../views/account/sign-in';
import MainLayoutView from "../views/layout";
import ProductsView from "../views/product/products";

export const routes: RouteObject[] = [
    {path: '/sign-in', element: <SignInView/>},
    {
        path: '/', element: <MainLayoutView/>, children: [
            {path: '/products', element: <ProductsView/>}
        ]
    }
]

// 生成路由
const AppRoutes = () => {
    return useRoutes(routes);
};

export default AppRoutes;