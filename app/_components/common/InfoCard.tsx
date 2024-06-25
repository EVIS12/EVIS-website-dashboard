import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { DeleteIcon, EditIcon } from '../../_utils/SVGIcons';
import 'react-loading-skeleton/dist/skeleton.css';
import { MutationTrigger } from '@reduxjs/toolkit/dist/query/react/buildHooks';
import {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
  FetchBaseQueryMeta,
  MutationDefinition,
} from '@reduxjs/toolkit/dist/query';
import Swal from 'sweetalert2';

interface Props {
  id: string;
  image?: string | React.ReactNode;
  title: string | React.ReactNode;
  subtitle?: string | React.ReactNode;
  infoLink?: string;
  className?: string;
  editLink?: string;
  imageCover?: boolean;
  deleteLink?: MutationTrigger<
    MutationDefinition<
      {
        id: string;
      },
      BaseQueryFn<
        string | FetchArgs,
        unknown,
        FetchBaseQueryError,
        {},
        FetchBaseQueryMeta
      >,
      | 'SpeakersVersion'
      | 'Speakers'
      | 'ExhibitorsVersion'
      | 'Exhibitors'
      | 'FloorPlan'
      | 'Location'
      | 'RegisterLinks'
      | 'Timer'
      | 'Statistics'
      | 'Blog'
      | 'News'
      | 'Testimonials'
      | 'Advisors'
      | 'Files'
      | 'Contacts'
      | 'CPD-FAQ'
      | 'Attendees'
      | 'Sponsors-Categories'
      | 'Sponsors',
      void,
      'mainApi'
    >
  >;
}

export default function InfoCard({
  id,
  image,
  title,
  subtitle,
  className,
  infoLink,
  editLink,
  imageCover,
  deleteLink,
}: Props) {
  const deleteHandler = () => {
    Swal.fire({
      title: 'Are you sure?',
      text: `To delete ${title}, You won't be able to revert this!`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      result.isConfirmed && deleteLink && deleteLink({ id });
    });
  };

  return (
    <div
      className={`flex items-center justify-between bg-white ${className} rounded-xl w-full py-3 px-5 md:py-5 md:px-10 3xl:py-7 3xl:px-12 my-4 md:my-6 shadow-sm drop-shadow-md`}
    >
      {
        <Link
          href={infoLink ? `${infoLink}/${id}` : ''}
          className="info flex items-center lg:w-1/2"
        >
          {image && typeof image === 'string' ? (
            <Image
              className={`w-12 aspect-square ${
                imageCover ? 'object-cover' : 'object-contain'
              } md:w-16 3xl:w-20 rounded-full`}
              src={image}
              alt="Card Image"
              width={100}
              height={100}
            />
          ) : (
            <div className="w-12 aspect-square rounded-full">{image}</div>
          )}

          <h3 className="text-main-dark font-semibold md:text-xl 3xl:text-2xl ml-2 md:ml-4 lg:ml-6">
            {title}
          </h3>
        </Link>
      }
      <p className="hidden md:block text-dark-gray text-xs md:text-base 3xl:text-lg">
        {subtitle}
      </p>
      <div className="links flex">
        {editLink && (
          <Link
            className="w-fit"
            href={`${editLink}/${id}`}
            aria-label={`${title} Edit Link`}
          >
            <EditIcon className="w-[20px] md:w-8 lg:w-12" />
          </Link>
        )}
        {deleteLink && (
          <button
            className="ml-5 lg:ml-0 w-fit"
            name="delete-btn"
            aria-label="Delete Button"
            onClick={deleteHandler}
          >
            <DeleteIcon className="w-6 md:w-8 lg:w-12" />
          </button>
        )}
      </div>
    </div>
  );
}
