import { NewsInterface } from "@/types/News.interface";
import { Typography } from "../ui/Typography/Typography";
import { useEffect, useState } from "react";
import styles from './NewsPreview.module.scss';

interface NewsPreviewProps {
  news: NewsInterface;
}

export const NewsPreview: React.FC<NewsPreviewProps> = ({ news }) => {
  const [content, setContent] = useState([]);

  useEffect(() => {
    const parsedContent = JSON.parse(news.content);
    setContent(parsedContent);
  }, []);

  return (
    <div className={`${styles['news-preview']} p-1 mb-2`}>
      <Typography
        className={`${styles['news-preview-title']}`}
        type="title"
      >
        {news.title}
      </Typography>
      <div className={styles['news-preview-content']}>
        {content?.map(item => (
          <p>{item}</p>
        ))}
      </div>
    </div>
  );
};