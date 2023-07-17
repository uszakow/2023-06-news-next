import { PropsWithChildren, useContext, useEffect } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import axios, { AxiosError } from "axios";
import { AppContext } from "@/context/app.context";
import { api } from "@/api/config";
import { Navbar } from "@/components/Navbar/Navbar";
import { Footer } from "@/components/Footer/Footer";
import { Loader } from "@/components/ui/Loader/Loader";

export const MainLayout: React.FC<PropsWithChildren> = ({ children }) => {
  const router = useRouter();
  const { isLoading, user, setUserContext, setIsLoading } = useContext(AppContext);

  useEffect(() => {
    setUserContext();

    // loader when route changing
    const handleRouteChangeStart = () => {
      setIsLoading(true);
    };
    const handleRouteChangeComplete = () => {
      setIsLoading(false);
    };
    router.events.on('routeChangeStart', handleRouteChangeStart);
    router.events.on('routeChangeComplete', handleRouteChangeComplete);

    // manage incorrect token
    const interceptor = api.interceptors.response.use(
      response => response,
      (error: AxiosError) => {
        if (error.response && error.response.status === 401) {
          localStorage.removeItem('token');
          setUserContext();
        }
        return Promise.reject(error);
      }
    );

    return () => {
      axios.interceptors.response.eject(interceptor);
      router.events.off('routeChangeStart', handleRouteChangeStart);
      router.events.off('routeChangeComplete', handleRouteChangeComplete);
    };
  }, []);

  useEffect(() => {
    if (router.asPath === '/news') {
      router.push('/');
    }

    if (!isLoading && !user && router.pathname === '/profile') {
      router.push('/login');
    }
    if (!isLoading && user && router.pathname === '/login') {
      router.push('/profile');
    }
  }, [user, router.pathname, isLoading]);

  return (
    <div className="layout">
      <Head>
        <title>News app</title>
        <meta name="description" content="Application for adding and managing news." />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <main className="content">
        {children}
        <Loader r-if={isLoading} />
      </main>
      <Footer />
    </div>
  );
};
