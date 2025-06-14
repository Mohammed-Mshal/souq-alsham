/* eslint-disable @typescript-eslint/no-explicit-any */
import { Product } from "@/types/Product"
import { create } from "zustand"
import { ProductActions, ProductActionTypes } from "../actions/products"
import { ProductServices } from "@/app/api/api_services/products";
interface ProductState {
    products: Product[],
    loading: boolean,
    error: string | null,
    totalPages: number,
    currentPage: number,
    totalItems: number,
    selectedProduct: Product | null
}

// Define initial state
const initialState: ProductState = {
    products: [],
    loading: false,
    error: null,
    currentPage: 1,
    totalPages: 0,
    totalItems: 0,
    selectedProduct: null
};


// Type-safe action wrapper
const actionWrapper = async <T>(
    store: ProductState & ProductActions,
    payload: any,
    asyncFn: () => Promise<T>,
    handleLoading = true
): Promise<T | void> => {
    if (handleLoading) {
        store.setLoading(true);
    }
    store.setError(null);

    try {
        const result = await asyncFn();
        return result;
    } catch (error) {
        console.error("Error in product store:", error);
        store.setError(error instanceof Error ? error.message : 'An unknown error occurred');
    } finally {
        if (handleLoading) {
            store.setLoading(false);
        }
    }
};

export const useProductStore = create<ProductState & ProductActions>()((set) => ({
    ...initialState,
    // State setters
    setCurrentPage: (newPage: number) => set({ currentPage: newPage }),
    setTotalPages: (total: number) => set({ totalPages: total }),
    setTotalItems: (total: number) => set({ totalItems: total }),
    setLoading: (loading: boolean) => set({ loading }),
    setError: (error: string | null) => set({ error }),
    setProducts: (products: Product[]) => set({ products }),
    setProduct: (product: Product) => set({ selectedProduct: product }),

    // Async actions
    [ProductActionTypes.INIT_PRODUCTS_DATA]: async () => {
        const [products] = await Promise.all([
            ProductServices.getAllProducts()
        ])
        return set(() => {
            return {
                products: products?.data?.results || []
            }
        })
    },
    [ProductActionTypes.GET_ALL_PRODUCTS]: async function () {
        return actionWrapper(this, null, async () => {
            const response = await ProductServices.getAllProducts()
            return set(() => {
                return {
                    products: response?.data?.results || [],
                    totalPages: Math.ceil(response?.data?.count / 20) || 0
                }
            })
        });
    },
    [ProductActionTypes.QUERY_PRODUCTS]: async function (queryParams: any) {
        return actionWrapper(this, queryParams, async () => {
            const response = await ProductServices.queryProduct(queryParams)
            return set(() => {
                return {
                    products: response?.data?.results || [],
                    totalPages: Math.ceil(response?.data?.count / 20) || 0
                }
            })
        });
    },
}));