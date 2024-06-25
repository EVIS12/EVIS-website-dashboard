'use client';
import { EditForm, Loader } from '@/app/_components';
import { exhibitorFields } from '@/app/_utils/info';
import React, { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { useParams } from 'next/navigation';
import {
  useEditExhibitorMutation,
  useGetExhibitorInfoQuery,
} from '@/app/_redux/apiService/mainApi';
import { displayError, displaySuccess } from '@/app/_utils/functions';
import { RecievedExhibitor, SendExhibitor } from 'Exhibitors';

export default function EditExhibitor() {
  const { id } = useParams();

  const {
    data: exhibitor,
    isLoading: exhibitorLoading,
    error: exhibitorError,
  } = useGetExhibitorInfoQuery({ id: id as string });

  const [
    editExhibitor,
    {
      isLoading: editingExhibitor,
      error: editingExhibitorError,
      isSuccess: exhibitorEdited,
    },
  ] = useEditExhibitorMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<SendExhibitor>();

  const onSubmit = (formValue: SendExhibitor) => {
    const editForm = new FormData();

    Object.entries(formValue).map(([key, value]) => {
      if (key === 'logo') {
        if (formValue.logo.length > 0) {
          editForm.append('logo', formValue.logo[0]);
        }
      } else {
        editForm.append(key, value as string);
      }
    });

    editExhibitor({ body: editForm, id: id as string });
  };

  useMemo(() => {
    if (exhibitorError) {
      displayError(exhibitorError);
    }
  }, [exhibitorError]);

  useMemo(() => {
    if (editingExhibitorError) {
      displayError(editingExhibitorError);
    }
  }, [editingExhibitorError]);

  useMemo(() => {
    if (exhibitorEdited) {
      displaySuccess('Exhibitor edited successfully');
    }
  }, [exhibitorEdited]);

  if (editingExhibitor || exhibitorLoading) {
    return <Loader />;
  }

  const fieldsWithValues = exhibitorFields.map((field) => {
    return {
      ...field,
      properties: {
        ...field.properties,
        value: exhibitor?.[field.key as keyof RecievedExhibitor],
      },
    };
  });

  return (
    <section className="section-pad">
      <div className="head mb-8">
        <h4 className=" text-main-dark font-semibold md:text-lg">
          Edit Exhibitor
        </h4>
      </div>
      <EditForm<SendExhibitor>
        register={register}
        handleSubmit={handleSubmit}
        errors={errors}
        watch={watch}
        onSubmit={onSubmit}
        fields={fieldsWithValues}
        image={exhibitor?.logo as string}
        imageKey="logo"
        formType="edit"
        model="Exhibitor"
      />
    </section>
  );
}
