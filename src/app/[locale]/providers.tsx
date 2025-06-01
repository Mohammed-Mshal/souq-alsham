// app/providers.tsx
'use client'
import { MenuStoreProvider } from '@/providers/MenuProvider';
import { I18nProviderClient } from '@/locales/client'
import { ThemeProvider } from '@/providers/ThemeProvider';
export function Providers({
  children, locale,
}: Readonly<{
  children: React.ReactNode,
  locale: string,
}>
) {
  return (
    <ThemeProvider>
      <I18nProviderClient locale={locale}>
        <MenuStoreProvider>
          {children}
        </MenuStoreProvider>
      </I18nProviderClient>
    </ThemeProvider>
  )
}