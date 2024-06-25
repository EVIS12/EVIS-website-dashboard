'use client';

import { Loader, PagesHead } from '@/app/_components';
import {
  useEditStatisticsMutation,
  useGetStatisticsQuery,
} from '@/app/_redux/apiService/mainApi';
import { RecievedStatistics, SendStatistics } from '@/app/_types/statistics';
import { PenIcon } from '@/app/_utils/SVGIcons';
import { displayError, displaySuccess } from '@/app/_utils/functions';
import { statistics } from '@/app/_utils/info';
import React, { FormEvent, useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';

export default function Statistics() {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<SendStatistics>();

  const {
    data: statisticsValues,
    isLoading: statisticsLoading,
    error: statisticsError,
  } = useGetStatisticsQuery();

  const [
    editStatistics,
    {
      isLoading: editingStatistics,
      error: editStatisticsError,
      isSuccess: statisticsEdited,
    },
  ] = useEditStatisticsMutation();

  const submitValues = (value: SendStatistics) => {
    editStatistics({ id: statisticsValues?.id as number, body: value });
  };

  useMemo(() => {
    if (statisticsError) {
      displayError(statisticsError);
    }
  }, [statisticsError]);

  useMemo(() => {
    if (editStatisticsError) {
      displayError(editStatisticsError);
    }
  }, [editStatisticsError]);

  useMemo(() => {
    if (statisticsEdited) {
      displaySuccess('Statistics edited successfully');
    }
  }, [statisticsEdited]);

  if (editingStatistics || statisticsLoading) {
    return <Loader />;
  }

  const newStatistics = statistics.map((item) => ({
    ...item,
    value: statisticsValues?.[item.key as keyof RecievedStatistics],
  }));

  return (
    <section className="section-pad">
      <PagesHead title="<span>EVIS</span> Statistics" />
      <form
        className="my-6 md:my-12 flex flex-col items-center"
        onSubmit={handleSubmit(submitValues)}
      >
        <div className="cards flex flex-wrap justify-center gap-5">
          {newStatistics.map(({ icon, title, key, value }, i) => (
            <div
              className="statistic relative w-32 md:w-44 3xl:w-52 bg-white p-4 rounded-lg flex flex-col justify-between"
              key={i}
            >
              <button
                title={`Edit ${title} Button`}
                onClick={(e) => {
                  e.preventDefault();
                  const input = document.getElementById(key);
                  input?.removeAttribute('disabled');
                }}
              >
                <PenIcon className=" absolute top-5 right-5 [&>path]:stroke-light-gray w-3 md:w-4 3xl:w-8" />
              </button>
              <div className="icon bg-[#F2F2F2] rounded-full p-2 w-fit aspect-square grid place-content-center">
                {icon}
              </div>
              <label
                className="my-2 3xl:my-3 text-dark-gray text-xs md:text-sm 3xl:text-base"
                htmlFor={key}
              >
                {title}
              </label>
              <input
                className=" text-xl md:text-2xl 3xl:text-3xl bg-transparent font-bold text-main-dark focus:outline-light-gray border-2 disabled:border-0"
                id={key}
                disabled
                required
                {...register(key as keyof SendStatistics, {
                  required: `${title} is required`,
                  value: statisticsValues?.[
                    key as keyof RecievedStatistics
                  ] as string,
                })}
              />
            </div>
          ))}
        </div>
        <button className="main-btn mt-8" type="submit">
          Send New Values
        </button>
      </form>
    </section>
  );
}
