export interface NewsInterface {
  id: string;
  title: string;
  content: string;
  author: {
    id: string;
    name: string;
  };
}
