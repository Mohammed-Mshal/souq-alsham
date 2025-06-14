import { ReactNode } from 'react';

interface AuthLayoutProps {
    children: ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
    return (
        <div className="h-dvh flex transition-colors duration-200">
            <div className="w-full h-full flex flex-1">
                {children}
            </div>
        </div>
    );
}
