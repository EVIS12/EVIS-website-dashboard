'use client';

import { EditForm } from '@/app/_components';
import { useAddExhibitorMutation } from '@/app/_redux/apiService/mainApi';
import { displayError, displaySuccess } from '@/app/_utils/functions';
import { exhibitorFields } from '@/app/_utils/info';
import { SendExhibitor } from 'Exhibitors';
import React, { useMemo } from 'react';
import { useForm } from 'react-hook-form';

export default function AddExhibitor() {
  const [
    addExhibitor,
    {
      isLoading: addingExhibitor,
      error: addingExhibitorError,
      isSuccess: exhibitorAdded,
    },
  ] = useAddExhibitorMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm<SendExhibitor>();

  const onSubmit = (formValue: SendExhibitor) => {
    // console.log(formValue);
    const exhibitorForm = new FormData();
    Object.entries(formValue).map(([key, value]) => {
      if (key === 'logo') {
        exhibitorForm.append(key, formValue?.logo[0]);
      } else {
        exhibitorForm.append(key, value as string);
      }
    });
    addExhibitor(exhibitorForm);
  };

  useMemo(() => {
    if (addingExhibitorError) {
      displayError(addingExhibitorError);
    }
  }, [addingExhibitorError]);

  useMemo(() => {
    if (exhibitorAdded) {
      displaySuccess('Exhibitor Added Successfully');
      reset();
    }
  }, [exhibitorAdded]);

  return (
    <section className="section-pad">
      <div className="head mb-8">
        <h4 className=" text-main-dark font-semibold md:text-lg">
          Add Exhibitor
        </h4>
      </div>
      <EditForm<SendExhibitor>
        register={register}
        handleSubmit={handleSubmit}
        errors={errors}
        watch={watch}
        onSubmit={onSubmit}
        fields={exhibitorFields}
        image=""
        imageKey="logo"
        formType="add"
        model="Exhibitor"
      />
    </section>
  );
}
