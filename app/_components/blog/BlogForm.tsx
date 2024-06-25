'use client';

import { PenIcon, PlusIcon } from '@/app/_utils/SVGIcons';
import ProfileImage from '/public/profile.png';
import dynamic from 'next/dynamic';
const Editor = dynamic(
  () => import('react-draft-wysiwyg').then((mod) => mod.Editor),
  { ssr: false }
);
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import Image from 'next/image';
import React, { useEffect } from 'react';
import {
  FieldErrors,
  UseFormHandleSubmit,
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch,
} from 'react-hook-form';
import { SendArticle } from 'Blog';
import { EditorState } from 'react-draft-wysiwyg';

interface Props {
  register: UseFormRegister<SendArticle>;
  handleSubmit: UseFormHandleSubmit<SendArticle, undefined>;
  errors: FieldErrors<SendArticle>;
  watch: UseFormWatch<SendArticle>;
  onSubmit: (value: SendArticle) => void;
  formType: string;
  image: string;
  values?: {
    title?: string;
    subtitle?: string;
    body?: EditorState;
    status?: boolean;
    schedule?: string;
    date_time?: string;
    press_center?: boolean;
    home_page?: boolean;
  };
  setValue: UseFormSetValue<SendArticle>;
}

const sizes = {
  full: 'col-span-12',
  half: 'col-span-12 md:col-span-6',
  quarter: 'col-span-6 md:col-span-3',
};

export default function BlogForm({
  register,
  handleSubmit,
  errors,
  watch,
  onSubmit,
  formType,
  image,
  setValue,
  values,
}: Props) {
  useEffect(() => {
    setValue('body', values?.body);
  }, []);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-white rounded-2xl p-8 md:p-12 lg:p-14 3xl:p-16 shadow-sm drop-shadow-lg flex flex-col lg:flex-row justify-between items-center lg:items-start lg:gap-10 3xl:gap-0"
    >
      {/* image input container */}
      <div className="image-input w-32 h-32 md:w-40 md:h-40 lg:w-48 lg:h-48 relative mb-20 md:mb-14 lg:mb-0">
        <Image
          className={`rounded-full w-full h-full object-cover bg-[#EEEEEE] ${
            formType !== 'edit' && 'border-4 border-[#DFDDDD]'
          }`}
          src={
            watch('photo')?.[0]
              ? URL.createObjectURL(watch('photo')?.[0])
              : formType === 'edit'
              ? image
              : ProfileImage
          }
          priority
          alt=""
          width={250}
          height={250}
        />
        <p className="text-dark-gray text-sm text-center mt-4">
          {formType === 'edit'
            ? 'Change Profile Picture'
            : 'Add Profile Picture'}
        </p>
        <button
          className={`absolute ${
            formType === 'edit'
              ? '-bottom-5 md:bottom-0 right-5'
              : '-bottom-3 right-1/2 translate-x-1/2'
          } bg-main-color rounded-full p-3 w-8 h-8 grid place-content-center`}
          onClick={(e) => {
            e.preventDefault();
            document.getElementById('photo')?.click();
          }}
        >
          {formType === 'edit' ? <PenIcon /> : <PlusIcon />}
        </button>
        <input
          className="hidden"
          type="file"
          id="photo"
          autoCorrect=""
          {...register('photo', {
            required: formType === 'add' && 'Photo Required',
          })}
        />
        {formType === 'add' && errors.photo && (
          <p className="error text-center text-red-800">
            {errors.photo?.message}
          </p>
        )}
      </div>

      <div className="other-inputs w-full lg:w-9/12 row gap-4 md:gap-6">
        {/* Title and subtitle */}
        {[
          { title: 'Title', key: 'title' },
          { title: 'Subtitle', key: 'subtitle' },
        ].map(({ title, key }, i) => (
          <div className={`input-container ${sizes.full}`} key={i}>
            <label className="label !mb-1" htmlFor={key}>
              {title}
            </label>
            <input
              id={key}
              className={`add-input  ${
                errors?.[key as keyof SendArticle] && 'input-error'
              }`}
              type="text"
              {...register(key as keyof SendArticle, {
                required: `${title} is required`,
                value: values?.[key as keyof typeof values] ?? '',
              })}
            />
            {errors?.[key as keyof SendArticle] && (
              <p className="error text-red-800">
                {errors?.[key as keyof SendArticle]?.message as string}
              </p>
            )}
          </div>
        ))}

        {/* Articel Body */}
        <div className={`input-container ${sizes.full}`}>
          <label className="label !mb-1" htmlFor={'body'}>
            Article Body
          </label>
          {
            <Editor
              editorState={watch('body')}
              defaultEditorState={values?.body as EditorState}
              wrapperClassName="demo-wrapper rounded-xl overflow-hidden border-[1px]"
              editorClassName="!min-h-[200px] !max-h-[400px] overflow-y-scroll border-2 !bg-[#ECECEC] px-5"
              onEditorStateChange={(state) => setValue('body', state)}
            />
          }
          {errors.body && (
            <p className="error text-red-800">
              {errors.body?.message as string}
            </p>
          )}
        </div>

        {/* Article status */}
        {[
          { title: 'Public', value: true },
          { title: 'Private', value: false },
        ].map(({ title, value }, i) => (
          <div
            className={`input-container ${sizes.quarter} !flex-row items-center`}
            key={i}
          >
            <input
              className={`add-input 
                !w-4 !h-4 accent-green-600 mx-2 ${
                  errors?.status && 'input-error'
                }`}
              id={title}
              value={value.toString()}
              type="radio"
              {...register('status', {
                required: `Status is required`,
                value: Boolean(values?.status?.toString()),
              })}
            />{' '}
            <label className="label !mb-1" htmlFor={title}>
              {title}
            </label>
          </div>
        ))}
        {errors.status && (
          <p className="error text-red-800">{errors.status?.message}</p>
        )}

        {/* Divider */}
        {!errors.status && <div className={`${sizes.half}`}></div>}

        {/* Publish date */}
        {[
          { key: 'schedule', title: 'Publish Date' },
          { key: 'date_time', title: 'Displayed Date' },
        ].map(({ title, key }, i) => (
          <div key={i} className={`input-container ${sizes.half}`}>
            <label className="label !mb-1" htmlFor={key}>
              {title}
            </label>
            <input
              className={`add-input  ${
                errors?.[key as keyof SendArticle] && 'input-error'
              }`}
              type="datetime-local"
              id={key}
              {...register(key as keyof SendArticle, {
                required: `${title} is required`,
                value: values
                  ? new Date(values?.[key as keyof typeof values] as string)
                      .toISOString()
                      .slice(0, 16)
                  : '',
              })}
            />

            {errors?.[key as keyof SendArticle] && (
              <p className="error text-red-800">
                {errors?.[key as keyof SendArticle]?.message as string}
              </p>
            )}
          </div>
        ))}

        {/* Press Center */}
        {[
          { title: 'Press Center', key: 'press_center' },
          { title: 'Home Page', key: 'home_page' },
        ].map(({ title, key }, i) => (
          <div
            className={`input-container ${sizes.quarter} !flex-row items-center`}
            key={i}
          >
            <label className="label !mb-1" htmlFor={key}>
              {title}
            </label>
            <input
              className={`!w-4 !h-4 accent-green-600 mx-2`}
              id={key}
              type="checkbox"
              {...register(key as keyof SendArticle, {
                value: values?.[key as keyof typeof values],
              })}
            />{' '}
          </div>
        ))}

        <div className="btns w-full flex justify-end col-span-12 mt-6">
          <button className="main-btn" type="submit">
            {formType === 'edit' ? `Edit Article Info` : `Add Article`}
          </button>
        </div>
      </div>
    </form>
  );
}
