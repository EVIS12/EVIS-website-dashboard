'use client';

import { URLIcon } from '@/app/_utils/SVGIcons';
import {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
  FetchBaseQueryMeta,
  MutationDefinition,
} from '@reduxjs/toolkit/dist/query';
import { MutationTrigger } from '@reduxjs/toolkit/dist/query/react/buildHooks';
import React, { FormEvent, memo, useState } from 'react';

interface Props {
  id?: number;
  title: string;
  value: string;
  position: 'inside' | 'outside';
  editLink: MutationTrigger<
    MutationDefinition<
      | {
          link: string;
        }
      | { location: string }
      | {
          id: number;
          link: string;
        },
      BaseQueryFn<
        string | FetchArgs,
        unknown,
        FetchBaseQueryError,
        {},
        FetchBaseQueryMeta
      >,
      'FloorPlan',
      void,
      'mainApi'
    >
  >;
}

function EditLinkCard({ title, value, position, id, editLink }: Props) {
  const [link, setLink] = useState<string>();

  const handleEditLink = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    title === 'Location'
      ? editLink({ location: link ?? value })
      : id
      ? editLink({ id, link: link ?? value })
      : editLink({ link: link ?? value });
  };

  return (
    <form onSubmit={handleEditLink} className="edit-card my-5 md:my-10">
      {position === 'outside' && (
        <h3 className="page-title text-center mb-2 md:mb-4 capitalize">
          Register As {title}
        </h3>
      )}
      <div className="content bg-white rounded-2xl shadow-sm drop-shadow-lg flex flex-col p-5 md:p-10">
        {position === 'inside' && (
          <h3 className="page-title capitalize">Register As {title}</h3>
        )}
        <div className="input-container my-5 relative">
          <label
            className="label"
            htmlFor={`${title.split(' ').join('-')}-link`}
          >
            Link
          </label>
          <URLIcon className=" absolute top-[60%] left-0 w-4" />
          <input
            className="edit-input !pl-6"
            type="url"
            placeholder="https://website.com"
            value={link ?? value ?? ''}
            onChange={(e) => setLink(e.currentTarget.value)}
            required
          />
        </div>
        <button className="main-btn w-fit ml-auto !px-10">Edit Link</button>
      </div>
    </form>
  );
}

export default memo(EditLinkCard);
