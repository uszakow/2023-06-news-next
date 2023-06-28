import { NewsAdd } from "@/components/newsList/NewsAdd/NewsAdd";
import { NewsPreview } from "@/components/newsList/NewsPreview/NewsPreview";
import { AppContext } from "@/context/app.context";
import { fetchNews } from "@/api/fetchNews";
import { NewsInterface } from "@/types/News.interface";
import Head from "next/head";
import React, { useContext, useState } from "react";

interface NewsPageProps {
  initialNews: NewsInterface[];
}

const NewsPage: React.FC<NewsPageProps> = ({ initialNews }) => {
  const { user } = useContext(AppContext);
  const [news, setNews] = useState(initialNews);

  return (
    <>
      <Head>
        <title>Wiadomości</title>
      </Head>
      {news?.map(item => (
        <NewsPreview
          key={item.id}
          news={item}
          updateNewsList={setNews}
        />
      ))}
      {user && <NewsAdd updateNewsList={setNews} />}
    </>
  );
};

export async function getServerSideProps() {
  const initialNews = await fetchNews();

  return {
    props: {
      initialNews,
    },
  };
};

export default NewsPage;