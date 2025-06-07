'use client'
import ToggleTheme from "@/components/ToggleTheme"
import { ReactNode, useState, createContext, useContext, useEffect } from "react"
type ThemeContextType = {
    theme: 'dark' | 'light',
    toggleTheme: (newTheme: 'dark' | 'light') => void
}

export const ThemeContext = createContext<ThemeContextType>({
    theme: 'light',
    toggleTheme: () => { }
})

export const useTheme = () => {
    const context = useContext(ThemeContext)
    if (!context) {
        throw new Error('useTheme must be used within a ThemeProvider')
    }
    return context
}

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
    const [theme, setTheme] = useState<'light' | 'dark'>('light')

    const toggleTheme = (newTheme: 'dark' | 'light') => {
        setTheme(newTheme)
        localStorage.setItem('theme-souq-alsham', newTheme)
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

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            <div className="theme-page bg-gray-200 dark:bg-black/90" data-theme={theme}>
                {children}
                <ToggleTheme toggleTheme={toggleTheme} theme={theme} />
            </div>
        </ThemeContext.Provider>
    )
}