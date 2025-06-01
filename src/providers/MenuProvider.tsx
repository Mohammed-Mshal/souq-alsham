'use client'

import { createMenuStore, initialMenuStore, MenuStore } from "@/stores/modules/menu"
import { createContext, ReactNode, useContext, useRef } from "react"
import { useStore } from "zustand"

// Create Interface For Children Props
export interface MenuStoreProviderProps {
    children: ReactNode
}

// Create Store API

export type MenuStoreApi = ReturnType<typeof createMenuStore>

// Create Context of Provider
export const MenuStoreContext = createContext<undefined | MenuStoreApi>(undefined)


// Create Provider
export const MenuStoreProvider = ({ children }: MenuStoreProviderProps) => {
    const storeRef = useRef<MenuStoreApi | null>(null)
    if (storeRef.current === null) {
        storeRef.current = createMenuStore(initialMenuStore())
    }
    return <MenuStoreContext.Provider value={storeRef.current}>
        {children}
    </MenuStoreContext.Provider>
}

// Create Use Store

export const useMenuStore = <T,>(selector: (store: MenuStore) => T,): T => {
    const menuStoreContext = useContext(MenuStoreContext)
    if (!menuStoreContext) {
        throw new Error(`useMenuStore must be used within MenuStoreProvider`)
    }
    return useStore(menuStoreContext, selector)
}