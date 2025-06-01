'use client'
import { useI18n, useCurrentLocale, useChangeLocale } from '@/locales/client'
import { Button } from '@headlessui/react'
// import { AnimatePresence, motion } from 'motion/react'
import { Cairo, Raleway } from 'next/font/google'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { GrLanguage } from 'react-icons/gr'
import { HiMenuAlt1 } from 'react-icons/hi'
import Logo from 'static/logo.png'
import LinkButton from '../Buttons/LinkButton/LinkButton'
import { stores } from '@/stores/store'
import './Navbar.css'
const raleway = Raleway({
    variable: '--font-raleway-sans',
    weight: ['100', '200', '300', '400', '500', '600', '700', '800', "900"],
    subsets: ['latin']
})
const cairo = Cairo({
    variable: '--font-raleway-sans',
    weight: ['1000', '200', '300', '400', '500', '600', '700', '800', "900"],
    subsets: ['latin']
})
export default function Navbar() {
    const t = useI18n()
    const locale = useCurrentLocale()
    const changeLocale = useChangeLocale()
    const { menuState, TOGGLE_MENU } = stores.MenuStore(store => store)
    return (
        <div className="navbar shadow-xl border-b border-black/40  sticky top-0 left-0 w-full bg-indigo-500 dark:bg-indigo-800 text-white">
            <div className="container max-w-[1620px] mx-auto p-4 flex items-center justify-between gap-8">
                <Link href={'/'} className="logo">
                    <Image src={Logo} priority alt='Logo' width={100} height={60} />
                </Link>
                <div className={`links flex flex-1 items-center justify-center gap-8 2xl:static fixed
                 top-0 left-0 w-full h-dvh lg:w-auto lg:h-auto flex-col lg:flex-row bg-indigo-700/40
                  dark:bg-indigo-800/20 backdrop-blur-3xl lg:bg-transparent 2xl:opacity-100 2xl:pointer-events-auto ${menuState ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
                    <Link href={'/'} className="link hover-link">
                        {
                            t('nav.Home')
                        }
                    </Link>
                    <Link href={'/about'} className="link hover-link">
                        {
                            t('nav.About')
                        }
                    </Link>
                    <Link href={'/contact'} className="link hover-link">
                        {
                            t('nav.Contact')
                        }
                    </Link>
                </div>
                <div className="buttons flex items-center gap-4">
                    <LinkButton text={t('buttons.Login')} link={'/login'} />
                    <LinkButton text={t('buttons.Register')} link={'/register'} />
                    <Button
                        as="a"
                        className={`btn btn-secondary flex items-center gap-2 cursor-pointer z-10 hover-link  ${locale === 'ar' ? raleway.className : cairo.className}`}
                        onClick={() => {
                            changeLocale(locale === 'ar' ? 'en' : 'ar')
                        }}>
                        <GrLanguage />
                        {locale === 'ar' ? t('buttons.English') : t('buttons.Arabic')}
                    </Button>
                    <div className="toggleMenu text-2xl flex 2xl:hidden cursor-pointer" onClick={() => {
                        TOGGLE_MENU()
                    }}>
                        <HiMenuAlt1 className={`${locale === 'en' ? '-scale-100' : "scale-100"}`} />
                    </div>
                </div>
            </div>
        </div>
    )
}

