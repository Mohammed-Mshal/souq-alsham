'use client'
import ToggleTheme from "@/components/ToggleTheme"
import { ReactNode, useState, createContext, useEffect } from "react"

export const ThemeContext = createContext<'light' | 'dark'>('light')

export const ThemeProvider = ({ children }: { children: ReactNode }) => {

    const [theme, setTheme] = useState<'light' | 'dark'>('light')
    const toggleTheme = () => {
        setTheme((prev) => prev === 'dark' ? 'light' : 'dark')
    }
    useEffect(() => {
        const initialTheme = () => {
            if (localStorage.getItem('theme-souq-alsham') === 'light') {
                setTheme('light')
            } else {
                setTheme('dark')
            }
        }
        initialTheme()
    }, [])
    useEffect(() => {
        localStorage.setItem('theme-souq-alsham', theme)
    }, [theme])
    return (
        <ThemeContext.Provider value={theme}>
            <div className="theme-page bg-gray-200 dark:bg-black/90" data-theme={theme}>
                {children}
                <ToggleTheme toggleTheme={toggleTheme} theme={theme} />
            </div>
        </ThemeContext.Provider>
    )
}