'use client'
import { useCurrentLocale, useI18n } from '@/locales/client';
import { useAuthStore } from '@/providers/AuthProvider';
import Image from 'next/image';
import Link from 'next/link'
import React from 'react'
import { useRouter } from 'next/navigation';
import { AuthServices } from '@/app/api/api_services/auth';
import { useToast } from '@/providers/ToastProvider';

export default function Profile() {
    const [isOpen, setIsOpen] = React.useState(false);
    const t = useI18n()
    const locale = useCurrentLocale()
    const { setUser, user } = useAuthStore()
    const router = useRouter()
    const { addToast } = useToast()
    const handleSignOut = async () => {
        // Delete session cookie
        try {
            const resData = await AuthServices.logout()
            if (resData.data.success) {
                setIsOpen(false);
                setUser(null);
                addToast('Logged out successfully', 'success')
                router.push('/auth/login');
            }
            else {
                addToast(resData.data.message, 'error')
            }
        } catch (error) {
            console.log(error)
            addToast('Failed to logout', 'error')
        }
    };

    return (
        <div className="profile relative">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center p-2 rounded-full hover:bg-black/80 dark:hover:bg-indigo-800 cursor-pointer outline-0"
            >
                <Image
                    src={user?.image?.url || '/default-avatar.png'}
                    alt="Profile"
                    width={40}
                    height={40}
                    className="w-8 h-8 rounded-full"
                />
                <span className="sr-only">Profile menu</span>
            </button>
            <div className={`overlay fixed ${!isOpen && 'pointer-events-none'} top-0 left-0 w-full h-full`} onClick={() => setIsOpen(false)}></div>
            <div className={`absolute ${!isOpen && 'opacity-0 pointer-events-none'} transition-all duration-500 overflow-hidden ${locale === 'ar' ? 'left-0' : 'right-0'} mt-4 w-48 bg-white dark:bg-black border dark:border-white/20 backdrop-blur-2xl rounded-md shadow-lg z-10 overflow-hidden font-bold`}>
                <Link
                    href="/profile"
                    className="block px-4 py-2 text-sm text-gray-700 dark:text-white/80 hover:text-white hover:bg-indigo-800 dark:hover:bg-indigo-800"
                >
                    {t('profileMenu.my_profile')}
                </Link>
                <Link
                    href="/settings"
                    className="block px-4 py-2 text-sm text-gray-700 dark:text-white/80 hover:text-white hover:bg-indigo-800 dark:hover:bg-indigo-800"
                >
                    {t('profileMenu.settings')}
                </Link>
                <Link
                    onClick={handleSignOut}
                    href="/auth/login"
                    className="block w-full px-4 py-2 text-sm text-red-600 hover:text-white hover:bg-red-600"
                >
                    {t('profileMenu.signout')}
                </Link>
            </div>
        </div>
    );
}
