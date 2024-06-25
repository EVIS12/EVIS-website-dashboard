'use client';

import { Loader, SummaryCard } from '@/app/_components';
import { useGetNewsInfoQuery } from '@/app/_redux/apiService/mainApi';
import { displayError } from '@/app/_utils/functions';
import { data } from 'autoprefixer';
import { useParams } from 'next/navigation';
import React, { useMemo } from 'react';

export default function NewsInfo() {
  const { id } = useParams();
  const {
    data: newsInfo,
    isLoading: newsLoading,
    error: newsError,
  } = useGetNewsInfoQuery({ id: id as string });

  useMemo(() => {
    if (newsError) {
      displayError(newsError);
    }
  }, [newsError]);

  if (newsLoading) return <Loader />;

  return (
    <section className="section-pad">
      <SummaryCard
        image={newsInfo?.photo as string}
        title={newsInfo?.title as string}
        description={newsInfo?.body as string}
        link={newsInfo?.link as string}
        btn={`/pages/news/edit/${id}`}
      />
    </section>
  );
}
