'use client';

import { Loader } from '@/app/_components';
import { useGetFormUserQuery } from '@/app/_redux/apiService/mainApi';
import { useParams } from 'next/navigation';
import React from 'react';

export default function UserInfo() {
  const { id } = useParams();
  const {
    data: formUser,
    error: formUserError,
    isLoading: formUserLoading,
  } = useGetFormUserQuery({ id: id as string });

  if (formUserLoading) return <Loader />;
  console.log(formUser);
  return (
    <section className="section-pad">
      <div className="flex flex-col bg-white lg:w-2/3 mx-auto rounded-xl w-full py-5 px-5 md:py-10 md:px-10 3xl:py-12 3xl:px-12 my-4 md:my-6 shadow-sm drop-shadow-md ">
        {formUser &&
          Object.entries(formUser).map(
            ([key, value], i) =>
              key !== 'id' && (
                <div
                  className="flex items-center w-full my-3 text-dark-gray text-sm md:text-base lg:text-lg"
                  key={i}
                >
                  <p className="font-semibold w-1/2 capitalize">
                    {key.split('_').join(' ')}
                  </p>
                  <p className="w-1/2">{value}</p>
                </div>
              )
          )}
      </div>
    </section>
  );
}
