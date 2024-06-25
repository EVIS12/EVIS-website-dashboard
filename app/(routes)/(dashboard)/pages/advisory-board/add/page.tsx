'use client';

import React, { useMemo } from 'react';
import { EditForm, Loader } from '@/app/_components';
import { advisorFields } from '@/app/_utils/info';
import { useForm } from 'react-hook-form';
import { useAddAdvisorMutation } from '@/app/_redux/apiService/mainApi';
import { displayError, displaySuccess } from '@/app/_utils/functions';
import { SendAdvisor } from 'Advisors';

export default function AddAdvisor() {
  const [
    addAdvisor,
    {
      isLoading: advisorSending,
      error: addAdvisorError,
      isSuccess: advisorAdded,
    },
  ] = useAddAdvisorMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm<SendAdvisor>();

  const onSubmit = (formValue: SendAdvisor) => {
    const advisorForm = new FormData();
    Object.entries(formValue).map(([key, value]) => {
      if (key === 'photo') {
        advisorForm.append(key, formValue.photo[0]);
      } else {
        advisorForm.append(key, value as string);
      }
    });
    addAdvisor(advisorForm);
  };

  useMemo(() => {
    addAdvisorError && displayError(addAdvisorError);
  }, [addAdvisorError]);

  useMemo(() => {
    if (advisorAdded) {
      displaySuccess('Advisor Added Successfully!');
      reset();
    }
  }, [advisorAdded]);

  if (advisorSending) return <Loader />;

  return (
    <section className="section-pad">
      <div className="head mb-8">
        <h4 className=" text-main-dark font-semibold md:text-lg">
          Add Advisor
        </h4>
      </div>
      <EditForm<SendAdvisor>
        register={register}
        handleSubmit={handleSubmit}
        errors={errors}
        watch={watch}
        onSubmit={onSubmit}
        fields={advisorFields}
        image=""
        formType="add"
        model="Advisor"
      />
    </section>
  );
}
