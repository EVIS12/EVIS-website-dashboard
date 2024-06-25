'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { Loader, PagesHead } from '@/app/_components';
import { useRegistrationFormUsersQuery } from '@/app/_redux/apiService/mainApi';
import { displayError } from '@/app/_utils/functions';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import FileDownload from 'js-file-download';
import InfiniteScroll from 'react-infinite-scroll-component';
import { RegistrationFormUser } from '@/app/_types/register-forms';

export default function RegistrationForm() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const session = useSession();

  const [page, setPage] = useState<number>(1);
  const [allUsers, setAllUsers] = useState<RegistrationFormUser[]>([]);

  const {
    data: registrationUsers,
    isLoading: registrationUsersLoading,
    error: registrationUsersError,
  } = useRegistrationFormUsersQuery({
    interested_in: searchParams.get('interested_in') ?? '',
    page,
  });
  const downloadSheet = async () => {
    const res = await fetch(
      `${
        process.env.NEXT_PUBLIC_API_URL
      }/dashboard/register-interest/download_all_excel_by_filter_interested_in/?interested_in=${
        searchParams.get('interested_in') ?? ''
      }`,
      {
        method: 'GET',

        headers: {
          Authorization: `Bearer ${session?.data?.token.access as string}`,
        },
      }
    );

    FileDownload(
      await res.blob(),
      `${
        (searchParams.get('type')?.length ?? 0) > 0
          ? searchParams.get('type')
          : 'Registration Form'
      }.xlsx`
    );
  };

  useEffect(() => {
    !registrationUsersLoading &&
      (allUsers && page > 1
        ? setAllUsers([
            ...allUsers,
            ...(registrationUsers?.results as RegistrationFormUser[]),
          ])
        : setAllUsers(registrationUsers?.results ?? []));
  }, [registrationUsers]);

  useEffect(() => {
    setPage(1);
  }, [searchParams.get('interested_in')]);

  useMemo(() => {
    if (registrationUsersError) {
      displayError(registrationUsersError);
    }
  }, [registrationUsersError]);

  if (registrationUsersLoading) return <Loader />;

  return (
    <section className="section-pad">
      <PagesHead title="Register Form" />
      <div className="formUsers mt-8 md:mt-14 lg:mt-20 lg:w-2/3 mx-auto">
        {/* filters bar */}
        <div className="head flex flex-wrap justify-between">
          {[
            {
              filterName: 'Interested In',
              options: [
                '',
                'Attending',
                'Exhibiting',
                'Sponsoring',
                'Speaking',
              ],
            },
          ].map(({ filterName, options }, i) => (
            <div
              className="filter-container text-xs md:text-base 3xl:text-xl flex items-center bg-white rounded-full py-2 px-3 md:py-3 md:px-5 w-fit mr-4 my-2 md:my-0"
              key={i}
            >
              <label
                htmlFor={`${filterName}-filter`}
                className="text-light-gray font-medium"
              >
                {filterName}:{' '}
              </label>
              <select
                id={`${filterName}-filter`}
                className="min-w-16 outline-none text-dark-gray font-semibold !bg-transparent"
                onChange={(e) =>
                  router.push(
                    `${pathname}?interested_in=${e.currentTarget.value}`
                  )
                }
                defaultValue={searchParams.get('type') ?? ''}
              >
                {options.map((opt, i) => (
                  <option value={opt === '' ? '' : opt} key={i}>
                    {opt}
                  </option>
                ))}
              </select>
            </div>
          ))}
          <button
            className="main-btn !px-2 md:!px-4 my-2 md:my-0"
            onClick={downloadSheet}
          >
            Export users in Excel sheet
          </button>
        </div>
        <div className="formUsers-cards">
          <InfiniteScroll
            dataLength={allUsers?.length as number}
            next={() => setPage(page + 1)}
            style={{ display: 'flex', flexDirection: 'column' }} //To put endMessage and loader to the top.
            hasMore={(registrationUsers?.count as number) / 100 > page}
            loader={''}
          >
            {allUsers?.map(({ name, id, job_title, title }) => (
              <div
                className={`flex items-center justify-between bg-white rounded-xl w-full py-3 px-5 md:py-6 md:px-10 3xl:py-7 3xl:px-12 my-4 md:my-6 shadow-sm drop-shadow-md`}
                key={id}
              >
                <h3 className="text-main-dark font-semibold md:text-xl 3xl:text-2xl ml-2 md:ml-4 lg:ml-6">
                  {name}
                </h3>

                <p className="block text-dark-gray text-xs md:text-base 3xl:text-lg">
                  {job_title}
                </p>

                <p className="block text-dark-gray text-xs md:text-base 3xl:text-lg">
                  {title}
                </p>
              </div>
            ))}
          </InfiniteScroll>
        </div>
      </div>
    </section>
  );
}
