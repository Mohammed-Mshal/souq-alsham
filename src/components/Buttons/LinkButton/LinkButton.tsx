import Link from 'next/link'
import React from 'react'
import './LinkButton.css'
export default function LinkButton({ link, text, typeButton }: { link: string, text: string, typeButton: 'v1' | 'v2' }) {
  return (
    <Link href={link} className={`link-button py-2 px-6 w-40 flex items-center justify-center border border-black dark:border-indigo-800 dark:hover:bg-indigo-600 rounded-lg ${typeButton === 'v1' ? 'backdrop-blur-lg hover:bg-black hover:text-white' : 'bg-black hover:bg-[#2f2f2f] text-white dark:bg-indigo-800  dark:hover:shadow-lg dark:hover:shadow-black/20 dark:text-white'} `}>
      {
        text
      }
    </Link>
  )
}
