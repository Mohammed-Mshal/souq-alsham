import Link from 'next/link'
import React from 'react'
import './LinkButton.css'
export default function LinkButton({ link, text }: { link: string, text: string }) {
  return (
    <Link href={link} className="link-button py-2 px-6 w-40 flex items-center justify-center border rounded-3xl backdrop-blur-3xl">
      {
        text
      }
    </Link>
  )
}
