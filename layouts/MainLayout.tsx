import React, { PropsWithChildren, useContext, useEffect } from "react";
import { Navbar } from "../components/Navbar/Navbar";
import Head from "next/head";
import { Footer } from "@/components/Footer/Footer";
import { AppContext } from "@/context/app.context";
import axios, { AxiosError } from "axios";
import { api } from "@/api/config";
import { useRouter } from "next/router";
import { Loader } from "@/components/ui/Loader/Loader";

export const MainLayout: React.FC<PropsWithChildren> = ({ children }) => {
  const router = useRouter();
  const { isLoading, user, setUserContext } = useContext(AppContext);

  useEffect(() => {
    setUserContext();

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
    };
  }, []);

  useEffect(() => {
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
        <meta name="description" content="Advanced application for working with to-do lists" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <main className="content">
        {isLoading ? <Loader /> : children}
      </main>
      <Footer />
    </div>
  );
};
