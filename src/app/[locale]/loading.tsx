import React from 'react'

export default function Loading() {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-white/80 dark:bg-black/90 backdrop-blur-sm z-50">
            <div className="flex flex-col items-center gap-4">
                <div className="relative w-16 h-16">
                    <div className="absolute top-0 left-0 w-full h-full border-4 border-indigo-200 dark:border-indigo-700 rounded-full animate-pulse"></div>
                    <div className="absolute top-0 left-0 w-full h-full border-4 border-transparent border-t-indigo-600 dark:border-t-indigo-400 rounded-full animate-spin"></div>
                    <div className="absolute top-0 left-0 w-full h-full border-4 border-transparent border-r-indigo-500 dark:border-r-indigo-300 rounded-full animate-spin" style={{ animationDuration: '1.5s' }}></div>
                </div>
                <p className="text-lg font-medium text-gray-700 dark:text-gray-200 animate-bounce">Loading...</p>
            </div>
        </div>
    )
} 