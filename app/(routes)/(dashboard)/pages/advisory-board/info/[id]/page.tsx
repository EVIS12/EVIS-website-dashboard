'use client';

import { InfoDetails, Loader } from '@/app/_components';
import { useGetAdvisorQuery } from '@/app/_redux/apiService/mainApi';
import { displayError } from '@/app/_utils/functions';
import React, { useMemo } from 'react';

interface Props {
  params: { id: string };
}

export default function AdvisorInfo({ params: { id } }: Props) {
  const {
    data: advisor,
    isLoading: advisorLoading,
    error: advisorError,
  } = useGetAdvisorQuery({ id });

  useMemo(() => {
    advisorError && displayError(advisorError);
  }, [advisorError]);

  if (advisorLoading) return <Loader />;

  return (
    <section className="section-pad">
      {advisor && (
        <InfoDetails
          image={advisor?.photo}
          title={advisor?.name}
          description={advisor.description}
          social_links={{
            facebook: advisor.facebook,
            twitter: advisor.twitter,
            linkedin: advisor.linkedin,
          }}
          fields={Object.entries({
            Job: advisor.job_title,
            Company: advisor.company,
          })}
          btn={{
            title: 'Edit Advisor Info',
            link: `/pages/advisory-board/edit/${id}`,
          }}
        />
      )}
    </section>
  );
}
