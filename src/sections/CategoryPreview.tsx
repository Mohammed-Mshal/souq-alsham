import CategoryItem from '@/components/Categpry/CategoryItem'
import React from 'react'
const categories = [
    {
        id: 1,
        thumbnail: '/category.jpg',
        link: '/categories/men',
        bg: ''
    },
    {
        id: 1,
        thumbnail: '/category2.jpg',
        link: '/categories/women',
        bg: ''
    },
    {
        id: 1,
        thumbnail: '/category3.jpg',
        link: '/categories/beauty',
        bg: ''
    },
    {
        id: 1,
        thumbnail: '/category4.png',
        link: '/categories/discounts',
        bg: ''
    },
    {
        id: 1,
        thumbnail: '/category5.jpg',
        link: '/categories/top-category',
        bg: ''
    },
]
export default function CategoryPreview() {
    return (
        <div className='categories'>
            <div className="container mx-auto max-w-[1620px] grid grid-cols-3 py-12 grid-flow-dense gap-12">
                <CategoryItem />
                <CategoryItem />
                <CategoryItem />
                <CategoryItem />
                <CategoryItem />
            </div>
        </div>
    )
}
