'use client'
import React, { useState } from 'react';
import styles from './VerifyAccount.module.css';

export default function VerifyAccount() {
    const [verificationCode, setVerificationCode] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        try {
            // TODO: Implement verification logic here
            console.log('Verifying code:', verificationCode);
        } catch (error) {
            setError('Failed to verify account. Please try again.');
            console.error('Verification error:', error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.verificationBox}>
                <h1 className={styles.title}>Verify Your Account</h1>
                <p className={styles.description}>
                    Please enter the verification code sent to your email address.
                </p>

                <form onSubmit={handleSubmit} className={styles.form}>
                    <div className={styles.inputGroup}>
                        <input
                            type="text"
                            value={verificationCode}
                            onChange={(e) => setVerificationCode(e.target.value)}
                            placeholder="Enter verification code"
                            className={styles.input}
                            required
                        />
                    </div>

                    {error && <p className={styles.error}>{error}</p>}

                    <button
                        type="submit"
                        className={styles.submitButton}
                        disabled={isLoading}
                    >
                        {isLoading ? 'Verifying...' : 'Verify Account'}
                    </button>
                </form>

                <p className={styles.helpText}>
                    Didn&apos;t receive the code?{' '}
                    <button className={styles.resendButton}>Resend Code</button>
                </p>
            </div>
        </div>
    );
}
