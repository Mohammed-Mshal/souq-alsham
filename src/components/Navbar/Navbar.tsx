'use client'
import { useI18n, useCurrentLocale, useChangeLocale } from '@/locales/client'
import { Button } from '@headlessui/react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { GrLanguage } from 'react-icons/gr'
import Logo from 'static/logo.png'
import './Navbar.css'
import Profile from '../Buttons/Profile/Profile'
import { useAuthStore } from '@/providers/AuthProvider'
import { Fragment, useState } from 'react'
import {
    Dialog,
    DialogBackdrop,
    DialogPanel,
    Popover,
    PopoverButton,
    PopoverGroup,
    PopoverPanel,
    Tab,
    TabGroup,
    TabList,
    TabPanel,
    TabPanels,
} from '@headlessui/react'
import { Bars3Icon, MagnifyingGlassIcon, ShoppingBagIcon, XMarkIcon } from '@heroicons/react/24/outline'
const navigation = {
    categories: [
        {
            id: 'women',
            name: 'Women',
            featured: [
                {
                    name: 'New Arrivals',
                    href: '#',
                    imageSrc: '/mega-menu-category-01.jpg',
                    imageAlt: 'Models sitting back to back, wearing Basic Tee in black and bone.',
                },
                {
                    name: 'Basic Tees',
                    href: '#',
                    imageSrc: '/mega-menu-category-02.jpg',
                    imageAlt: 'Product'
                },
            ],
            sections: [
                {
                    id: 'clothing',
                    name: 'Clothing',
                    items: [
                        { name: 'Tops', href: '#' },
                        { name: 'Dresses', href: '#' },
                        { name: 'Pants', href: '#' },
                        { name: 'Denim', href: '#' },
                        { name: 'Sweaters', href: '#' },
                        { name: 'T-Shirts', href: '#' },
                        { name: 'Jackets', href: '#' },
                        { name: 'Activewear', href: '#' },
                        { name: 'Browse All', href: '#' },
                    ],
                },
                {
                    id: 'accessories',
                    name: 'Accessories',
                    items: [
                        { name: 'Watches', href: '#' },
                        { name: 'Wallets', href: '#' },
                        { name: 'Bags', href: '#' },
                        { name: 'Sunglasses', href: '#' },
                        { name: 'Hats', href: '#' },
                        { name: 'Belts', href: '#' },
                    ],
                },
                {
                    id: 'brands',
                    name: 'Brands',
                    items: [
                        { name: 'Full Nelson', href: '#' },
                        { name: 'My Way', href: '#' },
                        { name: 'Re-Arranged', href: '#' },
                        { name: 'Counterfeit', href: '#' },
                        { name: 'Significant Other', href: '#' },
                    ],
                },
            ],
        },
        {
            id: 'men',
            name: 'Men',
            featured: [
                {
                    name: 'New Arrivals',
                    href: '#',
                    imageSrc:
                        '/product-page-04-detail-product-shot-01.jpg',
                    imageAlt: 'Drawstring top with elastic loop closure and textured interior padding.',
                },
                {
                    name: 'Artwork Tees',
                    href: '#',
                    imageSrc: '/category-page-02-image-card-06.jpg',
                    imageAlt:
                        'Three shirts in gray, white, and blue arranged on table with same line drawing of hands and shapes overlapping on front of shirt.',
                },
            ],
            sections: [
                {
                    id: 'clothing',
                    name: 'Clothing',
                    items: [
                        { name: 'Tops', href: '#' },
                        { name: 'Pants', href: '#' },
                        { name: 'Sweaters', href: '#' },
                        { name: 'T-Shirts', href: '#' },
                        { name: 'Jackets', href: '#' },
                        { name: 'Activewear', href: '#' },
                        { name: 'Browse All', href: '#' },
                    ],
                },
                {
                    id: 'accessories',
                    name: 'Accessories',
                    items: [
                        { name: 'Watches', href: '#' },
                        { name: 'Wallets', href: '#' },
                        { name: 'Bags', href: '#' },
                        { name: 'Sunglasses', href: '#' },
                        { name: 'Hats', href: '#' },
                        { name: 'Belts', href: '#' },
                    ],
                },
                {
                    id: 'brands',
                    name: 'Brands',
                    items: [
                        { name: 'Re-Arranged', href: '#' },
                        { name: 'Counterfeit', href: '#' },
                        { name: 'Full Nelson', href: '#' },
                        { name: 'My Way', href: '#' },
                    ],
                },
            ],
        },
    ],
    pages: [
        { name: 'Company', href: '#' },
        { name: 'Stores', href: '#' },
    ],
}
export default function Navbar() {
    const t = useI18n()
    const locale = useCurrentLocale()
    const changeLocale = useChangeLocale()
    // const { menuState, TOGGLE_MENU } = stores.MenuStore(store => store)
    const authState = useAuthStore(state => state.user)
    const [open, setOpen] = useState(false)
    return (
        <div className="bg-white dark:bg-black">
            {/* Mobile menu */}
            <Dialog open={open} onClose={setOpen} className="relative z-50 lg:hidden">
                <DialogBackdrop
                    transition
                    className="fixed inset-0 bg-black/25 dark:bg-black transition-opacity duration-300 ease-linear data-closed:opacity-0"
                />
                <div className="fixed inset-0 z-40 flex">
                    <DialogPanel
                        transition
                        className={`relative flex w-full max-w-xs transform flex-col overflow-y-auto bg-white dark:bg-black pb-12 shadow-xl transition duration-300 ease-in-out ${locale === 'en' ? 'data-closed:-translate-x-full' : 'data-closed:translate-x-full'}`}
                    >
                        <div className="flex px-4 pt-5 pb-2 justify-between">
                            <Button
                                onClick={() => changeLocale(locale === 'en' ? 'ar' : 'en')}
                                className="flex items-center gap-2 px-4 py-2 cursor-pointer text-sm font-medium text-gray-700 dark:text-gray-200 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                            >
                                {locale === 'en' ? t('buttons.Arabic') : t('buttons.English')}
                                <GrLanguage className="size-4" />
                            </Button>
                            <Button
                                onClick={() => setOpen(false)}
                                className="relative cursor-pointer -m-2 inline-flex items-center justify-center rounded-md p-2 text-gray-500 dark:text-gray-300/90 hover:text-gray-700 dark:hover:text-gray-100/90 transition-colors"
                            >
                                <span className="absolute  -inset-0.5" />
                                <span className="sr-only">Close menu</span>
                                <XMarkIcon aria-hidden="true" className="size-6" />
                            </Button>
                        </div>
                        {/* Links */}
                        <TabGroup className="mt-2">
                            <div className="border-b border-gray-200 dark:border-gray-700/50">
                                <TabList className="-mb-px flex space-x-8 px-4">
                                    {navigation.categories.map((category) => (
                                        <Tab
                                            key={category.name}
                                            className="flex-1 border-b-2 border-transparent px-1 py-4 text-base font-medium whitespace-nowrap text-gray-700 dark:text-gray-200/90 data-selected:border-indigo-600 data-selected:text-indigo-500 dark:data-selected:text-indigo-400/90 transition-colors"
                                        >
                                            {category.name}
                                        </Tab>
                                    ))}
                                </TabList>
                            </div>
                            <TabPanels as={Fragment}>
                                {navigation.categories.map((category) => (
                                    <TabPanel key={category.name} className="space-y-10 px-4 pt-10 pb-8">
                                        <div className="grid grid-cols-2 gap-x-4">
                                            {category.featured.map((item) => (
                                                <div key={item.name} className="group relative text-sm">
                                                    <Image
                                                        width={40}
                                                        height={40}
                                                        alt={item.imageAlt}
                                                        src={item.imageSrc}
                                                        className="aspect-square w-full rounded-lg bg-gray-100 dark:bg-gray-800 object-cover group-hover:opacity-75 transition-opacity"
                                                    />
                                                    <Link href={item.href} className="mt-6 block font-medium text-gray-800 dark:text-gray-200 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                                                        <span aria-hidden="true" className="absolute inset-0 z-10" />
                                                        {item.name}
                                                    </Link>
                                                    <p aria-hidden="true" className="mt-1 text-gray-600 dark:text-gray-400">
                                                        Shop now
                                                    </p>
                                                </div>
                                            ))}
                                        </div>
                                        {category.sections.map((section) => (
                                            <div key={section.name}>
                                                <p id={`${category.id}-${section.id}-heading-mobile`} className="font-medium text-gray-800 dark:text-gray-200">
                                                    {section.name}
                                                </p>
                                                <ul

                                                    role="list"
                                                    aria-labelledby={`${category.id}-${section.id}-heading-mobile`}
                                                    className="mt-6 flex flex-col space-y-6"
                                                >
                                                    {section.items.map((item) => (
                                                        <li key={item.name} className="flow-root">
                                                            <Link href={item.href} className="-m-2 block p-2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200">
                                                                {item.name}
                                                            </Link>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        ))}
                                    </TabPanel>
                                ))}
                            </TabPanels>
                        </TabGroup>
                        <div className="space-y-6 border-t border-gray-200 dark:border-gray-700 px-4 py-6">
                            {navigation.pages.map((page) => (
                                <div key={page.name} className="flow-root">
                                    <Link href={page.href} className="-m-2 block p-2 font-medium text-gray-900 dark:text-gray-100">
                                        {page.name}
                                    </Link>
                                </div>
                            ))}
                        </div>

                        <div className="space-y-6 border-t border-gray-200 dark:border-gray-700 px-4 py-6">
                            <div className="flow-root">
                                <Link href="#" className="-m-2 block p-2 font-medium text-gray-900 dark:text-gray-100">
                                    Sign in
                                </Link>
                            </div>
                            <div className="flow-root">
                                <Link href="#" className="-m-2 block p-2 font-medium text-gray-900 dark:text-gray-100">
                                    Create account
                                </Link>
                            </div>
                        </div>

                        <div className="border-t border-gray-200 dark:border-gray-700 px-4 py-6">
                            <Link href="#" className="-m-2 flex items-center p-2">
                                <Image
                                    width={40}
                                    height={40}
                                    alt=""
                                    src={Logo}
                                    className="block h-auto w-5 shrink-0"
                                />
                                <span className="ml-3 block text-base font-medium text-gray-900 dark:text-gray-100100">CAD</span>
                                <span className="sr-only">, change currency</span>
                            </Link>
                        </div>
                    </DialogPanel>
                </div>
            </Dialog>
            <header className="relative bg-white dark:bg-black dark:border-b dark:border-indigo-900">
                <p className="flex h-10 items-center justify-center bg-indigo-600 dark:bg-indigo-800 px-4 text-sm font-medium text-white sm:px-6 lg:px-8">
                    Get free delivery on orders over $100
                </p>

                <nav aria-label="Top" className="container mx-auto max-w-[1620px] px-4">
                    <div className="border-b border-gray-200 dark:border-gray-800">
                        <div className="flex h-16 items-center justify-between">
                            <button
                                type="button"
                                onClick={() => setOpen(true)}
                                className="relative cursor-pointer rounded-md bg-white dark:bg-black p-2 text-gray-400 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-900 transition-colors lg:hidden"
                            >
                                <span className="absolute -inset-0.5" />
                                <span className="sr-only">Open menu</span>
                                <Bars3Icon aria-hidden="true" className="size-6" />
                            </button>

                            {/* Logo */}
                            <div className=" flex">
                                <Link href="#">
                                    <span className="sr-only">Your Company</span>
                                    <Image
                                        width={80}
                                        height={60}
                                        alt=""
                                        src={Logo}
                                        className="invert-100 dark:invert-0"
                                    />
                                </Link>
                            </div>

                            {/* Flyout menus */}
                            <PopoverGroup className="hidden lg:ml-8 lg:block lg:self-stretch">
                                <div className="flex h-full space-x-8">
                                    {navigation.categories.map((category) => (
                                        <Popover key={category.name} className="flex">
                                            <div className="relative flex">
                                                <PopoverButton className="relative z-10 -mb-px flex items-center border-b-2 border-transparent outline-none cursor-pointer pt-px text-sm font-medium text-gray-700 dark:text-gray-200 transition-colors duration-200 ease-out hover:text-gray-800 dark:hover:text-white data-open:border-indigo-600 data-open:text-indigo-600 dark:data-open:text-indigo-400">
                                                    {category.name}
                                                </PopoverButton>
                                            </div>

                                            <PopoverPanel
                                                transition
                                                className="absolute inset-x-0 top-full text-sm text-gray-500 dark:text-gray-300 transition data-closed:opacity-0 data-enter:duration-200 data-enter:ease-out data-leave:duration-150 data-leave:ease-in z-[100]"
                                            >
                                                <div aria-hidden="true" className="absolute inset-0 top-1/2 bg-white dark:bg-black shadow-lg dark:shadow-gray-800/30" />

                                                <div className="relative bg-white dark:bg-black">
                                                    <div className="mx-auto max-w-7xl px-8">
                                                        <div className="grid grid-cols-2 gap-x-8 gap-y-10 py-16">
                                                            <div className="col-start-2 grid grid-cols-2 gap-x-8">
                                                                {category.featured.map((item) => (
                                                                    <div key={item.name} className="group relative text-base sm:text-sm">
                                                                        <Image
                                                                            width={40}
                                                                            height={40}
                                                                            alt={item.imageAlt}
                                                                            src={item.imageSrc}
                                                                            className="aspect-square w-full rounded-lg bg-gray-100 dark:bg-gray-900 object-cover group-hover:opacity-75 transition-opacity"
                                                                        />
                                                                        <Link href={item.href} className="mt-6 block font-medium text-gray-900 dark:text-gray-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                                                                            <span aria-hidden="true" className="absolute inset-0 z-10" />
                                                                            {item.name}
                                                                        </Link>
                                                                        <p aria-hidden="true" className="mt-1 text-gray-500 dark:text-gray-400">
                                                                            Shop now
                                                                        </p>
                                                                    </div>
                                                                ))}
                                                            </div>
                                                            <div className="row-start-1 grid grid-cols-3 gap-x-8 gap-y-10 text-sm">
                                                                {category.sections.map((section) => (
                                                                    <div key={section.name}>
                                                                        <p id={`${section.name}-heading`} className="font-medium text-gray-900 dark:text-gray-100">
                                                                            {section.name}
                                                                        </p>
                                                                        <ul
                                                                            role="list"
                                                                            aria-labelledby={`${section.name}-heading`}
                                                                            className="mt-6 space-y-6 sm:mt-4 sm:space-y-4"
                                                                        >
                                                                            {section.items.map((item) => (
                                                                                <li key={item.name} className="flex">
                                                                                    <Link href={item.href} className="text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                                                                                        {item.name}
                                                                                    </Link>
                                                                                </li>
                                                                            ))}
                                                                        </ul>
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </PopoverPanel>
                                        </Popover>
                                    ))}

                                    {navigation.pages.map((page) => (
                                        <Link
                                            key={page.name}
                                            href={page.href}
                                            className="flex items-center text-sm font-medium text-gray-700 dark:text-gray-200 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                                        >
                                            {page.name}
                                        </Link>
                                    ))}
                                </div>
                            </PopoverGroup>

                            <div className="flex items-center">
                                <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
                                    <Link href="#" className="text-sm font-medium text-gray-700 dark:text-gray-200 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                                        Sign in
                                    </Link>
                                    <span aria-hidden="true" className="h-6 w-px bg-gray-200 dark:bg-gray-700" />
                                    <Link href="#" className="text-sm font-medium text-gray-700 dark:text-gray-200 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                                        Create account
                                    </Link>
                                </div>

                                <div className="hidden lg:ml-8 lg:flex">
                                    <Link href="#" className="flex items-center text-gray-700 dark:text-gray-200 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                                        <Image
                                            width={40}
                                            height={40}
                                            alt=""
                                            src={Logo}
                                            className="block h-auto w-5 shrink-0 dark:invert"
                                        />
                                        <span className="ml-3 block text-sm font-medium">CAD</span>
                                        <span className="sr-only">, change currency</span>
                                    </Link>
                                </div>

                                {/* Search */}
                                <div className="flex lg:ml-6">
                                    <Link href="#" className="p-2 text-gray-400 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                                        <span className="sr-only">Search</span>
                                        <MagnifyingGlassIcon aria-hidden="true" className="size-6" />
                                    </Link>
                                </div>

                                {/* Cart */}

                                <div className="ml-4 flow-root lg:ml-6">
                                    <Link href="#" className="group -m-2 flex items-center p-2">
                                        <ShoppingBagIcon
                                            aria-hidden="true"
                                            className="size-6 shrink-0 text-gray-400 dark:text-gray-300 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors"
                                        />
                                        <span className="ml-2 text-sm font-medium text-gray-700 dark:text-gray-200 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">0</span>
                                        <span className="sr-only">items in cart, view bag</span>
                                    </Link>
                                </div>
                                {
                                    /* Profile */
                                    authState &&
                                    <Profile />
                                }
                            </div>
                        </div>
                    </div>
                </nav>
            </header>
        </div>
    )
}
