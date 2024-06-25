'use client';

import { InfoCard, InfoCardLoader, PagesHead } from '@/app/_components';
import {
  useDeleteNewsMutation,
  useGetAllNewsQuery,
} from '@/app/_redux/apiService/mainApi';
import { displayError } from '@/app/_utils/functions';
import { RecievedNews } from 'News';
import React, { useEffect, useMemo, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';

export default function News() {
  const [page, setPage] = useState<number>(1);
  const [allNews, setAllNews] = useState<RecievedNews[]>([]);

  const {
    data: news,
    isLoading: newsLoading,
    error: newsError,
  } = useGetAllNewsQuery({ page });

  const [
    deleteNews,
    { isLoading: deletingNews, error: deleteNewsError, isSuccess: newsDeleted },
  ] = useDeleteNewsMutation();

  useEffect(() => {
    !deletingNews &&
      !newsLoading &&
      (allNews && page > 1
        ? setAllNews([...allNews, ...(news?.results as RecievedNews[])])
        : setAllNews(news?.results ?? []));
  }, [news]);

  useMemo(() => {
    if (newsError) {
      displayError(newsError);
    }
  }, [newsError]);

  useMemo(() => {
    if (deleteNewsError) {
      displayError(deleteNewsError);
    }
  }, [deleteNewsError]);

  useMemo(() => {
    if (newsDeleted) {
      setAllNews([]);
      setPage(1);
    }
  }, [newsDeleted]);

  return (
    <section className="section-pad">
      <PagesHead
        title="News"
        btn={{ title: 'Add News', link: '/pages/news/add' }}
      />
      <div className="news mt-8 md:mt-14 lg:mt-20 mx-auto">
        <div className="news-cards">
          {newsLoading || deletingNews ? (
            <InfoCardLoader />
          ) : (
            <InfiniteScroll
              dataLength={allNews?.length as number}
              next={() => setPage(page + 1)}
              style={{ display: 'flex', flexDirection: 'column' }} //To put endMessage and loader to the top.
              hasMore={Math.ceil((news?.count as number) / 20) > page}
              loader={''}
            >
              {allNews?.map(({ id, title, photo }) => (
                <InfoCard
                  id={id}
                  image={photo}
                  title={title}
                  infoLink="/pages/news/info"
                  editLink="/pages/news/edit"
                  imageCover={true}
                  deleteLink={deleteNews}
                  key={id}
                />
              ))}
            </InfiniteScroll>
          )}
        </div>
      </div>
    </section>
  );
}
