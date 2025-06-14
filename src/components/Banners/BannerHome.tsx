'use client'
import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination, EffectFade, Autoplay } from 'swiper/modules'

import BannerItem from './BannerItem';
import { Banner } from '@/types/Banner';
import { useTheme } from '@/providers/ThemeProvider';
const bannerItems: Banner[] = [{
    id: 1,
    title: 'Shop the latest fashion trends',
    description: 'Shop the latest fashion trends with our exclusive collection of shoes.',
    bgBanner: '/banner/banner1.jpg',
    btnText: 'Shop Now',
    btnLink: '/shop',
}, {
    id: 2,
    title: 'Shop the latest fashion trends',
    description: 'Shop the latest fashion trends with our exclusive collection of shoes.',
    bgBanner: '/banner/banner-3.jpeg',
    btnText: 'Shop Now',
    btnLink: '/shop',
}]
export default function BannerHome() {
    const themeStore = useTheme()

    return (
        <div className='banner relative z-0'>
            <Swiper
                className='h-screen lg:max-h-[700px] md:max-h-[500px] max-h-[400px] w-full'
                slidesPerView={1}
                spaceBetween={40}
                modules={[Pagination, EffectFade, Autoplay]}
                effect='fade'
                fadeEffect={{
                    crossFade: true,
                }}
                speed={500}
                centerInsufficientSlides={true}
                loop={true}
                rewind={true}
                pagination={{
                    clickable: true,
                }}
                autoplay={{
                    delay: 3000,
                    waitForTransition: true
                }}

            >
                {
                    bannerItems.map((bannerItem) => {
                        return <SwiperSlide key={bannerItem.id}>
                            <BannerItem bannerItem={bannerItem} />
                        </SwiperSlide>
                    })
                }
            </Swiper>
            <div className="wave absolute bottom-0 z-10 h-auto w-full overflow-hidden">
                <svg
                    viewBox="0 0 100 15"
                    className="wave wave-top w-full h-[150px]"
                    preserveAspectRatio="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <defs>
                        <linearGradient id="waveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" style={{ stopColor: `${themeStore.theme === 'dark' ? 'black' : 'oklch(92.8% .006 264.531)'}`,  }} />
                            <stop offset="100%" style={{ stopColor: `${themeStore.theme === 'dark' ? 'black' : 'oklch(92.8% .006 264.531)'}`, }} />
                        </linearGradient>
                    </defs>
                    <path
                        fill="url(#waveGradient)"
                        d="M 0 20 V 8 Q 25 5 55 8 T 100 8 V 20 Z"
                        className="transition-all duration-300 ease-in-out"
                    >
                        <animate
                            attributeName="d"
                            dur="5s"
                            repeatCount="indefinite"
                            values="
                                M 0 20 V 8 Q 25 5 55 8 T 100 8 V 20 Z;"
                        />
                    </path>
                </svg>
            </div>
        </div>
    )
}
