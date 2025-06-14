import ListAds from '@/components/ListAds/ListAds'
import TitleSection from '@/components/Titles/TitleSection'
import React from 'react'
const listAds = [
    {
        id: '1',
        title: 'Title Ads',
        image: '/product-1.jpg',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam voluptatem sequi magnam similique, rem aliquid commodi perferendis incidunt molestiae quo maxime sed quos fuga provident numquam minus nesciunt. Impedit, voluptatem.',
        ownerImage: '/product-1.jpg',
        ownerName: 'Owner Name'
    },
    {
        id: '2',
        title: 'Title Ads',
        image: '/product-1.jpg',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam voluptatem sequi magnam similique, rem aliquid commodi perferendis incidunt molestiae quo maxime sed quos fuga provident numquam minus nesciunt. Impedit, voluptatem.',
        ownerImage: '/product-1.jpg',
        ownerName: 'Owner Name'
    },
    {
        id: '3',
        title: 'Title Ads',
        image: '/product-1.jpg',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam voluptatem sequi magnam similique, rem aliquid commodi perferendis incidunt molestiae quo maxime sed quos fuga provident numquam minus nesciunt. Impedit, voluptatem.',
        ownerImage: '/product-1.jpg',
        ownerName: 'Owner Name'
    },
    {
        id: '4',
        title: 'Title Ads',
        image: '/product-1.jpg',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam voluptatem sequi magnam similique, rem aliquid commodi perferendis incidunt molestiae quo maxime sed quos fuga provident numquam minus nesciunt. Impedit, voluptatem.',
        ownerImage: '/product-1.jpg',
        ownerName: 'Owner Name'
    },
    {
        id: '5',
        title: 'Title Ads',
        image: '/product-1.jpg',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
        ownerImage: '/product-1.jpg',
        ownerName: 'Owner Name'
    },
]
export default function FeaturedAds() {
    return (
        <div className='Featured-Ads'>
            <div className="container mx-auto max-w-[1620px] px-4 py-10">
                <div className="header-section flex justify-between gap-4 items-center mb-6">
                    <TitleSection title='Featured Ads' />
                    <div className="navigation-ads flex gap-2">
                        <div className="swiper-button-prev-ads cursor-pointer border border-black dark:border-white text-black dark:text-white rounded-full flex items-center justify-center p-1 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black">
                            <svg xmlns="URL_ADDRESS.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                            </svg>
                        </div>
                        <div className="swiper-button-next-ads cursor-pointer border border-black dark:border-white text-black dark:text-white rounded-full flex items-center justify-center p-1 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black">
                            <svg xmlns="URL_ADDRESS.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                            </svg>
                        </div>
                    </div>
                </div>
                <div className="list-ads">
                    <ListAds ListAds={listAds} />
                </div>
            </div>
        </div >
    )
}
