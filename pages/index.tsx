import type { NextPage } from "next";
import Head from "next/head";
import { useState } from "react";
import InfiniteScroll from "react-infinite-scroller";

import { useDigimonList } from "../hooks/useDigimon";
import Card from "../components/Card";
import Loader from "../components/Loader";

const IndexPage: NextPage = () => {
  const { isLoading, digimon, getDigimonList, nextPage } = useDigimonList();

  const [search, setSearch] = useState();

  const refetchData = () => {
    if(Boolean(nextPage)) {
      getDigimonList();
    }
  }

  const handleSearch = (e: any) => {
    if (e.key === "Enter") {
      getDigimonList(search);
    }
  };

  return (
    <div>
      <Head>
        <title>Digivice</title>
        <meta name="description" content="Digivice" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="m-auto max-w-xl lg:max-w-6xl p-8">
        <div className="flex gap-3 justify-center pb-8">
          <input
            className="border w-52 rounded-md px-2 py-0.5"
            value={search}
            onChange={(e: any) => setSearch(e.target.value)}
            onKeyDown={(e) => handleSearch(e)}
          />
          <button onClick={() => getDigimonList(search)}>Search</button>
        </div>

        {!isLoading && digimon.length === 0 && (
          <div className="flex justify-center p-10">No Data </div>
        )}
        {digimon.length > 0 && (
          <InfiniteScroll
            initialLoad={false}
            pageStart={0}
            loadMore={refetchData}
            hasMore={Boolean(nextPage)}
            threshold={20}
          >
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
              {digimon.map((data) => (
                <Card key={data.name} data={data} />
              ))}
            </div>
          </InfiniteScroll>
        )}
        {isLoading && <Loader />}
      </div>
    </div>
  );
};

export default IndexPage;
