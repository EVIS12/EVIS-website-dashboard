'use client';
import { EditForm, Loader } from '@/app/_components';
import {
  useEditSponsorMutation,
  useGetSponsorQuery,
} from '@/app/_redux/apiService/mainApi';
import { displayError, displaySuccess } from '@/app/_utils/functions';
import { sponsorsFields } from '@/app/_utils/info';
import { RecievedSponsor, Sponsor } from 'Sponsors';
import { useParams } from 'next/navigation';
import React, { useMemo } from 'react';
import { useForm } from 'react-hook-form';

export default function EditSpeaker() {
  const { id } = useParams();

  const {
    data: sponsor,
    error: sponsorError,
    isLoading: sponsorLoading,
  } = useGetSponsorQuery({
    id: id as string,
  });

  const [
    editSponsor,
    {
      isLoading: editSponsorLoading,
      error: editSponsorError,
      isSuccess: editSponsorSuccess,
    },
  ] = useEditSponsorMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<Sponsor>();

  const onSubmit = (formValue: Sponsor) => {
    const editForm = new FormData();

    Object.entries(formValue).map(([key, value]) => {
      if (key === 'logo') {
        editForm.append('logo', formValue.logo[0]);
      } else {
        editForm.append(key, value as string);
      }
    });

    editSponsor({ body: editForm, id: id as string });
  };

  useMemo(() => {
    if (sponsorError) {
      displayError(sponsorError);
    }
  }, [sponsorError]);

  useMemo(() => {
    if (editSponsorError) {
      displayError(editSponsorError);
    }
  }, [editSponsorError]);

  useMemo(() => {
    if (editSponsorSuccess) {
      displaySuccess('Sponsor Edited Successfully');
    }
  }, [editSponsorSuccess]);

  if (editSponsorLoading || sponsorLoading) {
    return <Loader />;
  }

  const fieldsWithValues = sponsorsFields.map((field) => {
    return {
      ...field,
      properties: {
        value: sponsor?.[field.key as keyof RecievedSponsor],
      },
    };
  });

  return (
    <section className="section-pad">
      <div className="head mb-8">
        <h4 className=" text-main-dark font-semibold md:text-lg">
          Edit Sponsor
        </h4>
      </div>
      <EditForm<Sponsor>
        register={register}
        handleSubmit={handleSubmit}
        errors={errors}
        watch={watch}
        onSubmit={onSubmit}
        fields={fieldsWithValues}
        image={sponsor?.logo as string}
        formType="edit"
        model="Sponsor"
      />
    </section>
  );
}
