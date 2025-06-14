// app/providers.tsx
import { MenuStoreProvider } from '@/providers/MenuProvider';
import { I18nProviderClient } from '@/locales/client'
import { ThemeProvider } from '@/providers/ThemeProvider';
import { AuthProvider } from '@/providers/AuthProvider';
import { verifySession } from '@/libs/session';
import { cache } from 'react';
import { ToastProvider } from '@/providers/ToastProvider';

// Cache the getInfo function to avoid unnecessary recalculations
const getInfo = cache(async () => {
  return {
    user: null
  }
});

export async function Providers({
  children,
  locale,
}: Readonly<{
  children: React.ReactNode,
  locale: string,
}>) {
  // Fetch session and user info in parallel for better performance
  const [userInfo] = await Promise.all([
    getInfo(),
    verifySession(),
  ]);

  return (
    <AuthProvider initialSession={userInfo}>
      <ThemeProvider>
        <I18nProviderClient locale={locale}>
          <ToastProvider>
            <MenuStoreProvider>
              {children}
            </MenuStoreProvider>
          </ToastProvider>
        </I18nProviderClient>
      </ThemeProvider>
    </AuthProvider>
  );
}