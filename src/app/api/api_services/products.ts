import ApiService, { cleanParams } from "."

export const ProductServices = {
    getAllProducts: () => ApiService.query('/products/', { limit: 20 }),
    queryProduct: ({
        id,
        productTitle,
        ownerName,
        priceMin,
        priceMax,
    }: {
        id: string,
        productTitle: string,
        ownerName: string,
        priceMin: number,
        priceMax: number,
    }) => {
        let params = {
            id,
            productTitle,
            ownerName,
            priceMin,
            priceMax
        }
        params = cleanParams(params)
        return ApiService.query('/products', params)
    }
}