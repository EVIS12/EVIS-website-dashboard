'use client';
import { EditForm, Loader } from '@/app/_components';
import {
  useEditAdvisorMutation,
  useGetAdvisorQuery,
} from '@/app/_redux/apiService/mainApi';
import { displayError, displaySuccess } from '@/app/_utils/functions';
import { advisorFields } from '@/app/_utils/info';
import { RecievedAdvisor, SendAdvisor } from 'Advisors';
import { useParams } from 'next/navigation';
import React, { useMemo } from 'react';
import { useForm } from 'react-hook-form';

export default function EditAdvisor() {
  const { id } = useParams();

  const {
    data: advisor,
    isLoading: advisorLoading,
    error: advisorError,
  } = useGetAdvisorQuery({ id: id as string });

  const [
    editAdvisor,
    {
      error: editAdvisorError,
      isLoading: advisorEditing,
      isSuccess: advisorEdited,
    },
  ] = useEditAdvisorMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<SendAdvisor>();

  const onSubmit = (formValues: SendAdvisor) => {
    const advisorForm = new FormData();
    Object.entries(formValues).map(([key, value]) => {
      if (key === 'photo') {
        formValues.photo.length > 0 &&
          advisorForm.append('photo', formValues.photo[0] as File);
      } else {
        advisorForm.append(key, value as string);
      }
    });
    editAdvisor({ id: id as string, body: advisorForm });
  };

  useMemo(() => {
    advisorError && displayError(advisorError);
  }, [advisorError]);

  useMemo(() => {
    editAdvisorError && displayError(editAdvisorError);
  }, [editAdvisorError]);

  useMemo(() => {
    if (advisorEdited) {
      displaySuccess('Advisor Edited Successfully');
    }
  }, [advisorEdited]);

  if (advisorLoading || advisorEditing) return <Loader />;

  const fieldsWithValues = advisorFields.map((field) => {
    return {
      ...field,
      properties: {
        ...field.properties,
        value: advisor?.[field.key as keyof RecievedAdvisor],
      },
    };
  });

  return (
    <section className="section-pad">
      <div className="head mb-8">
        <h4 className=" text-main-dark font-semibold md:text-lg">
          Edit Advisor
        </h4>
      </div>
      <EditForm<SendAdvisor>
        register={register}
        handleSubmit={handleSubmit}
        errors={errors}
        watch={watch}
        onSubmit={onSubmit}
        fields={fieldsWithValues}
        image={advisor?.photo as string}
        formType="edit"
        model="Advisor"
      />
    </section>
  );
}
