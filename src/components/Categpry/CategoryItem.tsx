import React from 'react'
import { ArrowRightCircleIcon } from '@heroicons/react/16/solid'
import Image from 'next/image'
import Link from 'next/link'
export default function CategoryItem({ link, thumbnail }: { link: string, thumbnail: string }) {
    return (
        <div className="category relative group overflow-hidden aspect-video rounded-lg shadow-md hover:shadow-xl transition-all duration-300">
            <Link href={link} className="absolute top-0 left-0 w-full h-full z-10">
                <span className="sr-only">View category</span>
            </Link>
            <Image
                alt="Category Name"
                src={thumbnail}
                height={300}
                width={500}
                className="h-full w-full object-cover transition-all duration-500 group-hover:scale-110 group-hover:brightness-75"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="arrow text-white absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 opacity-0 scale-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-300 transform group-hover:rotate-0 rotate-45">
                <ArrowRightCircleIcon className="w-full h-full object-contain filter drop-shadow-lg" />
            </div>
        </div>
    )
}
