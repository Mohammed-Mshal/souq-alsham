'use client'
import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination, Navigation } from 'swiper/modules'
import CardAds from '../CardAds/CardAds'
import './ListAds.css'
interface ProductCard {
    id: string,
    title: string,
    image: string,
    description: string,
    ownerImage: string,
    ownerName: string
}
export default function ListAds({ ListAds }: { ListAds: ProductCard[] }) {
    return (
        <Swiper
            modules={[Pagination, Navigation]}
            autoplay={{
                delay: 3000,
                disableOnInteraction: false,
                pauseOnMouseEnter: true
            }}
            pagination={{
                clickable: true,
                dynamicBullets: true,
                dynamicMainBullets: 2,
                renderBullet: (index, className) => {
                    return `<span class="${className}" 
                    style="
                    width: 12px;
                    height: 12px;
                    transition: all 300ms ease;"
                    ></span>`;
                },
                bulletActiveClass: 'swiper-pagination-bullet-active',
                bulletClass: 'swiper-pagination-bullet'
            }}
            navigation={{
                enabled: true,
                nextEl: '.swiper-button-next-ads',
                prevEl: '.swiper-button-prev-ads'
            }}
            speed={800}
            loop={true}
            centerInsufficientSlides={true}
            spaceBetween={30}
            grabCursor={true}
            className='slider-ads w-full'
            style={{ height: 'auto' }}
            effect={'slide'}
            breakpoints={{
                1400: {
                    slidesPerView: 4,
                    spaceBetween: 40
                },
                1200: {
                    slidesPerView: 3,
                    spaceBetween: 30
                },
                768: {
                    slidesPerView: 2,
                    spaceBetween: 20
                },
                300: {
                    slidesPerView: 1,
                    centeredSlides: true,
                    spaceBetween: 10
                }
            }}
        >
            {
                ListAds.map((ads) => {
                    return (
                        <SwiperSlide key={ads.id} className='flex' style={{ height: 'auto' }}>
                            <CardAds
                                id={ads.id}
                                image={ads.image}
                                ownerImage={ads.ownerImage}
                                description={ads.description}
                                title={ads.title}
                                ownerName={ads.ownerName}
                            />
                        </SwiperSlide>
                    )
                })
            }
        </Swiper>
    )
}
