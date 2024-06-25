'use client';

import { InfoDetails, Loader } from '@/app/_components';
import { useGetSpeakerInfoQuery } from '@/app/_redux/apiService/mainApi';
import { displayError } from '@/app/_utils/functions';
import { useParams } from 'next/navigation';
import React from 'react';

export default function SpeakerInfo() {
  const { id } = useParams();
  const {
    data: speaker,
    isLoading,
    error,
  } = useGetSpeakerInfoQuery({ id: id as string });

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    displayError(error);
  }

  return (
    speaker && (
      <section className="section-pad">
        <InfoDetails
          image={speaker?.photo}
          title={speaker?.name}
          subtitle={speaker.job_title}
          description={speaker.description}
          social_links={{
            facebook: speaker.facebook,
            twitter: speaker.twitter,
            linkedin: speaker.linkedin,
          }}
          fields={Object.entries({
            Year: speaker?.version,
            Country: speaker.country,
            Company: speaker.company,
          })}
          btn={{
            title: `Edit ${speaker.name} Info`,
            link: `/pages/speakers/edit/${id}`,
          }}
        />
      </section>
    )
  );
}
