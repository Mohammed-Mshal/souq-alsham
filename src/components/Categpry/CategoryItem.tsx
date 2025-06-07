import React from 'react'
import { ArrowRightCircleIcon } from '@heroicons/react/16/solid'
import Image from 'next/image'
import Link from 'next/link'
export default function CategoryItem({ link, thumbnail }: { link: string, thumbnail: string }) {
    return (
        <div className={`category relative group overflow-hidden aspect-video`}>
            <Link href={link} className='absolute top-0 left-0 w-full h-full z-10'></Link>
            <Image alt='Category Name' src={thumbnail} height={300} width={500} className='h-full w-full object-cover group-hover:scale-125 group-hover:brightness-50' />
            <div className="arrow text-white absolute top-1/2 left-1/2 -translate-1/2 w-8 h-8 opacity-0 scale-0 group-hover:scale-100 group-hover:opacity-100">
                <ArrowRightCircleIcon className='w-full h-full object-contain' />
            </div>
        </div>)
}
