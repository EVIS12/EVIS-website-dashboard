'use client';

import {
  InfoCard,
  InfoCardLoader,
  PagesHead,
  FiltersBar,
} from '@/app/_components';
import {
  useDeleteSpeakerMutation,
  useGetAllSpeakersQuery,
} from '@/app/_redux/apiService/mainApi';
import { displayError } from '@/app/_utils/functions';
import { RecievedAllSpeakers } from 'Speakers';
import { useSearchParams } from 'next/navigation';
import React, { useEffect, useMemo, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';

export default function SpeakersVesrion() {
  const searchParams = useSearchParams();
  const [page, setPage] = useState<number>(1);
  const [allSpeakers, setAllSpeakers] = useState<RecievedAllSpeakers[]>();

  const { data, isLoading, error } = useGetAllSpeakersQuery({
    company: (searchParams?.get('company') as string) ?? '',
    country: (searchParams?.get('country') as string) ?? '',
    sort: (searchParams?.get('sort') as string) ?? '',
    version__year: (searchParams?.get('year') as string) ?? '',
    page,
  });

  const [
    deleteSpeaker,
    { error: deleteError, isLoading: deleting, isSuccess: speakerDeleted },
  ] = useDeleteSpeakerMutation();

  useEffect(() => {
    !deleteError &&
      !isLoading &&
      (allSpeakers && page > 1
        ? setAllSpeakers([
            ...allSpeakers,
            ...(data?.results as RecievedAllSpeakers[]),
          ])
        : setAllSpeakers(data?.results));
  }, [data]);

  useEffect(() => {
    setPage(1);
    setAllSpeakers([]);
  }, [searchParams?.get('country'), searchParams?.get('sort')]);

  useMemo(() => {
    if (error) {
      displayError(error);
    }
  }, [error]);

  useMemo(() => {
    if (deleteError) {
      displayError(deleteError);
    }
  }, [deleteError]);

  useMemo(() => {
    if (speakerDeleted) {
      setAllSpeakers([]);
      setPage(1);
    }
  }, [speakerDeleted]);

  return (
    <>
      <section className="section-pad">
        <PagesHead
          title={`<span>EVIS</span> Speakers <span>${searchParams?.get(
            'year'
          )}</span>`}
          btn={{ title: 'Add Speaker', link: '/pages/speakers/add' }}
        />

        <div className="speakers mt-8 md:mt-14 lg:mt-20">
          <FiltersBar sort={['Name', 'Company']} />

          <div className="speakers-cards">
            {isLoading || deleting || !allSpeakers ? (
              <InfoCardLoader />
            ) : (
              <InfiniteScroll
                dataLength={allSpeakers?.length as number}
                next={() => setPage(page + 1)}
                style={{ display: 'flex', flexDirection: 'column' }} //To put endMessage and loader to the top.
                hasMore={(data?.count as number) / 20 > page}
                loader={''}
              >
                {allSpeakers?.map(({ id, photo, name, job_title }) => (
                  <InfoCard
                    id={id}
                    image={photo}
                    title={name}
                    subtitle={job_title}
                    infoLink="/pages/speakers/info"
                    editLink="/pages/speakers/edit"
                    deleteLink={deleteSpeaker}
                    key={id}
                  />
                ))}
              </InfiniteScroll>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
