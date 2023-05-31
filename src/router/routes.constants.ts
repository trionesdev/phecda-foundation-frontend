type RoutesConstantsProps = {
    [key: string]: { key: string, path: () => string }
}
export  const RoutesConstants = {
    "PRODUCTS": {key: "PRODUCTS", path: () => `/products`},
    "PRODUCT_DETAIL": {key: "PRODUCT_DETAIL", path: (id?: string) => `/products/${id ? id : ':id'}/detail`},
}