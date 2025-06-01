import { createStore } from "zustand";
import { MenuActions } from "../actions/menu";

type MenuState = {
    menuState: boolean,
}
export const defaultInitState: MenuState = {
    menuState: false
}
export type MenuStore = MenuState & MenuActions

export const initialMenuStore = (): MenuState => {
    return {
        menuState: false
    }
}
export const createMenuStore = (initialState: MenuState = defaultInitState) => {
    return createStore<MenuStore>()((set) => ({
        ...initialState,
        "TOGGLE_MENU"() {
            return set((store) => {
                return { menuState: !store.menuState }
            })
        },
    }))
}