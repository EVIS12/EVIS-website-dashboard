'use client';

import React, { useMemo, useState } from 'react';
import Link from 'next/link';
import { Loader, MainModal, PagesHead } from '@/app/_components';
import { useForm } from 'react-hook-form';
import {
  useAddSpeakersVersionMutation,
  useGetSpeakersVersionsQuery,
} from '@/app/_redux/apiService/mainApi';
import { SendSpeakersVersion } from 'Speakers';
import { displayError, displaySuccess } from '@/app/_utils/functions';

interface err {
  status: number;
  data: {
    name: string[];
  };
}

export default function Speakers() {
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const {
    data: versions,
    error: versionsError,
    isLoading: versionsLoading,
  } = useGetSpeakersVersionsQuery();
  const [addSpeakerVersion, { isLoading, error, isSuccess: versionAdded }] =
    useAddSpeakersVersionMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SendSpeakersVersion>();

  const submitHandler = (value: SendSpeakersVersion) => {
    const { year } = value;
    addSpeakerVersion({ name: year, year });
    setModalOpen(false);
  };

  useMemo(() => {
    if (versionsError) {
      console.log(versionsError);
      displayError(versionsError);
    }
  }, [versionsError]);

  useMemo(() => {
    if (error) {
      displayError(error);
    }
  }, [error]);

  useMemo(() => {
    if (versionAdded) {
      displaySuccess('Speakers Version Added Successfully');
    }
  }, [versionAdded]);

  if (versionsLoading || isLoading) {
    return <Loader />;
  }

  return (
    <>
      <section className="section-pad">
        <PagesHead
          title="<span>EVIS</span> Speakers"
          btn={{
            title: 'Add Version',
            setModalOpen,
          }}
        />
        {/* Add Version Modal  */}
        <MainModal setModalOpen={setModalOpen} modalOpen={modalOpen}>
          <form onSubmit={handleSubmit(submitHandler)}>
            <div className={`input-container`}>
              <label className="label !mb-1" htmlFor="year">
                Year
              </label>
              <input
                id="year"
                className={`add-input ${errors.year && 'input-error'}`}
                type="text"
                {...register('year', { required: 'Year is required' })}
              />
              <p className="error">{errors.year?.message}</p>
            </div>{' '}
            <button className="main-btn mt-6" type="submit">
              Add new version
            </button>
          </form>
        </MainModal>

        <div className="body flex flex-col w-4/5 lg:w-2/3 mx-auto mt-6 md:mt-12">
          {versions?.map(({ id, year }) => (
            <Link
              className="page-title text-center vesrion-card"
              href={`/pages/speakers/versions?year=${year}`}
              key={id}
            >
              <span>EVIS</span> Speakers <span>{year}</span>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
