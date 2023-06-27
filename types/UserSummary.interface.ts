interface News {
  id: string;
  name: string;
}

export interface UserSummaryInterface {
  id: string;
  name: string;
  news: News[];
}
