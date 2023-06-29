import type { AppProps } from 'next/app';
import { AppContextProvider } from '@/context/app.context';
import { MainLayout } from '../layouts/MainLayout';
import '@/styles/globals.scss';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AppContextProvider>
      <MainLayout>
        <Component {...pageProps} />
      </MainLayout>
    </AppContextProvider>
  );
}
