'use client';

import { EditForm, Loader } from '@/app/_components';
import {
  useAddSpeakerMutation,
  useGetSpeakersVersionsQuery,
} from '@/app/_redux/apiService/mainApi';
import { displayError, displaySuccess } from '@/app/_utils/functions';
import { speakerFields } from '@/app/_utils/info';
import React, { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { SendSpeaker } from 'Speakers';

export default function AddSpeaker() {
  const { data: versions } = useGetSpeakersVersionsQuery();
  const [addSpeaker, { isLoading, error, isSuccess }] = useAddSpeakerMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm<SendSpeaker>();

  console.log({ error });

  const onSubmit = (formValue: SendSpeaker) => {
    const speakerForm = new FormData();
    Object.entries(formValue).map(([key, value]) => {
      if (key === 'photo') {
        speakerForm.append(key, formValue.photo[0]);
      } else if (key === 'version') {
        formValue.version.map((item: string) =>
          speakerForm.append(
            key,
            versions?.filter(({ year }) => year === item)?.[0].id ??
              `${new Date().getFullYear()}`
          )
        );
      } else {
        speakerForm.append(key, value as string);
      }
    });
    addSpeaker(speakerForm);
  };

  useMemo(() => {
    if (error) {
      displayError(error);
    }
  }, [error]);

  useMemo(() => {
    if (isSuccess) {
      displaySuccess('Speaker Added Successfully');
      reset();
    }
  }, [isSuccess]);

  if (isLoading) {
    return <Loader />;
  }

  const newSpeakerFields = speakerFields.map((item) =>
    item.key === 'version'
      ? { ...item, options: versions?.map(({ year }) => year) }
      : item
  );

  return (
    <section className="section-pad">
      <div className="head mb-8">
        <h4 className=" text-main-dark font-semibold md:text-lg">
          Add Speaker
        </h4>
      </div>
      <EditForm<SendSpeaker>
        register={register}
        handleSubmit={handleSubmit}
        errors={errors}
        watch={watch}
        onSubmit={onSubmit}
        fields={newSpeakerFields}
        image=""
        formType="add"
        model="Speaker"
      />
    </section>
  );
}
