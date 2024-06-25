'use client';
import { EditForm, Loader } from '@/app/_components';
import {
  useEditSpeakerMutation,
  useGetSpeakerInfoQuery,
  useGetSpeakersVersionsQuery,
} from '@/app/_redux/apiService/mainApi';
import { displayError, displaySuccess } from '@/app/_utils/functions';
import { speakerFields } from '@/app/_utils/info';
import {
  RecievedSpeaker,
  RecievedSpeakersVersion,
  SendSpeaker,
} from 'Speakers';
import { useParams } from 'next/navigation';
import React, { useMemo } from 'react';
import { useForm } from 'react-hook-form';

export default function EditSpeaker() {
  const { id } = useParams();

  const { data, error, isLoading } = useGetSpeakerInfoQuery({
    id: id as string,
  });

  const {
    data: versions,
    isLoading: versionsLoading,
    error: versionsError,
  } = useGetSpeakersVersionsQuery();

  const [
    editSpeaker,
    { isLoading: editingSpeaker, error: editingError, isSuccess: edited },
  ] = useEditSpeakerMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<SendSpeaker>();

  const onSubmit = (formValue: SendSpeaker) => {
    const editForm = new FormData();

    Object.entries(formValue).map(([key, value]) => {
      if (key === 'photo') {
        if (formValue.photo.length > 0) {
          editForm.append('photo', formValue.photo[0]);
        }
      } else if (key === 'version') {
        const yearsId = versions?.filter((item) =>
          formValue.version.includes(item.year)
        );

        yearsId?.map((item) => {
          editForm.append('version', item.id);
        });
      } else {
        editForm.append(key, value as string);
      }
    });

    editSpeaker({ body: editForm, id: id as string });
  };

  useMemo(() => {
    if (error) {
      displayError(error);
    }
  }, [error]);

  useMemo(() => {
    if (versionsError) {
      displayError(versionsError);
    }
  }, [versionsError]);

  useMemo(() => {
    if (editingError) {
      displayError(editingError);
    }
  }, [editingError]);

  useMemo(() => {
    if (edited) {
      displaySuccess('Speaker Edited Successfully');
    }
  }, [edited]);

  if (isLoading || versionsLoading || editingSpeaker) {
    return <Loader />;
  }

  const fieldsWithValues = speakerFields.map((field) => {
    return field.key === 'version'
      ? {
          ...field,
          options: (versions as RecievedSpeakersVersion[]).map(
            ({ year }) => year
          ),
          properties: {
            ...field.properties,
            value: data?.[field.key as keyof RecievedSpeaker],
          },
        }
      : {
          ...field,
          properties: {
            ...field.properties,
            value: data?.[field.key as keyof RecievedSpeaker],
          },
        };
  });

  return (
    <section className="section-pad">
      <div className="head mb-8">
        <h4 className=" text-main-dark font-semibold md:text-lg">
          Edit Speaker
        </h4>
      </div>
      <EditForm<SendSpeaker>
        register={register}
        handleSubmit={handleSubmit}
        errors={errors}
        watch={watch}
        onSubmit={onSubmit}
        fields={fieldsWithValues}
        image={data?.photo as string}
        formType="edit"
        model="Speaker"
      />
    </section>
  );
}
