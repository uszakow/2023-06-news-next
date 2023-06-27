import { NewsAdd } from "@/components/NewsAdd/NewsAdd";
import Head from "next/head";
import React from "react";

const ListsPage: React.FC = () => {
  return (
    <>
      <Head>
        <title>Wiadomości</title>
      </Head>
      <div>Lists page</div>
      <NewsAdd />
    </>
  );
};

export default ListsPage;