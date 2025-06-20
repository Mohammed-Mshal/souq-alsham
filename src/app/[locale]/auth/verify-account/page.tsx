'use client'
import React, { useEffect, useState } from 'react';
import ApiService from '@/app/api/api_services';
import { useToast } from '@/providers/ToastProvider';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/providers/AuthProvider';

export default function VerifyAccount() {
    const [verificationCode, setVerificationCode] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const { addToast } = useToast()
    const router = useRouter()
    const user = useAuthStore(store => store.user)
    const setUser = useAuthStore(store => store.setUser)
    
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const dataRes = await ApiService.post('/auth/verify-account', {
                code: verificationCode
            })
            console.log(dataRes);
            
            if (!dataRes?.data?.success) {
                addToast(dataRes.data.message || 'Failed to verify account', 'error');
                return;
            }
            if (user) {
                setUser({ ...user, isVerified: true })
            }
            addToast('Account verified successfully!', 'success');
            router.push('/')
        } catch (error) {
            addToast('Failed to verify account. Please try again.', 'error');
            console.error('Verification error:', error);
        } finally {
            setIsLoading(false);
        }
    };
    const getCode = async () => {
        try {
          const dataRes = await ApiService.get('/auth/verify-account')
    
          if (!dataRes.data.success) {
            addToast(dataRes.data.message || 'Failed to verify account', 'error');
            return;
          }
          addToast('Verification code sent successfully!', 'success');
        } catch (error) {
          addToast('Failed to verify account. Please try again.', 'error');
          console.error('Verification error:', error);
        } finally {
        }
      };
    useEffect(() => {
        if (user?.isVerified) {
            router.push('/')
        }
        else{
            getCode()
        }
    }, [])
    return (
        <div className={`min-h-dvh w-full flex items-center justify-center p-4 bg-gradient-to-br  dark:bg-[#1f1f1f]`}>
            <div className={`bg-white/90 dark:bg-black/40 p-8 rounded-xl shadow-lg w-full max-w-md backdrop-blur-sm border dark:border-white/20`}>
                <h1 className={`text-xl font-bold text-[#333] dark:text-white mb-2 text-center`}>Verify Your Account</h1>
                <p className={`text-[#666] dark:text-white/80 text-center mb-4`}>
                    Please enter the verification code sent to your email address.
                </p>

                <form onSubmit={handleSubmit} className={`flex flex-col gap-4`}>
                    <div className={`w-full`}>
                        <input
                            type="text"
                            value={verificationCode}
                            onChange={(e) => setVerificationCode(e.target.value)}
                            placeholder="Enter verification code"
                            className={`w-full p-2 border dark:border-white/20 rounded-sm text-lg text-center transition-all focus:outline-none focus:border-indigo-700 dark:bg-black dark:text-white`}
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className={`bg-indigo-500 text-white p-2 border-none rounded-sm text-lg cursor-pointer transition-all hover:bg-indigo-700 disabled:bg-white/80 dark:disabled:bg-black/80 disabled:cursor-not-allowed`}
                        disabled={isLoading}
                    >
                        {isLoading ? 'Verifying...' : 'Verify Account'}
                    </button>
                </form>

                <p className={`mt-5 text-center text-[#666] dark:text-white/80 text-sm`}>
                    Didn&apos;t receive the code?{' '}
                    <button className={`bg-none border-none text-indigo-500 dark:text-indigo-400 p-0 cursor-pointer text-sm hover:underline`}>Resend Code</button>
                </p>
            </div>
        </div>
    );
}
