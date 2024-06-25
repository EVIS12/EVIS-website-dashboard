'use client';

import { EditForm, Loader } from '@/app/_components';
import { useAddSponsorMutation } from '@/app/_redux/apiService/mainApi';
import { displayError, displaySuccess } from '@/app/_utils/functions';
import { sponsorsFields } from '@/app/_utils/info';
import { useSearchParams } from 'next/navigation';
import React, { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { Sponsor } from 'Sponsors';

export default function AddSponsor() {
  const searchParams = useSearchParams();
  const [
    addSponsor,
    {
      isLoading: addSponsorLoading,
      error: addSponsorError,
      isSuccess: addSponsorSuccess,
    },
  ] = useAddSponsorMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm<Sponsor>();

  const onSubmit = (formValue: Sponsor) => {
    const sponsorForm = new FormData();
    Object.entries(formValue).map(([key, value]) => {
      if (key === 'logo') {
        sponsorForm.append(key, formValue.logo[0]);
      } else {
        sponsorForm.append(key, value as string);
      }
    });
    sponsorForm.append('category', searchParams.get('category') as string);
    addSponsor({ body: sponsorForm });
  };

  useMemo(() => {
    if (addSponsorError) {
      displayError(addSponsorError);
    }
  }, [addSponsorError]);

  useMemo(() => {
    if (addSponsorSuccess) {
      displaySuccess('Sponsor Added Successfully');
      reset();
    }
  }, [addSponsorSuccess]);

  if (addSponsorLoading) {
    return <Loader />;
  }

  return (
    <section className="section-pad">
      <div className="head mb-8">
        <h4 className=" text-main-dark font-semibold md:text-lg">
          Add Sponsor
        </h4>
      </div>
      <EditForm<Sponsor>
        register={register}
        handleSubmit={handleSubmit}
        errors={errors}
        watch={watch}
        onSubmit={onSubmit}
        fields={sponsorsFields}
        image=""
        imageKey="logo"
        formType="add"
        model="Sponsor"
      />
    </section>
  );
}
