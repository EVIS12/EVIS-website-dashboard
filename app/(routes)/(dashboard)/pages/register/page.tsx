'use client';

import { EditLinkCard, Loader } from '@/app/_components';
import {
  useEditRegisterLinkMutation,
  useGetRegisterLinksQuery,
} from '@/app/_redux/apiService/mainApi';
import { displayError, displaySuccess } from '@/app/_utils/functions';
import React, { useMemo } from 'react';

export default function RegisterLinks() {
  const { data, isLoading, error } = useGetRegisterLinksQuery();
  const [
    editLink,
    { isLoading: editing, error: editingError, isSuccess: edited },
  ] = useEditRegisterLinkMutation();

  useMemo(() => {
    if (error) {
      displayError(error);
    }
  }, [error]);

  useMemo(() => {
    if (editingError) {
      displayError(editingError);
    }
  }, [editingError]);

  useMemo(() => {
    if (edited) {
      displaySuccess('Link edited successfully');
    }
  }, [edited]);

  if (isLoading || editing) {
    return <Loader />;
  }

  return (
    <section className="section-pad">
      <div className="head mb-8">
        <h4 className=" text-main-dark font-semibold md:text-lg">
          Edit Registration Links
        </h4>
      </div>
      <div className="body w-full md:w-[55%] 3xl:w-1/2 mx-auto mt-10 md:mt-20">
        {data?.map(({ id, type, link }) => (
          <EditLinkCard
            id={id}
            title={type}
            value={link}
            position="outside"
            key={id}
            // @ts-ignore
            editLink={editLink}
          />
        ))}
      </div>
    </section>
  );
}
