'use client';

import { EditForm, Loader } from '@/app/_components';
import { useAddTestimonialMutation } from '@/app/_redux/apiService/mainApi';
import { displayError, displaySuccess } from '@/app/_utils/functions';
import { testimonialsFields } from '@/app/_utils/info';
import React, { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { SendTestimonial } from 'Testimonials';

export default function AddTestimonial() {
  const [
    addTestimonial,
    {
      isLoading: testimonialSending,
      error: addTestimonialError,
      isSuccess: testimonialAdded,
    },
  ] = useAddTestimonialMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm<SendTestimonial>();

  const onSubmit = (formValues: SendTestimonial) => {
    const testimonialForm = new FormData();
    Object.entries(formValues).map(([key, value]) => {
      if (key === 'photo') {
        testimonialForm.append('photo', formValues.photo[0] as File);
      } else {
        testimonialForm.append(key, value as string);
      }
    });
    addTestimonial(testimonialForm);
  };

  useMemo(() => {
    if (addTestimonialError) {
      displayError(addTestimonialError);
    }
  }, [addTestimonialError]);

  useMemo(() => {
    if (testimonialAdded) {
      displaySuccess('Testimonial Added Successfully!');
    }
    reset();
  }, [testimonialAdded]);

  if (testimonialSending) return <Loader />;

  return (
    <section className="section-pad">
      <div className="head mb-8">
        <h4 className=" text-main-dark font-semibold md:text-lg">
          Add Testimonial
        </h4>
      </div>
      <EditForm<SendTestimonial>
        register={register}
        handleSubmit={handleSubmit}
        errors={errors}
        watch={watch}
        onSubmit={onSubmit}
        fields={testimonialsFields}
        image=""
        formType="add"
        model="Testimonial"
      />
    </section>
  );
}
