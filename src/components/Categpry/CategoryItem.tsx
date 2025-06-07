import React from 'react'
import { ArrowRightCircleIcon } from '@heroicons/react/16/solid'
import Image from 'next/image'
import Link from 'next/link'
export default function CategoryItem() {
    return (
        <div className="category flex-1 relative group overflow-hidden">
            <Link href={'#'} className='absolute top-0 left-0 w-full h-full z-10'></Link>
            <Image alt='Category Name' src={'/category.jpg'} height={300} width={500} className='h-auto w-full group-hover:scale-125 group-hover:brightness-50' />
            <div className="arrow text-white absolute top-1/2 left-1/2 -translate-1/2 w-8 h-8 opacity-0 scale-0 group-hover:scale-100 group-hover:opacity-100">
                <ArrowRightCircleIcon className='w-full h-full object-contain' />
            </div>
        </div>)
}
