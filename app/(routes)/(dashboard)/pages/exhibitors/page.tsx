'use client';

import {
  InfoCard,
  InfoCardLoader,
  PagesHead,
  FiltersBar,
} from '@/app/_components';
import {
  useDeleteExhibitorMutation,
  useGetAllExhibitorsQuery,
} from '@/app/_redux/apiService/mainApi';
import { displayError } from '@/app/_utils/functions';
import { useSearchParams } from 'next/navigation';
import React, { useMemo, useState } from 'react';
import { RecievedExhibitor } from 'Exhibitors';

export default function ExhibitorsVesrion() {
  const searchParams = useSearchParams();
  const [allExhibitors, setAllExhibitors] = useState<RecievedExhibitor[]>();

  const {
    data: exhibitors,
    isLoading: exhibitorsLoading,
    error: exhibitorsError,
  } = useGetAllExhibitorsQuery({
    sort: searchParams.get('sort') ?? '',
    country: searchParams.get('country') ?? '',
  });

  const [
    deleteExhibitor,
    {
      error: deletingError,
      isLoading: deletingExhibitor,
      isSuccess: exhibitorDeleted,
    },
  ] = useDeleteExhibitorMutation();

  useMemo(() => {
    if (exhibitorsError) {
      displayError(exhibitorsError);
    }
  }, [exhibitorsError]);

  useMemo(() => {
    if (deletingError) {
      displayError(deletingError);
    }
  }, [deletingError]);

  useMemo(() => {
    if (exhibitorDeleted) {
      setAllExhibitors([]);
    }
  }, [exhibitorDeleted]);

  return (
    <>
      <section className="section-pad">
        <PagesHead
          title={`<span>EVIS</span> Exhibitors`}
          btn={{ title: 'Add Exhibitor', link: '/pages/exhibitors/add' }}
        />

        <div className="exhibitors mt-8 md:mt-14 lg:mt-20">
          <FiltersBar sort={['Name']} />
          <div className="exhibitors-cards">
            {exhibitorsLoading || deletingExhibitor ? (
              <InfoCardLoader />
            ) : (
              exhibitors?.map(({ id, logo, name, standNumber }) => (
                <InfoCard
                  id={id}
                  image={logo}
                  title={name}
                  subtitle={standNumber}
                  editLink="/pages/exhibitors/edit"
                  deleteLink={deleteExhibitor}
                  key={id}
                />
              ))
            )}
          </div>
        </div>
      </section>
    </>
  );
}
