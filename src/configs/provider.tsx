import { Notification } from '@/components/ui/Notification';
import { AuthenticationProvider } from '@/contexts/Auth';
import { NotificationProvider } from '@/contexts/Notification';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { PagesProgressBar as ProgressBar } from 'next-nprogress-bar';
import { Inter } from 'next/font/google';
import { FC, PropsWithChildren } from 'react';
import './i18n';
import TansTackProviders from './tanstackQuery';
import { theme } from './theme';
import { ThemeConfigProvider } from './themeConfig';

const inter = Inter({ subsets: ['latin'] });

const Providers: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className={inter.className}>
      <TansTackProviders>
        <AuthenticationProvider>
          <ThemeConfigProvider>
            <ProgressBar
              height={'5px'}
              color={theme.colors.primary}
              options={{ showSpinner: false }}
            />
            <NotificationProvider>
              {children}
              <Notification />
            </NotificationProvider>
          </ThemeConfigProvider>
        </AuthenticationProvider>
        <ReactQueryDevtools initialIsOpen={false} />
      </TansTackProviders>
    </div>
  );
};

export default Providers;
