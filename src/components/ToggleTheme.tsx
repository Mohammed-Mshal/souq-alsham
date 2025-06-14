'use client'
import { Button } from '@headlessui/react'
import React from 'react'
import { FiMoon, FiSun } from 'react-icons/fi'

export default function ToggleTheme({ toggleTheme, theme }: { toggleTheme: (newTheme: "dark" | 'light') => void, theme: "dark" | 'light' }) {
    return (
        <Button
            className={'fixed cursor-pointer bottom-10 right-5 backdrop-blur-2xl dark:border-indigo-500 border-black hover:bg-black bg-black/5 hover:text-white dark:text-indigo-500 dark:hover:bg-indigo-500 dark:bg-indigo-500/5 dark:hover:text-white border rounded-full h-10 w-10 flex justify-center items-center z-30'}
            onClick={() => {
                toggleTheme(theme === 'dark' ? 'light' : 'dark')
            }}>
            {
                theme === 'dark' ? <FiSun /> : <FiMoon />
            }
        </Button>
    )
}
