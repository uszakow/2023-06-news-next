import { useEffect, useState } from "react";
import { GetStaticPaths, GetStaticProps } from "next";
import { useNewsApi } from "@/api/useNewsApi";
import { NewsInterface } from "@/types/News.interface";
import { Typography } from "@ui/Typography/Typography";
import Head from "next/head";

interface NewsPageProps {
  news: NewsInterface;
}

const NewsPage: React.FC<NewsPageProps> = ({ news }) => {
  const [content, setContent] = useState(['']);

  useEffect(() => {
    const splittedContent = news?.content.split('\n');

    setContent(splittedContent);
  }, [news?.content]);

  return (
    <>
      <Head>
        <title>{news?.title || 'News app'}</title>
      </Head>
      <Typography type="title">{news?.title}</Typography>
      {content?.map((item, index) => (
        <p
          key={index + item}
          className="news-p"
        >
          {item}
        </p>
      ))}

      <div className="mt-2">
        Autor: <span className="author">{news?.author.name}</span>
      </div>

      {/* an example of styled JSX */}
      <style jsx>{`
        .news-p {
          text-indent: 2rem;
        }
        .author {
          font-style: italic;
        }
      `}</style>
    </>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const { getNewsListApi } = useNewsApi();

  const news: NewsInterface[] = [];

  try {
    const newsList = await getNewsListApi();
    news.push(...newsList);
  } catch (error) {
    console.error(`ERROR:${error}`);
  }

  const paths = news.map(item => ({
    params: { id: item.id }
  }));

  return {
    paths,
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { getNewsApi } = useNewsApi();

  const id: string = params?.id as string;
  let news = null;

  try {
    news = await getNewsApi(id);
  } catch (error) {
    return {
      notFound: true
    };
  }

  return {
    props: {
      news
    },
    revalidate: 30
  };
};

export default NewsPage;