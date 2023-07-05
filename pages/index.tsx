import { useContext, useState } from "react";
import { GetServerSideProps } from "next";
import Head from "next/head";
import { AppContext } from "@/context/app.context";
import { useNewsApi } from "@/api/useNewsApi";
import { NewsInterface } from "@/types/News.interface";
import { NewsAdd } from "@/components/newsList/NewsAdd/NewsAdd";
import { NewsPreview } from "@/components/newsList/NewsPreview/NewsPreview";

interface NewsListPageProps {
  initialNews: NewsInterface[];
}

const getNewsList = async (): Promise<NewsInterface[]> => {
  const { getNewsListApi } = useNewsApi();

  return await getNewsListApi();
};

const NewsListPage: React.FC<NewsListPageProps> = ({ initialNews }) => {
  const { user } = useContext(AppContext);
  const [news, setNews] = useState(initialNews);

  const updateNewsList = async (): Promise<void> => {
    const updatedNewsList = await getNewsList();
    setNews(updatedNewsList);
  };

  return (
    <>
      <Head>
        <title>Wiadomości</title>
      </Head>
      {news?.map(item => (
        <NewsPreview
          key={item.id}
          news={item}
          onNewsChange={() => updateNewsList()}
        />
      ))}
      {user && <NewsAdd onNewsChange={() => updateNewsList()} />}
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const initialNews: NewsInterface[] = [];

  try {
    const newsList = await getNewsList();
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