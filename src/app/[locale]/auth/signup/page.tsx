'use client'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import Logo from 'static/logo.png'
import countries from '@/libs/countryCodes.json'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import { useTheme } from '@/providers/ThemeProvider'
import { DataFormSignup } from '@/types/AuthForm'
import { AuthServices } from '@/app/api/api_services/auth'
import { useToast } from '@/providers/ToastProvider'
import { AxiosError } from 'axios'
import { useRouter } from 'next/navigation'
import SignupImage from 'static/signup.svg'
import { useAuthStore } from '@/providers/AuthProvider'
const DynamicSelect = dynamic(
  () => import('react-select'),
  {
    ssr: false,
    loading: () => <div>Loading...</div>
  }
);
const defaultDataForm: DataFormSignup = {
  name: '',
  phone: '',
  code: '',
  email: '',
  password: '',
  birthday: '',
  gender: '',
  image: null
}
export default function Signup() {
  const { theme } = useTheme()
  const [data, setData] = useState(defaultDataForm)
  const [imagePreview, setImagePreview] = useState<string | ArrayBuffer | null | undefined>()
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const { addToast } = useToast()
  const router = useRouter()
  const {setUser}=useAuthStore()
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleSubmit = async (e: any) => {
    try {
      setIsLoading(true)
      e.preventDefault()
      const formData = new FormData()
      Object.keys(data).forEach((key: string) => {
        if (data[key as keyof DataFormSignup]) {
          formData.append(key, data[key as keyof DataFormSignup] as string | Blob)
        }
      })
      const dataRes = await AuthServices.signup(formData);
      if (dataRes.data.success) {
        addToast('Signup successful', 'success');
        setUser(dataRes.data.data.user)
        router.push('/');
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log(error.response?.data.error);
        const errorMessage = error.response?.data.error || 'An unexpected error occurred during signup';
        addToast(errorMessage, 'error');
      } else if (error instanceof Error) {
        console.log(error.message);
        const errorMessage = error.message || 'An unexpected error occurred during signup';
        addToast(errorMessage, 'error');
      } else {
        addToast('An unexpected error occurred during signup', 'error')
      }
    } finally {
      setIsLoading(false)
    }

  }
  useEffect(() => {
    if (data.image) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setImagePreview(e.target?.result)
      }
      reader.readAsDataURL(data.image)
    }
  }, [data.image])
  return (
    <div className="wrapper-signup flex w-full">
      <div className="flex flex-1 flex-col lg:justify-center justify-start px-6 py-12 lg:px-8 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 dark:scrollbar-thumb-gray-600 scrollbar-track-transparent hover:scrollbar-thumb-gray-500 dark:hover:scrollbar-thumb-gray-500">
        <div className="container-form w-full max-w-2xl mx-auto p-8 px-4 sm:px-8 border rounded-xl shadow-md bg-white dark:bg-indigo-700/90 dark:border-indigo-700 shadow-indigo-700/50">
          <div className="sm:mx-auto sm:w-full sm:max-w-2xl">
            <Image
              alt="Logo"
              src={Logo}
              height={80}
              className="mx-auto h-20 w-auto"
            />
            <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900 dark:text-white">
              Singup and get a lot of features
            </h2>
          </div>

          <div className="mt-10">
            <form action="#" method="POST" className="space-y-6 w-full mx-auto">
              <div className="wrapper-groups flex flex-col sm:flex-row gap-4">
                <div className='form-group flex-1 flex items-center justify-center'>
                  <label
                    htmlFor="image"
                    className="group flex rounded-full h-30 w-30 p-2 bg-indigo-100 dark:bg-white cursor-pointer hover:opacity-90 transition-all duration-300 relative overflow-hidden border-2 border-gray-200 dark:border-gray-700 hover:border-indigo-500 dark:hover:border-indigo-400 hover:shadow-lg"
                  >
                    <Image
                      src={typeof imagePreview === 'string' ? imagePreview : '/default.svg'}
                      alt='Profile Image'
                      height={96}
                      width={96}
                      className='h-full w-full object-cover rounded-full transition-transform duration-300 group-hover:scale-105'
                    />
                    <div className="absolute inset-0 p-2 flex flex-col items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-all duration-300">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-white mb-1">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008V10.5z" />
                      </svg>
                      <span className="text-white text-sm font-medium">Change Photo</span>
                    </div>
                  </label>
                  <div className="mt-2">
                    <input
                      id="image"
                      name="image"
                      onChange={(e) => {
                        if (e.target.files && e.target.files[0]) {
                          setData({ ...data, image: e.target.files[0] })
                        }
                      }}
                      type="file"
                      required
                      className="hidden"
                    />
                  </div>
                </div>
              </div>
              <div className="wrapper-groups flex flex-col sm:flex-row gap-4">
                <div className='form-group flex-1'>
                  <label
                    htmlFor="name"
                    className="block text-lg/relaxed font-medium text-gray-900 dark:text-white"
                  >
                    Name
                  </label>
                  <div className="mt-2">
                    <input
                      id="name"
                      name="name"
                      type="text"
                      onChange={(e) => setData({ ...data, name: e.target.value })}
                      required
                      autoComplete="name"
                      placeholder="Enter your name"
                      className="block w-full rounded-md border-0 px-3 py-2 
                    text-gray-900 dark:text-black/80
                    dark:bg-white bg-indigo-100
                    ring-1 ring-inset ring-gray-300 dark:ring-gray-700
                    placeholder:text-gray-400 dark:placeholder:text-gray-500
                    focus:ring-2 focus:ring-inset focus:ring-indigo-600 dark:focus:ring-indigo-500
                    sm:text-sm/6"
                    />
                  </div>
                </div>
                <div className="form-group flex-1 ">
                  <label
                    htmlFor="phone"
                    className="block text-lg/relaxed font-medium text-gray-900 dark:text-white  "
                  >
                    Phone Number
                  </label>
                  <div className="phone-group flex gap-2 mt-2">
                    <DynamicSelect
                      isSearchable={true}
                      components={{
                        IndicatorSeparator: () => null,
                        DropdownIndicator: () => null,
                      }}
                      // eslint-disable-next-line @typescript-eslint/no-explicit-any
                      onChange={(e: any) => {
                        setData({ ...data, code: e.value as string })
                      }}
                      options={countries && countries?.length > 0 ? countries.map((country) => ({
                        value: country.code,

                        label: (
                          <div className="flex items-center gap-2">
                            <span className="text-gray-500 dark:text-gray-400">({country.code})</span>
                            <span>
                              <Image alt={country.name} src={country.flagUrl} height={30} width={30} className='w-10 h-auto max-w-5' loading='lazy' />
                            </span>
                          </div>
                        )
                      })) : []}
                      placeholder="Code"
                      name='code'
                      className="my-custom-select flex-1 max-w-[120px] cursor-pointer"
                      styles={{
                        control: (base) => ({
                          ...base,
                          backgroundColor: theme === 'dark' ? 'white' : 'oklch(93% 0.034 272.788)',
                          borderColor: theme === 'dark' ? 'white' : 'rgb(209 213 219)',
                          '&:hover': {
                            borderColor: theme === 'dark' ? 'white' : 'rgb(209 213 219)'
                          },
                          cursor: 'pointer'
                        }),
                        menu: (base) => ({
                          ...base,
                          backgroundColor: theme === 'dark' ? '#1f1f1f' : 'oklch(93% 0.034 272.788)'
                        }),
                        option: (base, state) => ({
                          ...base,
                          backgroundColor: state.isFocused
                            ? theme === 'dark'
                              ? 'white'
                              : 'oklch(80% 0.034 272.788)'
                            : 'transparent',
                          '&:hover': {
                            backgroundColor: theme === 'dark'
                              ? 'white'
                              : 'oklch(80% 0.034 272.788)'
                          },
                          color: theme === 'dark' ? 'rgb(243 244 246)' : '#1f1f1f',
                          cursor: 'pointer'
                        }),
                        singleValue: (base) => ({
                          ...base,
                          color: theme === 'dark' ? 'rgb(243 244 246)' : '#1f1f1f'
                        })
                      }}
                    />
                    <input type="number"
                      id='phone'
                      name='phone'
                      onChange={(e) => {
                        setData({ ...data, phone: e.target.value })
                      }}
                      placeholder='Number'
                      onKeyDown={(e) => {
                        if (e.currentTarget.value.length >= 9 &&
                          e.key !== 'Backspace' &&
                          e.key !== 'Delete' &&
                          e.key !== 'ArrowLeft' &&
                          e.key !== 'ArrowRight' &&
                          e.key !== 'Tab') {
                          e.preventDefault();
                          return;
                        }

                        if (!/[0-9]/.test(e.key) &&
                          e.key !== 'Backspace' &&
                          e.key !== 'Delete' &&
                          e.key !== 'ArrowLeft' &&
                          e.key !== 'ArrowRight' &&
                          e.key !== 'Tab') {
                          e.preventDefault();
                        }
                      }}
                      className="block flex-1 rounded-md border-0 px-3 py-2 
                    text-gray-900 dark:text-black/80
                    dark:bg-white bg-indigo-100
                    ring-1 ring-inset ring-gray-300 dark:ring-gray-700
                    placeholder:text-gray-400 dark:placeholder:text-gray-500
                    focus:ring-2 focus:ring-inset focus:ring-indigo-600 dark:focus:ring-indigo-500
                    sm:text-sm/6 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" />
                  </div>
                </div>

              </div>
              <div className="wrapper-groups flex flex-col sm:flex-row gap-4">
                <div className='form-group flex-1'>
                  <label
                    htmlFor="email"
                    className="block text-lg/relaxed font-medium text-gray-900 dark:text-white"
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
                    text-gray-900 dark:text-black/80
                    dark:bg-white bg-indigo-100
                    ring-1 ring-inset ring-gray-300 dark:ring-gray-700
                    placeholder:text-gray-400 dark:placeholder:text-gray-500
                    focus:ring-2 focus:ring-inset focus:ring-indigo-600 dark:focus:ring-indigo-500
                    sm:text-sm/6"
                    />
                  </div>
                </div>

                <div className='form-group flex-1'>
                  <div className="flex items-center justify-between">
                    <label
                      htmlFor="password"
                      className="block text-lg/relaxed font-medium text-gray-900 dark:text-white"
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
              <div className="wrapper-groups flex flex-col sm:flex-row gap-4">
                <div className='form-group flex-1'>
                  <label
                    htmlFor="birthday"
                    className="block text-lg/relaxed font-medium text-gray-900 dark:text-white"
                  >
                    Birthday
                  </label>
                  <div className="mt-2">
                    <input
                      id="birthday"
                      name="birthday"
                      onChange={(e) => {
                        setData({ ...data, birthday: e.target.value })
                      }}
                      type="date"
                      required
                      placeholder="Enter your Birthday"
                      className="block w-full rounded-md border-0 px-3 py-2 
                      text-gray-900 dark:text-black/80
                    dark:bg-white bg-indigo-100
                    ring-1 ring-inset ring-gray-300 dark:ring-gray-700
                    placeholder:text-gray-400 dark:placeholder:text-gray-500
                    focus:ring-2 focus:ring-inset focus:ring-indigo-600 dark:focus:ring-indigo-500 relative
                    sm:text-sm/6 dark:[&::-webkit-calendar-picker-indicator]:invert [&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:top-0 [&::-webkit-calendar-picker-indicator]:left-0 [&::-webkit-calendar-picker-indicator]:w-full [&::-webkit-calendar-picker-indicator]:h-full [&::-webkit-calendar-picker-indicator]:cursor-pointer "
                    />
                  </div>
                </div>

                <div className='form-group flex-1'>
                  <div className="flex items-center justify-between">
                    <label
                      htmlFor="gender"
                      className="block text-lg/relaxed font-medium text-gray-900 dark:text-white"
                    >
                      Gender
                    </label>
                  </div>
                  <div className="mt-2">
                    <DynamicSelect
                      isSearchable={true}
                      // eslint-disable-next-line @typescript-eslint/no-explicit-any
                      onChange={(e: any) => {
                        setData({ ...data, gender: e.value })
                      }}
                      components={{
                        IndicatorSeparator: () => null,
                        DropdownIndicator: () => null,
                      }}
                      options={['Male', 'Female'].map((gender) => ({
                        value: gender,
                        label: (
                          <div className="flex items-center gap-2 text-gray-500 dark:text-gray-500">
                            {gender}
                          </div>
                        )
                      }))}
                      placeholder="Gender"
                      name='gender'
                      id='gender'
                      className="my-custom-select flex-1 cursor-pointer"
                      styles={{
                        control: (base) => ({
                          ...base,
                          backgroundColor: theme === 'dark' ? 'white' : 'oklch(93% 0.034 272.788)',
                          borderColor: theme === 'dark' ? 'white' : 'rgb(209 213 219)',
                          '&:hover': {
                            borderColor: theme === 'dark' ? 'white' : 'rgb(209 213 219)'
                          },
                          cursor: 'pointer'
                        }),
                        menu: (base) => ({
                          ...base,
                          backgroundColor: theme === 'dark' ? '#1f1f1f' : 'oklch(93% 0.034 272.788)'
                        }),
                        option: (base, state) => ({
                          ...base,
                          backgroundColor: state.isFocused
                            ? theme === 'dark'
                              ? 'white'
                              : 'oklch(80% 0.034 272.788)'
                            : 'transparent',
                          '&:hover': {
                            backgroundColor: theme === 'dark'
                              ? 'white'
                              : 'oklch(80% 0.034 272.788)'
                          },
                          color: theme === 'dark' ? 'rgb(243 244 246)' : '#1f1f1f',
                          cursor: 'pointer'
                        }),
                        singleValue: (base) => ({
                          ...base,
                          color: theme === 'dark' ? 'rgb(243 244 246)' : '#1f1f1f'
                        })
                      }}
                    />
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
                  {isLoading ? 'Signing up...' : 'Sign up'}
                </button>
              </div>
            </form>

            <p className="mt-10 text-center text-sm/6 text-gray-500 dark:text-gray-200">
              You are a member?{' '}
              <Link href="/auth/login" className="font-semibold text-indigo-600 dark:text-indigo-300 hover:text-indigo-500 dark:hover:text-indigo-300 hover:underline">
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
      <div className="wrapper-image flex-1 hidden lg:block relative overflow-hidden bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900 dark:to-blue-800">
        <Image src={SignupImage} alt="image" height={992} width={800} className='w-full h-full object-cover' />
      </div>
    </div>
  )
}
