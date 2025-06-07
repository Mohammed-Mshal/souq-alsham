"use client"
import { ReactNode, useEffect } from 'react'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface User {
    id: string
    email: string
    name?: string
}

type AuthState = {
    user: User | null
    setUser: (user: User | null) => void
    logout: () => void
    isAuthenticated: boolean
}

export const useAuthStore = create<AuthState>()(
    persist(
        (set) => ({
            user: null,
            isAuthenticated: false,
            setUser: (user: User | null) => {
                set({ user, isAuthenticated: !!user })
            },
            logout: () => {
                set({ user: null, isAuthenticated: false })
            }
        }),
        {
            name: 'auth-storage',
            skipHydration: true,
        }
    )
)

export function AuthProvider({
    initialSession,
    children
}: {
    initialSession: { user: User | null }
    children: ReactNode
}) {
    const setUser = useAuthStore(state => state.setUser)

    useEffect(() => {
        // Hydrate auth state from localStorage
        useAuthStore.persist.rehydrate()

        // Set initial session if available
        if (initialSession?.user) {
            setUser(initialSession.user)
        }
    }, [initialSession, setUser])

    return (
        <>{children}</>
    )
}