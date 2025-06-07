import CategoryItem from '@/components/Categpry/CategoryItem'
import TitleSection from '@/components/Titles/TitleSection'
import { getI18n } from '@/locales/server'
import React from 'react'
const categories = [
    {
        id: 1,
        thumbnail: '/category.jpg',
        link: '/categories/men',
    },
    {
        id: 2,
        thumbnail: '/category2.png',
        link: '/categories/women',
    },
    {
        id: 3,
        thumbnail: '/category3.jpg',
        link: '/categories/beauty',
    },
    {
        id: 4,
        thumbnail: '/category4.png',
        link: '/categories/discounts',
    },
    {
        id: 5,
        thumbnail: '/category5.png',
        link: '/categories/top-category',
    },
]
export default async function CategoryPreview() {
    const t = await getI18n()
    return (
        <div className='categories'>
            <div className="container mx-auto max-w-[1620px] px-4 flex flex-col gap-4 py-12">
                <TitleSection title={t('title_sections.shop_by_category')} />
                <div className="list-categories grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-7">

                    {
                        categories.map((category) => {
                            return <CategoryItem key={category.id} link={category.link} thumbnail={category.thumbnail} />
                        })
                    }
                </div>
            </div>
        </div>
    )
}
