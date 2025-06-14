'use client'
import Image from 'next/image'
import React, { useState } from 'react'
import Logo from 'static/logo.png'
import LoginImage from 'static/login2.svg'
import { useRouter } from 'next/navigation'
import { useToast } from '@/providers/ToastProvider'
import Link from 'next/link'
import { DataLogin } from '@/types/AuthForm'
import { AuthServices } from '@/app/api/api_services/auth'
import { AxiosError } from 'axios'
import { useAuthStore } from '@/providers/AuthProvider'
export default function Login() {
  const [data, setData] = useState<DataLogin>({
    email: '',
    password: ''
  })
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const {setUser}=useAuthStore()
  const { addToast } = useToast()
  const router = useRouter()
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleSubmit = async (e: any) => {
    e.preventDefault()
    try {
      setIsLoading(true)
      e.preventDefault()
      const dataRes = await AuthServices.login(data);
      if (dataRes.data.success) {
        addToast('Login successful', 'success');
        setUser(dataRes.data.data.user)
        router.push('/');
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        const errorResponse = error.response?.data.error;
        addToast(errorResponse, 'error');
      } else if (error instanceof Error) {
        const errorMessage = error.message || 'An unexpected error occurred during login';
        addToast(errorMessage, 'error');
      } else {
        addToast('An unexpected error occurred during login', 'error')
      }
    } finally {
      setIsLoading(false)
    }
  }
  return (
    <div className='wrapper-login flex w-full'>
      <div className="wrapper-image flex-1 hidden lg:block relative overflow-hidden bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900 dark:to-blue-800">
        <Image
          src={LoginImage}
          alt="Login illustration"
          height={992}
          width={800}
          className='w-full h-full object-cover transition-transform duration-300 hover:scale-105'
          priority
        />
      </div>
      <div className="wrapper-form flex-1 flex flex-col justify-center px-6 py-12 lg:px-8 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 dark:scrollbar-thumb-gray-600 scrollbar-track-transparent hover:scrollbar-thumb-gray-500 dark:hover:scrollbar-thumb-gray-500">
        <div className="container-form w-full max-w-xl mx-auto p-8 px-4 sm:px-8 border rounded-xl shadow-md bg-white dark:bg-indigo-700/90 dark:border-indigo-700 shadow-indigo-700/50">
          <div className="sm:mx-auto sm:w-full sm:max-w-2xl">
            <Image
              alt="Logo"
              src={Logo}
              height={80}
              className="mx-auto h-20 w-auto"
            />
            <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900 dark:text-white">
              Login to your account
            </h2>
          </div>
          <div className="mt-10">
            <form action="#" method="POST" className="space-y-6 w-full mx-auto">
              <div className="wrapper-groups flex flex-col sm:flex-row gap-4">
                <div className='form-group flex-1'>
                  <label
                    htmlFor="email"
                    className="block text-lg/relaxed font-medium text-gray-900 dark:text-gray-100"
                  >
                    Email address
                  </label>
                  <div className="mt-2">
                    <input
                      id="email"
                      name="email"
                      type="email"
                      onChange={(e) => {
                        setData({ ...data, email: e.target.value })
                      }}
                      required
                      autoComplete="email"
                      placeholder="Enter your email"
                      className="block w-full rounded-md border-0 px-3 py-2 
                    text-gray-900 dark:text-gray-800 dark:bg-white/80
                    dark:bg-white bg-indigo-100
                    ring-1 ring-inset ring-gray-300 dark:ring-gray-700
                    placeholder:text-gray-400 dark:placeholder:text-gray-500
                    focus:ring-2 focus:ring-inset focus:ring-indigo-600 dark:focus:ring-indigo-500
                    sm:text-sm/6"
                    />
                  </div>
                </div>


              </div>
              <div className="wrapper-groups flex flex-col sm:flex-row gap-4">
                <div className='form-group flex-1'>
                  <div className="flex items-center justify-between">
                    <label
                      htmlFor="password"
                      className="block text-lg/relaxed font-medium text-gray-900 dark:text-gray-100"
                    >
                      Password
                    </label>
                  </div>
                  <div className="relative">
                    <input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      onChange={(e) => {
                        setData({ ...data, password: e.target.value })
                      }}
                      required
                      placeholder="Enter your password"
                      minLength={8}
                      maxLength={32}
                      pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,32}$"
                      title="Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character"
                      autoComplete="current-password"
                      className="block w-full rounded-md border-0 px-3 py-2 pr-10
                          text-gray-900 dark:text-black/80
                          dark:bg-white bg-indigo-100
                          ring-1 ring-inset ring-gray-300 dark:ring-gray-700
                          placeholder:text-gray-400 dark:placeholder:text-gray-500
                          focus:ring-2 focus:ring-inset focus:ring-indigo-600 dark:focus:ring-indigo-500
                          sm:text-sm/6"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 top-1/2 -translate-y-1/2 cursor-pointer  right-0 flex items-center pr-3 text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
                    >
                      {showPassword ? (
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                        </svg>
                      ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                          <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                      )}
                    </button>
                  </div>
                </div>

              </div>

              <div className='flex justify-center'>
                <button
                  onClick={handleSubmit}
                  type="submit"
                  disabled={isLoading}
                  className="flex w-full justify-center rounded-md cursor-pointer bg-indigo-600 dark:bg-indigo-500 hover:shadow-lg px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 max-w-40 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? 'Signing in...' : 'Sign in'}
                </button>
              </div>
              <p className="mt-10 text-center text-sm/6 text-gray-500 dark:text-gray-200">
                You are not a member?{' '}
                <Link href="/auth/signup" className="font-semibold text-indigo-600 dark:text-indigo-300 hover:text-indigo-500 dark:hover:text-indigo-300 hover:underline">
                  Sign up
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>

    </div>
  )
}
