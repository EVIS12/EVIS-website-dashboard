'use client';

import { InfoCard, InfoCardLoader, PagesHead } from '@/app/_components';
import {
  useGetSponsorsQuery,
  useDeleteSponsorMutation,
} from '@/app/_redux/apiService/mainApi';
import { displayError } from '@/app/_utils/functions';
import { useSearchParams } from 'next/navigation';
import React, { useMemo } from 'react';

export default function SpeakersVesrion() {
  const searchParams = useSearchParams();

  const {
    data: sponsors,
    isLoading: sponsorsLoading,
    error: sponsorsError,
  } = useGetSponsorsQuery({ category: searchParams.get('name') as string });

  const [
    deleteSponsor,
    { error: deleteSponsorError, isLoading: deleteSponsorLoading },
  ] = useDeleteSponsorMutation();

  useMemo(() => {
    if (sponsorsError) {
      displayError(sponsorsError);
    }
  }, [sponsorsError]);

  useMemo(() => {
    if (deleteSponsorError) {
      displayError(deleteSponsorError);
    }
  }, [deleteSponsorError]);

  return (
    <>
      <section className="section-pad">
        <PagesHead
          title={searchParams?.get('name') as string}
          btn={{
            title: 'Add Sponsor',
            link: `/pages/sponsors/add/?category=${searchParams.get('name')}`,
          }}
        />

        <div className="sponsors mt-8 md:mt-14 lg:mt-20">
          <div className="sponsors-cards">
            {sponsorsLoading || deleteSponsorLoading ? (
              <InfoCardLoader />
            ) : (
              sponsors?.map(({ id, logo, subtitle }) => (
                <InfoCard
                  id={id}
                  image={logo}
                  title={subtitle}
                  editLink="/pages/sponsors/edit"
                  deleteLink={deleteSponsor}
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
