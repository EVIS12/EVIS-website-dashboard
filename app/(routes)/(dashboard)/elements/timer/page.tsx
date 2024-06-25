'use client';

import { Loader, PagesHead } from '@/app/_components';
import {
  useEditTimerMutation,
  useGetTimerQuery,
} from '@/app/_redux/apiService/mainApi';
import { displayError, displaySuccess } from '@/app/_utils/functions';
import { error } from 'console';
import React, { FormEvent, useEffect, useMemo, useState } from 'react';

export default function Timer() {
  const [time, setTime] = useState<string>('');
  const {
    data,
    isLoading: gettingTimer,
    error: getTimerError,
  } = useGetTimerQuery();

  const [
    editTimer,
    {
      isLoading: editingTimer,
      error: editingTimerError,
      isSuccess: timeEdited,
    },
  ] = useEditTimerMutation();

  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    editTimer({ id: data?.id as number, time });
  };

  useEffect(() => {
    setTime(data?.time as string);
  }, [data]);

  useMemo(() => {
    if (getTimerError) {
      displayError(getTimerError);
    }
  }, [getTimerError]);

  useMemo(() => {
    if (editingTimerError) {
      displayError(editingTimerError);
    }
  }, [editingTimerError]);

  useMemo(() => {
    if (timeEdited) {
      displaySuccess('Start Time Edited Successfully');
    }
  }, [timeEdited]);

  if (gettingTimer || editingTimer) {
    return <Loader />;
  }

  return (
    <section className="section-pad">
      <PagesHead title="<span>EVIS</span> Start Time" />
      <form
        className="w-2/3 3xl:w-1/2 mx-auto mt-10 flex flex-col items-center"
        onSubmit={submitHandler}
      >
        <div className="input-container w-full">
          <label htmlFor="start-time" className="label">
            Start Time
          </label>
          <input
            className="add-input"
            type="datetime-local"
            id="start-time"
            name="timer"
            onChange={(e) => setTime(e.currentTarget.value)}
            value={time ?? ''}
            required
          />
        </div>
        <button className="main-btn mx-auto mt-4 md:mt-8" type="submit">
          Edit Start Time
        </button>
      </form>
    </section>
  );
}
