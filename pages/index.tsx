import { useContext, useState } from "react";
import { GetServerSideProps } from "next";
import Head from "next/head";
import { AppContext } from "@/context/app.context";
import { fetchNews } from "@/api/fetchNews";
import { NewsInterface } from "@/types/News.interface";
import { NewsAdd } from "@/components/newsList/NewsAdd/NewsAdd";
import { NewsPreview } from "@/components/newsList/NewsPreview/NewsPreview";

interface NewsListPageProps {
  initialNews: NewsInterface[];
}

const NewsListPage: React.FC<NewsListPageProps> = ({ initialNews }) => {
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

export const getServerSideProps: GetServerSideProps = async () => {
  const initialNews: NewsInterface[] = [];

  try {
    const newsList = await fetchNews();
    initialNews.push(...newsList);
  } catch (error) {
    console.error(`ERROR:${error}`);
  }

  return {
    props: {
      initialNews,
    }
  };
};

export default NewsListPage;