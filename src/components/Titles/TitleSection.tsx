import React from 'react'

interface TitleSectionProps {
    title: string;
    className?: string;
}

export default function TitleSection({ title, className = '' }: TitleSectionProps) {
    return (
        <h2 className={`text-2xl md:text-3xl lg:text-4xl tracking-tight text-gray-900 dark:text-white mb-6 transition-colors duration-200 font-bold ${className}`}>
            {title}
        </h2>
    )
}
