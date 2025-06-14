import { Product } from "@/types/Product";

// Define action types as an enum for better type safety
export enum ProductActionTypes {
    GET_ALL_PRODUCTS = 'GET_ALL_PRODUCTS',
    INIT_PRODUCTS_DATA = 'INIT_PRODUCTS_DATA',
    QUERY_PRODUCTS = 'QUERY_PRODUCTS'
}

// Separate interface for actions
export interface ProductActions {
    // State setters
    setCurrentPage: (newPage: number) => void;
    setTotalPages: (total: number) => void;
    setTotalItems: (total: number) => void;
    setLoading: (loading: boolean) => void;
    setError: (error: string | null) => void;
    setProducts: (products: Product[]) => void;
    setProduct: (product: Product) => void;

    // Async actions
    [ProductActionTypes.GET_ALL_PRODUCTS]: () => Promise<void>;
    [ProductActionTypes.INIT_PRODUCTS_DATA]: (query: string) => Promise<void>;
    [ProductActionTypes.QUERY_PRODUCTS]: (query: string) => Promise<void>;
}