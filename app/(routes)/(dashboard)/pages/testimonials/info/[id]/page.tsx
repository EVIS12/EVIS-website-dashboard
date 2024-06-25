'use client';

import { Loader, SummaryCard } from '@/app/_components';
import { useGetTestimonialQuery } from '@/app/_redux/apiService/mainApi';
import { displayError } from '@/app/_utils/functions';
import React, { useMemo } from 'react';

export default function TestimonialInfo({
  params: { id },
}: {
  params: { id: string };
}) {
  const {
    data: testimonial,
    isLoading: testimonialLoading,
    error: testimonialError,
  } = useGetTestimonialQuery({ id });

  useMemo(() => {
    if (testimonialError) {
      displayError(testimonialError);
    }
  }, [testimonialError]);

  if (testimonialLoading) return <Loader />;
  console.log(testimonial);
  return (
    <section className="section-pad">
      {testimonial && (
        <SummaryCard
          image={testimonial?.photo}
          title={testimonial?.name}
          subtitle={testimonial?.company}
          description={testimonial?.body}
          link={testimonial?.youtube_link}
          btn={`/pages/testimonials/edit/${id}`}
        />
      )}
    </section>
  );
}
