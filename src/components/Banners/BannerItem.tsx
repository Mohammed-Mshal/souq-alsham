'use client'
import {  useI18n } from '@/locales/client'
import { Banner } from '@/types/Banner'
import Image from 'next/image'
import React from 'react'
// import { motion } from 'motion/react'
import './BannerItem.css'
export default function BannerItem({ bannerItem }: { bannerItem?: Banner, }) {
    const t = useI18n()
    return (
        <div className='item-slide relative h-full flex'>
            <div className="bg-banner absolute top-0 left-0 w-full h-full -z-10">
                {
                    bannerItem?.bgBanner &&
                    <Image src={bannerItem.bgBanner} alt="banner" className="bg-img w-full h-full object-cover" width={1920} height={732} />
                }
            </div>
            <div className="container max-w-[1620px] mx-auto px-4 flex justify-between items-center py-20">
                <div className="left-side max-w-xl flex flex-col gap-4 items-start">
                    <h1 className="main-title 2xl:text-6xl xl:text-5xl lg:text-4xl md:text-3xl text-2xl text-white"
                    >
                        {bannerItem?.title}
                    </h1>
                    <div className="main-desc lg:text-xl md:text-lg text-base text-white/80">
                        {
                            bannerItem?.description
                        }
                    </div>
                    <a href={bannerItem?.btnText} className="main-btn bg-white hover:bg-white/80 rounded-lg px-4 py-2">
                        {
                            t('buttons.shop_now')
                        }
                    </a>
                </div>
                {
                    bannerItem?.image ?
                        <div className="right-side rounded-2xl overflow-hidden">
                            <Image src={bannerItem?.image} alt="banner" className="main-img" width={800} height={500} />
                        </div>
                        : bannerItem?.video ?
                            <div className="right-side rounded-2xl overflow-hidden">
                                <video autoPlay loop muted className="main-video">
                                    <source src={bannerItem?.video} type="video/mp4" />
                                </video>
                            </div>
                            : bannerItem?.youtube ?
                                <div className="right-side rounded-2xl overflow-hidden">
                                    <iframe width="800" height="500" src={bannerItem?.youtube} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
                                </div>
                                : null
                }
            </div>
        </div>
    )
}
