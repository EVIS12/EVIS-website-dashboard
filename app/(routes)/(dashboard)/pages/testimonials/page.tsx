'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { InfoCard, InfoCardLoader, PagesHead } from '@/app/_components';
import {
  useDeleteTestimonialMutation,
  useGetAllTestimonialsQuery,
} from '@/app/_redux/apiService/mainApi';
import { RecievedTestimonialsInfo } from 'Testimonials';
import { displayError } from '@/app/_utils/functions';

export default function Testimonials() {
  const [page, setPage] = useState<number>(1);
  const [allTestimonials, setAllTestimonials] =
    useState<RecievedTestimonialsInfo[]>();

  const {
    data: testimonials,
    isLoading: testimonialsLoading,
    error: testimonialsError,
  } = useGetAllTestimonialsQuery({ page });

  const [
    deleteTestimonial,
    {
      isLoading: testimonialDeleting,
      error: testimonialDeleteError,
      isSuccess: testimonialsDeleted,
    },
  ] = useDeleteTestimonialMutation();

  useEffect(() => {
    !testimonialDeleting &&
      !testimonialsLoading &&
      (allTestimonials && page > 1
        ? setAllTestimonials([
            ...(testimonials?.results as RecievedTestimonialsInfo[]),
            ...allTestimonials,
          ])
        : setAllTestimonials(testimonials?.results));
  }, [testimonials]);

  useMemo(() => {
    if (testimonialsError) {
      displayError(testimonialsError);
    }
  }, [testimonialsError]);

  useMemo(() => {
    if (testimonialDeleteError) {
      displayError(testimonialDeleteError);
    }
  }, [testimonialDeleteError]);

  useMemo(() => {
    if (testimonialsDeleted) {
      setAllTestimonials([]);
      setPage(1);
    }
  }, [testimonialsDeleted]);

  return (
    <section className="section-pad">
      <PagesHead
        title="Testimonials"
        btn={{ title: 'Add Testimonial', link: '/pages/testimonials/add' }}
      />
      <div className="speakers mt-8 md:mt-14 lg:mt-20 lg:w-2/3 mx-auto">
        <div className="speakers-cards">
          {testimonialsLoading || testimonialDeleting ? (
            <InfoCardLoader />
          ) : (
            allTestimonials?.map(({ id, photo, name }) => (
              <InfoCard
                id={id}
                image={photo as string}
                title={name}
                infoLink="/pages/testimonials/info"
                editLink="/pages/testimonials/edit"
                imageCover={true}
                deleteLink={deleteTestimonial}
                key={id}
              />
            ))
          )}
        </div>
      </div>
    </section>
  );
}
