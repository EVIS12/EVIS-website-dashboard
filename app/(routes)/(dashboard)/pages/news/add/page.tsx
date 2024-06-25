'use client';

import { EditForm, Loader } from '@/app/_components';
import { useAddNewsMutation } from '@/app/_redux/apiService/mainApi';
import { displayError, displaySuccess } from '@/app/_utils/functions';
import { newsFields } from '@/app/_utils/info';
import { SendNews } from 'News';
import React, { useMemo } from 'react';
import { useForm } from 'react-hook-form';

export default function AddNews() {
  const [
    addNews,
    { isLoading: addingNews, isSuccess: newsAdded, error: newsError },
  ] = useAddNewsMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm<SendNews>();

  const onSubmit = (formValues: SendNews) => {
    const newsForm = new FormData();
    Object.entries(formValues).map(([key, value]) => {
      if (key === 'photo') {
        newsForm.append('photo', formValues.photo[0] as File);
      } else {
        newsForm.append(key, value as string);
      }
    });
    addNews(newsForm);
  };

  useMemo(() => {
    if (newsError) {
      displayError(newsError);
    }
  }, [newsError]);

  useMemo(() => {
    if (newsAdded) {
      displaySuccess('News added successfully');
      reset();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [newsAdded]);

  if (addingNews) return <Loader />;

  return (
    <section className="section-pad">
      <div className="head mb-8">
        <h4 className=" text-main-dark font-semibold md:text-lg">Add News</h4>
      </div>
      <EditForm<SendNews>
        register={register}
        handleSubmit={handleSubmit}
        errors={errors}
        watch={watch}
        onSubmit={onSubmit}
        fields={newsFields}
        image=""
        formType="add"
        model="News"
      />
    </section>
  );
}
