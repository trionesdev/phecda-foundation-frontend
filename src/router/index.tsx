import React, {lazy, Suspense} from 'react';
import {useRoutes, RouteObject} from 'react-router-dom';
import SignInView from '../views/account/sign-in';
import MainLayoutView from "../views/layout";
import ProductsView from "../views/product/products";
import ProductDetailView from "../views/product/product-detail";
import {RoutesConstants} from "./routes.constants";
import ProductThingsModelDraftView from "../views/product/product-things-model-draft";
import DevicesView from "../views/device/devices";

export const routes: RouteObject[] = [
    {path: '/sign-in', element: <SignInView/>},
    {
        path: '/', element: <MainLayoutView/>, children: [
            {path: RoutesConstants.PRODUCTS.path(), element: <ProductsView/>},
            {path: RoutesConstants.PRODUCT_DETAIL.path(), element: <ProductDetailView/>},
            {path: RoutesConstants.PRODUCT_THINGS_MODEL_DRAFT.path(), element: <ProductThingsModelDraftView/>},
            {path: RoutesConstants.DEVICES.path(), element: <DevicesView/>}
        ]
    }
]

// 生成路由
const AppRoutes = () => {
    return useRoutes(routes);
};

export default AppRoutes;