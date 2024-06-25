'use client';

import { InfoCard, InfoCardLoader, PagesHead } from '@/app/_components';
import {
  useDeleteArticleMutation,
  useGetAllArticlesQuery,
} from '@/app/_redux/apiService/mainApi';
import { displayError } from '@/app/_utils/functions';
import { RecievedArticleInfo } from 'Blog';
import React, { useEffect, useMemo, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';

export default function Blog() {
  const [allArticles, setAllArticles] = useState<RecievedArticleInfo[]>();
  const [page, setPage] = useState<number>(1);

  const {
    data: articles,
    isLoading: articlesLoading,
    error: articlesError,
  } = useGetAllArticlesQuery({ page });

  const [
    deleteArticle,
    {
      isLoading: deletingArticle,
      error: deleteError,
      isSuccess: articleDeleted,
    },
  ] = useDeleteArticleMutation();

  useEffect(() => {
    !deletingArticle &&
      !articlesLoading &&
      (allArticles && page > 1
        ? setAllArticles([
            ...(articles?.results as RecievedArticleInfo[]),
            ...allArticles,
          ])
        : setAllArticles(articles?.results));
  }, [articles]);

  useMemo(() => {
    if (articlesError) {
      displayError(articlesError);
    }
  }, [articlesError]);

  useMemo(() => {
    if (deleteError) {
      displayError(deleteError);
    }
  }, [deleteError]);

  useMemo(() => {
    if (articleDeleted) {
      setPage(1);
    }
  }, [articleDeleted]);

  return (
    <section className="section-pad">
      <PagesHead
        title="Blog"
        btn={{ title: 'Add Article', link: '/pages/blog/add' }}
      />
      <div className="blog mt-8 md:mt-14 lg:mt-20 ">
        <div className="blog-cards">
          {articlesLoading || deletingArticle ? (
            <InfoCardLoader />
          ) : (
            <InfiniteScroll
              dataLength={(allArticles?.length as number) ?? 0}
              next={() => setPage(page + 1)}
              style={{ display: 'flex', flexDirection: 'column-reverse' }} //To put endMessage and loader to the top.
              hasMore={(articles?.count as number) / 20 > page}
              loader={<InfoCardLoader />}
              scrollableTarget="scrollableDiv"
            >
              {allArticles?.map(({ photo, title, id }) => (
                <InfoCard
                  id={id}
                  image={photo}
                  imageCover={true}
                  title={title}
                  editLink="/pages/blog/edit"
                  deleteLink={deleteArticle}
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
