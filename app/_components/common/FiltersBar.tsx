'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import React, { useCallback } from 'react';
import Countries from '@/app/_utils/countries.json';

interface Props {
  sort: string[];
}

export default function FiltersBar({ sort }: Props) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams);
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );

  return (
    <div className="flex justify-between flex-wrap  my-4">
      <div className="filters flex">
        {[{ filterName: 'Country', options: ['All', ...Countries] }].map(
          ({ filterName, options }, i) => (
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
                className="min-w-16 outline-none text-dark-gray font-semibold !bg-transparent max-w-[80px] md:max-w-[120px] lg:max-w-[180px] overflow-x-scroll"
                onChange={(e) =>
                  router.push(
                    pathname +
                      '?' +
                      createQueryString(
                        filterName.toLowerCase(),
                        e.currentTarget.value
                      )
                  )
                }
                defaultValue={searchParams.get('country') ?? 'All'}
              >
                {options.map((opt, i) => (
                  <option value={opt === 'All' ? '' : opt} key={i}>
                    {opt}
                  </option>
                ))}
              </select>
            </div>
          )
        )}
      </div>
      <div className="filter-container flex items-center bg-white rounded-full py-2 px-3 md:py-3 md:px-5 w-fit sm:my-0 text-sm md:text-base 3xl:text-xl">
        <label htmlFor={`sort`} className="text-light-gray font-medium">
          Sort By:{' '}
        </label>
        <select
          id={`sort`}
          className="min-w-16 outline-none text-dark-gray font-semibold !bg-transparent"
          onChange={(e) =>
            router.push(
              pathname + '?' + createQueryString('sort', e.currentTarget.value)
            )
          }
          defaultValue={searchParams.get('sort') ?? 'none'}
        >
          {['None', ...sort].map((opt, i) => (
            <option value={opt} key={i}>
              {opt}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
