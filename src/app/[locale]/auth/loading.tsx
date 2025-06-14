import React from 'react'
import Image from 'next/image'
import Logo from 'static/logo.png'
import LoginImage from 'static/login2.svg'

export default function AuthLoading() {
    return (
        <div className='wrapper-login flex w-full'>
            <div className="wrapper-image flex-1 hidden lg:block relative overflow-hidden bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900 dark:to-blue-800">
                <Image
                    src={LoginImage}
                    alt="Login illustration"
                    height={992}
                    width={800}
                    className='w-full h-full object-cover'
                    priority
                />
            </div>
            <div className="wrapper-form flex-1 flex flex-col justify-center px-6 py-12 lg:px-8 overflow-y-auto">
                <div className="container-form w-full max-w-xl mx-auto p-8 px-4 sm:px-8 border rounded-xl shadow-md bg-white dark:bg-indigo-700/90 dark:border-indigo-700 shadow-indigo-700/50">
                    <div className="sm:mx-auto sm:w-full sm:max-w-2xl">
                        <Image
                            alt="Logo"
                            src={Logo}
                            height={80}
                            className="mx-auto h-20 w-auto"
                        />
                        <div className="mt-10 flex flex-col items-center gap-4">
                            <div className="relative w-12 h-12">
                                <div className="absolute top-0 left-0 w-full h-full border-4 border-indigo-200 dark:border-indigo-700 rounded-full animate-pulse"></div>
                                <div className="absolute top-0 left-0 w-full h-full border-4 border-transparent border-t-indigo-600 dark:border-t-indigo-400 rounded-full animate-spin"></div>
                            </div>
                            <p className="text-base font-medium text-gray-700 dark:text-gray-200">Loading...</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
} 