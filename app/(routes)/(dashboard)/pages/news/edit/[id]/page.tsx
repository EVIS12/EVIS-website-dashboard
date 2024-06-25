'use client';
import { EditForm, Loader } from '@/app/_components';
import {
  useEditNewsMutation,
  useGetNewsInfoQuery,
} from '@/app/_redux/apiService/mainApi';
import { displayError, displaySuccess } from '@/app/_utils/functions';
import { newsFields } from '@/app/_utils/info';
import { RecievedNews, SendNews } from 'News';
import { useParams } from 'next/navigation';
import React, { useMemo } from 'react';
import { useForm } from 'react-hook-form';

export default function EditNews() {
  const { id } = useParams();
  const {
    data: newsInfo,
    isLoading: newsInfoLoading,
    error: newsInfoError,
  } = useGetNewsInfoQuery({ id: id as string });

  const [
    editNews,
    { isLoading: editingNews, isSuccess: newsEdited, error: editNewsError },
  ] = useEditNewsMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<SendNews>();

  const onSubmit = (formValues: SendNews) => {
    const newsForm = new FormData();
    Object.entries(formValues).map(([key, value]) => {
      if (key === 'photo') {
        formValues.photo.length > 0 &&
          newsForm.append('photo', formValues.photo[0] as File);
      } else {
        newsForm.append(key, value as string);
      }
    });
    editNews({ id: id as string, body: newsForm });
  };

  useMemo(() => {
    if (editNewsError) {
      displayError(editNewsError);
    }
  }, [editNewsError]);

  useMemo(() => {
    if (newsInfoError) {
      displayError(newsInfoError);
    }
  }, [newsInfoError]);

  useMemo(() => {
    if (newsEdited) {
      displaySuccess('News edited successfully');
    }
  }, [newsEdited]);

  if (editingNews || newsInfoLoading) return <Loader />;

  const fieldsWithValues = newsFields.map((field) => {
    return {
      ...field,
      properties: {
        ...field.properties,
        value: newsInfo?.[field.key as keyof RecievedNews],
      },
    };
  });

  return (
    <section className="section-pad">
      <div className="head mb-8">
        <h4 className=" text-main-dark font-semibold md:text-lg">Edit News</h4>
      </div>
      <EditForm<SendNews>
        register={register}
        handleSubmit={handleSubmit}
        errors={errors}
        watch={watch}
        onSubmit={onSubmit}
        fields={fieldsWithValues}
        image={newsInfo?.photo as string}
        formType="edit"
        model="News"
      />
    </section>
  );
}
