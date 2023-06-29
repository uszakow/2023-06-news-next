interface News {
  id: string;
  name: string;
}

export interface UserInterface {
  id: string;
  name: string;
  news: News[];
}
