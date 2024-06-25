'use client';
import { EditForm, Loader } from '@/app/_components';
import {
  useEditTestimonialMutation,
  useGetTestimonialQuery,
} from '@/app/_redux/apiService/mainApi';
import { displayError, displaySuccess } from '@/app/_utils/functions';
import { testimonialsFields } from '@/app/_utils/info';
import { RecievedTestimonial, SendTestimonial } from 'Testimonials';
import { useParams } from 'next/navigation';
import React, { useMemo } from 'react';
import { useForm } from 'react-hook-form';

export default function EditTestimonial() {
  const { id } = useParams();
  const {
    data: testimonial,
    isLoading: testimonialLoading,
    error: testimonialError,
  } = useGetTestimonialQuery({ id: id as string });

  const [
    editTestimonial,
    {
      isLoading: testimonialEditing,
      error: testimonialEditError,
      isSuccess: testimonailEdited,
    },
  ] = useEditTestimonialMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<SendTestimonial>();

  const onSubmit = (formValues: SendTestimonial) => {
    const testimonialForm = new FormData();
    Object.entries(formValues).map(([key, value]) => {
      if (key === 'photo') {
        formValues.photo.length > 0 &&
          testimonialForm.append('photo', formValues.photo[0] as File);
      } else {
        testimonialForm.append(key, value as string);
      }
    });
    editTestimonial({ id: id as string, body: testimonialForm });
  };

  useMemo(() => {
    testimonialError && displayError(testimonialError);
  }, [testimonialError]);

  useMemo(() => {
    testimonialEditError && displayError(testimonialEditError);
  }, [testimonialEditError]);

  useMemo(() => {
    testimonailEdited && displaySuccess('Testimonial Edited Successfully!');
  }, [testimonailEdited]);

  if (testimonialLoading || testimonialEditing) return <Loader />;

  const fieldsWithValues = testimonialsFields.map((field) => {
    return {
      ...field,
      properties: {
        ...field.properties,
        value: testimonial?.[field.key as keyof RecievedTestimonial],
      },
    };
  });

  return (
    <section className="section-pad">
      <div className="head mb-8">
        <h4 className=" text-main-dark font-semibold md:text-lg">
          Edit Testimonial
        </h4>
      </div>
      <EditForm<SendTestimonial>
        register={register}
        handleSubmit={handleSubmit}
        errors={errors}
        watch={watch}
        onSubmit={onSubmit}
        // @ts-ignore
        fields={fieldsWithValues}
        // @ts-ignore
        image={testimonial?.photo}
        formType="edit"
        model="Testimonial"
      />
    </section>
  );
}
