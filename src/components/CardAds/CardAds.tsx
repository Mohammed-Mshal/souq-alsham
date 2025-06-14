import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

interface ProductCard {
    id: string,
    title: string,
    image: string,
    description: string,
    ownerImage: string,
    ownerName: string,
}

export default function CardAds({ id, title, description, image, ownerImage, ownerName }: ProductCard) {
    return (
        <div className='Card-Ads rounded-2xl overflow-hidden flex flex-col border dark:border-white/70 border-gray-200 relative shadow-lg dark:shadow-white/10 hover:shadow-lg dark:hover:shadow-white/20 transition-all duration-300 transform hover:-translate-y-1 hover:border-primary/30 bg-gradient-to-b from-transparent dark:to-white/5 to-gray-50/80 dark:backdrop-blur-sm backdrop-blur-[2px] h-full'>
            <Link href={`/products/${id}`} className='absolute top-0 left-0 w-full h-full z-10'></Link>
            <div className="header-card h-[200px] w-full">
                <Image alt='Product Name' src={image} width={300} height={200} className='h-full w-full' />
            </div>
            <div className="body-card p-4 bg-white/90 dark:bg-black/20 flex flex-col lg:gap-4 gap-2 flex-1 dark:text-white text-gray-900">
                <h3 className="product-name xl:text-3xl lg:text-2xl md:text-xl text-lg font-bold">
                    {title}
                </h3>
                <div className="description lg:text-lg text-base line-clamp-3 flex-1">
                    {description}
                </div>
                <div className="owner flex items-center gap-2">
                    <div className="profile-owner h-8 w-8 rounded-full overflow-hidden">
                        <Image src={ownerImage} alt={`Name Owner`} width={20} height={20} className='w-full h-full object-contain' />
                    </div>
                    <h5 className="ownerName">
                        {ownerName}
                    </h5>
                </div>
            </div>
        </div>
    )
}
