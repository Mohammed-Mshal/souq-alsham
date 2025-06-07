'use client'
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { useChangeLocale, useCurrentLocale, useI18n } from '@/locales/client'
import { useAuthStore } from '@/providers/AuthProvider'
import { Button } from '@headlessui/react'
import { GrLanguage } from 'react-icons/gr'
import Profile from '../Buttons/Profile/Profile'
import { Cairo, Raleway } from 'next/font/google'
import { MdArrowDropDown } from 'react-icons/md'
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
export default function NavbarSite() {
    const t = useI18n()
    const locale = useCurrentLocale()
    const changeLocale = useChangeLocale()
    const authState = useAuthStore(state => state.user)
    return (
        <div className="navbar-second shadow-xl border-b border-black/40 hidden md:block  sticky top-0 left-0 w-full bg-white dark:bg-black text-black dark:text-white z-50">
            <div className="container max-w-[1620px] mx-auto px-4 py-1 flex items-center justify-between gap-8">
                <div className={`links flex items-center gap-8 static
            top-0 left-0 w-auto 2xl:h-auto flex-row bg-white/40
            dark:bg-black/20 backdrop-blur-2xl lg:bg-transparent opacity-100 pointer-events-auto `}>
                    <SubList title={t('nav.faqs')} listLinks={[{ link: '/', title: 'Create' }]} />
                    <Link href={'/about'} className="link hover-link text-sm">
                        {
                            t('nav.About')
                        }
                    </Link>
                    <Link href={'/contact'} className="link hover-link text-sm">
                        {
                            t('nav.Contact')
                        }
                    </Link>
                </div>
                <div className="general-settings">
                    <Button
                        as="a"
                        className={`btn btn-secondary flex items-center gap-2 cursor-pointer hover-link text-xs ${locale === 'ar' ? raleway.className : cairo.className}`}
                        onClick={() => {
                            changeLocale(locale === 'ar' ? 'en' : 'ar')
                        }}>
                        <GrLanguage />
                        {locale === 'ar' ? t('buttons.English') : t('buttons.Arabic')}
                    </Button>
                </div>
                <div className="buttons flex items-center gap-4 z-10">

                    <Link href={'/wishlist'} className='hover-link text-xs'>
                        {t('nav.wishlist')}
                    </Link>
                    {
                        authState === null ?
                            <div className='flex gap-4 text-xs'>
                                <Link href={'/auth/login'} className='hover-link '>
                                    {t('buttons.Login')}
                                </Link>
                                <Link href={'/auth/signup'} className='hover-link '>
                                    {t('buttons.Register')}
                                </Link>
                            </div>

                            :
                            <Profile />
                    }
                </div>
            </div>
        </div>
    )
}




function SubList({ title, listLinks }: { title: string, listLinks: { link: string, title: string }[] }) {
    const locale = useCurrentLocale()

    const [stateList, setStateList] = useState<boolean>(false)
    function toggleList() {
        setStateList(!stateList)
    }
    // Handle click outside to close dropdown
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            const containerElement = document.querySelector('.container-sublist');
            if (containerElement && !containerElement.contains(event.target as Node)) {
                setStateList(false);
            }
        }
        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);
    return <div className='flex container-sublist relative'>
        <button className='toggle-sublist cursor-pointer text-xs hover-link flex items-center gap-1' onClick={toggleList}>
            {
                title
            }
            <MdArrowDropDown />
        </button>
        <ul className={`
        
          absolute top-full 
          backdrop-blur-md
          bg-white/90 dark:bg-black/90
          shadow-lg border border-gray-600/20 dark:border-gray-200/20
          z-20
          transition-all duration-300 ease-in-out
          flex flex-col 
          min-w-[220px]
          ${stateList ? 'opacity-100 translate-y-2 scale-100' : 'opacity-0 -translate-y-4 scale-95 pointer-events-none'}
          ${locale === 'ar' ? 'right-0' : 'left-0'} 
          rounded-2xl
          p-2
        `}>
            {listLinks.map((link) => (
                <li key={link.link} className='flex rounded-xl overflow-hidden'>
                    <Link
                        href={link.link}
                        className='py-3 px-6 flex-1 text-xs font-medium 
                        hover:bg-gray-100/70 dark:hover:bg-gray-800/70
                        hover:text-primary transition-all duration-200
                        rounded-xl'
                    >
                        {link.title}
                    </Link>
                </li>
            ))}
        </ul>
    </div>
}