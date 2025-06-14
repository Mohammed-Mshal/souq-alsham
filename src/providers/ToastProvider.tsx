'use client'
import React, { createContext, useContext } from 'react';
import toast, { Toaster } from 'react-hot-toast';

interface ToastContextType {
    addToast: (message: string, type: 'success' | 'error' | 'info' | 'warning') => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function ToastProvider({ children }: { children: React.ReactNode }) {
    const addToast = (message: string, type: 'success' | 'error' | 'info' | 'warning') => {
        toast(message, {
            duration: 5000,
            position: 'top-center',
            style: {
                background: type === 'success' ? '#22c55e' : 
                          type === 'error' ? '#ef4444' :
                          type === 'warning' ? '#eab308' : '#3b82f6',
                color: '#fff',
                minWidth: '300px',
                maxWidth: '500px',
            },
        });
    };

    return (
        <ToastContext.Provider value={{ addToast }}>
            {children}
            <Toaster />
        </ToastContext.Provider>
    );
}

export function useToast() {
    const context = useContext(ToastContext);
    if (context === undefined) {
        throw new Error('useToast must be used within a ToastProvider');
    }
    return context;
}
