import React, {lazy, Suspense} from 'react';
import {useRoutes, RouteObject} from 'react-router-dom';
import SignInView from '../views/account/sign-in';
import MainLayoutView from "../views/layout";
import ProductsView from "../views/product/products";
import ProductDetailView from "../views/product/product-detail";
import {RoutesConstants} from "./routes.constants";

export const routes: RouteObject[] = [
    {path: '/sign-in', element: <SignInView/>},
    {
        path: '/', element: <MainLayoutView/>, children: [
            {path: RoutesConstants.PRODUCTS.path(), element: <ProductsView/>},
            {path: RoutesConstants.PRODUCT_DETAIL.path(), element: <ProductDetailView/>}
        ]
    }
]

// 生成路由
const AppRoutes = () => {
    return useRoutes(routes);
};

export default AppRoutes;