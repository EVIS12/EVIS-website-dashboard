'use client';

import { PenIcon, PlusIcon } from '@/app/_utils/SVGIcons';
import ProfileImage from '/public/profile.png';
import Image, { StaticImageData } from 'next/image';
import React from 'react';

import {
  FieldErrors,
  FieldValues,
  Path,
  RegisterOptions,
  UseFormHandleSubmit,
  UseFormRegister,
  UseFormWatch,
} from 'react-hook-form';

interface FieldInfo {
  title: string;
  key: string;
  type: string;
  width: string;
  properties?: {
    required?: string;
    value?: string | string[] | boolean;
  };
  options?: string[];
}

interface Props<FormType extends FieldValues> {
  register: UseFormRegister<FormType>;
  handleSubmit: UseFormHandleSubmit<FormType, undefined>;
  errors: FieldErrors<FormType>;
  watch: UseFormWatch<FormType>;
  onSubmit: (value: FormType) => void;
  fields: FieldInfo[];
  formType: string;
  image?: string;
  model: string;
  imageKey?: string;
  withImage?: boolean;
}

const sizes = {
  full: 'col-span-12',
  half: 'col-span-12 md:col-span-6',
  quarter: 'col-span-6 md:col-span-3',
};

export default function EditForm<FormType extends FieldValues>({
  register,
  handleSubmit,
  errors,
  watch,
  onSubmit,
  fields,
  formType,
  image,
  model,
  imageKey,
}: Props<FormType>) {
  //method to get the suit input for type

  const GetInput = ({
    type,
    key,
    properties,
  }: {
    type: string;
    key: string;
    properties?: { required?: string; value?: string | string[] | boolean };
  }) => {
    if (type === 'textarea') {
      return (
        <textarea
          id={key}
          className={`add-input resize-none h-[100px] ${
            errors?.[key as keyof FormType] && 'input-error'
          }`}
          {...register(key as Path<FormType>, properties as RegisterOptions)}
        ></textarea>
      );
    } else if (['url', 'text', 'checkbox'].includes(type)) {
      return (
        <input
          id={key}
          className={`add-input ${
            type === 'checkbox' && '!w-4 !h-4 accent-green-600 mx-2'
          } ${errors?.[key as keyof FormType] && 'input-error'}`}
          type={type}
          {...register(key as Path<FormType>, properties as RegisterOptions)}
        />
      );
    } else if (type === 'select') {
      //get specific field
      const [field] = fields.filter((item) => item.key === key);
      return (
        <select
          id={key}
          className={`add-input ${
            errors?.[key as keyof FormType] && 'input-error'
          }`}
          {...register(key as Path<FormType>, properties as RegisterOptions)}
          multiple={key === 'version'}
        >
          {field.options?.map((item, i) => (
            <option value={item} key={i}>
              {item}
            </option>
          ))}
        </select>
      );
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-white rounded-2xl p-8 md:p-12 lg:p-14 3xl:p-16 shadow-sm drop-shadow-lg flex flex-col lg:flex-row justify-between items-center lg:items-start lg:gap-10 3xl:gap-0"
    >
      {/* image input container */}
      <div className="image-input w-32 h-32 md:w-40 md:h-40 lg:w-48 lg:h-48 relative mb-20 md:mb-14 lg:mb-0">
        <Image
          className={`rounded-full w-full h-full object-contain bg-[#EEEEEE] ${
            formType !== 'edit' && 'border-4 border-[#DFDDDD]'
          }`}
          src={
            (watch(
              (imageKey as Path<FormType>) ??
                ('photo' as string | StaticImageData)
            )?.[0]
              ? URL.createObjectURL(
                  watch((imageKey as Path<FormType>) ?? 'photo')?.[0]
                )
              : formType === 'edit'
              ? image
              : ProfileImage) as string | StaticImageData
          }
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
          {...register((imageKey as Path<FormType>) ?? 'photo', {
            required: formType === 'add' && 'Photo Required',
          })}
        />
        {formType === 'add' && errors.photo && (
          <p className="error text-center text-red-800">
            {errors.photo?.message as string}
          </p>
        )}
      </div>

      <div className="other-inputs w-full lg:w-9/12 row gap-4 md:gap-6">
        {fields?.map(({ title, key, type, width, properties }, i) => (
          <div
            className={`input-container ${
              type === 'checkbox' && '!flex-row items-center'
            } ${sizes?.[width as keyof typeof sizes]}`}
            key={i}
          >
            <label className="label !mb-1" htmlFor={key}>
              {title}
            </label>
            {GetInput({
              key,
              properties,
              type,
            })}
            {errors?.[key as Path<FormType>] && (
              <p className="error">
                {errors?.[key as Path<FormType>]?.message as string}
              </p>
            )}
          </div>
        ))}
        <div className="btns w-full flex justify-end col-span-12 mt-6">
          <button className="main-btn" type="submit">
            {formType === 'edit' ? `Edit ${model} Info` : `Add ${model}`}
          </button>
        </div>
      </div>
    </form>
  );
}
