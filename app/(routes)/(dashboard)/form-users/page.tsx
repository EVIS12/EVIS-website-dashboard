'use client';

import React, { useMemo } from 'react';
import { Loader, PagesHead } from '@/app/_components';
import {
  useGetDownloadFormUsersQuery,
  useGetFilesTypesQuery,
} from '@/app/_redux/apiService/mainApi';
import { displayError } from '@/app/_utils/functions';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import FileDownload from 'js-file-download';

export default function FormUsers() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const session = useSession();

  const {
    data: formUsers,
    isLoading: formUsersLoading,
    error: formUsersError,
  } = useGetDownloadFormUsersQuery({ type: searchParams.get('type') ?? '' });

  const {
    data: filesTypes,
    isLoading: filesLoading,
    error: filesError,
  } = useGetFilesTypesQuery();

  const downloadSheet = async () => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/dashboard/contract-form/${
        searchParams.get('type')
          ? `download_by_filter/?contract_file__type=${searchParams.get(
              'type'
            )}`
          : 'download_all_excel/'
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
          : 'Download Form'
      }.xlsx`
    );
  };

  useMemo(() => {
    if (formUsersError) {
      displayError(formUsersError);
    }
  }, [formUsersError]);

  useMemo(() => {
    if (filesError) {
      displayError(filesError);
    }
  }, [filesError]);

  if (formUsersLoading || filesLoading) return <Loader />;

  return (
    <section className="section-pad">
      <PagesHead title="Download Form" />
      <div className="formUsers mt-8 md:mt-14 lg:mt-20 lg:w-2/3 mx-auto">
        {/* filters bar */}
        <div className="head flex flex-wrap justify-between">
          {[
            {
              filterName: 'File Name',
              options: ['', ...(filesTypes as Array<string>)],
            },
          ].map(({ filterName, options }, i) => (
            <div
              className="filter-container text-xs md:text-base 3xl:text-xl flex items-center bg-white rounded-full py-2 px-3 md:py-3 md:px-5 w-fit mr-4"
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
                  router.push(`${pathname}?type=${e.currentTarget.value}`)
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
            className="main-btn !px-2 md:!px-4 my-3 md:my-0"
            onClick={downloadSheet}
          >
            Export users in Excel sheet
          </button>
        </div>
        <div className="formUsers-cards">
          {formUsers?.results?.map(({ name, id, company, industry }) => (
            <Link
              className={`flex items-center justify-between bg-white rounded-xl w-full py-3 px-5 md:py-6 md:px-10 3xl:py-7 3xl:px-12 my-4 md:my-6 shadow-sm drop-shadow-md`}
              href={`/form-users/${id}`}
              key={id}
            >
              <h3 className="text-main-dark font-semibold md:text-xl 3xl:text-2xl ml-2 md:ml-4 lg:ml-6">
                {name}
              </h3>

              <p className="hidden md:block text-dark-gray text-xs md:text-base 3xl:text-lg">
                {company}
              </p>
              <p className="block text-dark-gray text-xs md:text-base 3xl:text-lg">
                {industry}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
