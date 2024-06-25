'use client';

import React from 'react';
import { useGetMyInfoQuery } from '@/app/_redux/apiService/mainApi';
import { Loader } from '..';
import { signOut, useSession } from 'next-auth/react';
export default function AcountInfo() {
  const { data, isLoading } = useGetMyInfoQuery();
  if (isLoading) return <Loader />;

  return (
    <header className="w-full flex justify-end my-5">
      <div className="profile flex items-center">
        <div className="info mr-4">
          <h4 className="font-bold text-main-dark text-sm md:text-base 3xl:text-xl">
            {data?.name}
          </h4>
        </div>{' '}
        <button className="main-btn !py-2 !px-4" onClick={() => signOut()}>
          Logout
        </button>
      </div>
    </header>
  );
}
