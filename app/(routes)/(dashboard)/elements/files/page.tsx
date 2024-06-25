'use client';

import { Loader, MainModal, PagesHead } from '@/app/_components';
import {
  useAddFileMutation,
  useEditFileMutation,
  useGetFilesQuery,
} from '@/app/_redux/apiService/mainApi';
import { UploadIcon } from '@/app/_utils/SVGIcons';
import { displayError, displaySuccess } from '@/app/_utils/functions';
import { SendFile } from 'Files';
import React, { useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';

export default function Files() {
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SendFile>();

  const {
    data: files,
    isLoading: filesLoading,
    error: filesError,
  } = useGetFilesQuery();

  const [
    addFile,
    { isLoading: fileSending, error: sendFileError, isSuccess: fileSended },
  ] = useAddFileMutation();

  const [
    editFile,
    { isLoading: fileEditing, error: editFileError, isSuccess: fileEdited },
  ] = useEditFileMutation();

  const addHandler = (value: SendFile) => {
    const fileData = new FormData();
    fileData.append('file', value.file[0]);
    fileData.append('type', value.type);
    addFile(fileData);
  };

  const editHandler = ({ value, id }: { value: File; id: string }) => {
    const fileForm = new FormData();
    fileForm.append('file', value);
    editFile({ body: fileForm, id });
  };

  useMemo(() => {
    filesError && displayError(filesError);
  }, [filesError]);

  useMemo(() => {
    sendFileError && displayError(sendFileError);
  }, [sendFileError]);

  useMemo(() => {
    editFileError && displayError(editFileError);
  }, [editFileError]);

  useMemo(() => {
    fileSended && displaySuccess('File Added Successfully!');
  }, [fileSended]);

  useMemo(() => {
    fileEdited && displaySuccess('File Edited Successfully!');
  }, [fileEdited]);

  if (fileSending || filesLoading || fileEditing) return <Loader />;

  return (
    <section className="section-pad">
      <PagesHead
        title="Files"
        btn={
          files && files?.length < 7
            ? { title: 'Add File', setModalOpen }
            : undefined
        }
      />

      {/* Add File Modal*/}
      <MainModal setModalOpen={setModalOpen} modalOpen={modalOpen}>
        <form onSubmit={handleSubmit(addHandler)}>
          <div className="file-input mb-4">
            <input
              className="w-auto"
              type="file"
              {...register('file', {
                required: 'File is required',
              })}
            />
            {errors.file && (
              <p className="error text-center text-red-800">
                {errors.file?.message}
              </p>
            )}
          </div>
          <div className={`input-container`}>
            <label className="label !mb-1" htmlFor="name">
              Name
            </label>
            <input
              id="name"
              className={`add-input ${errors.type && 'input-error'}`}
              type="text"
              {...register('type', { required: 'File name is required' })}
            />
            <p className="error">{errors.type?.message}</p>
          </div>{' '}
          <button className="main-btn mt-6" type="submit">
            Add File
          </button>
        </form>
      </MainModal>

      <div className="cards mt-8 md:mt-14 lg:mt-20 lg:w-2/3 mx-auto">
        {files?.map(({ id, type }) => (
          <div
            className="flex items-center justify-between bg-white rounded-xl w-full py-3 px-5 md:py-5 md:px-10 3xl:py-7 3xl:px-12 my-4 md:my-6 shadow-sm drop-shadow-md"
            key={id}
          >
            <a
              className="font-semibold text-main-dark md:text-xl 3xl:text-2xl"
              href={`${process.env.NEXT_PUBLIC_API_URL}/conference/contract-form/?filetype=${type}`}
              target="_blank"
            >
              {type}
            </a>
            <input
              className="w-auto hidden"
              id={`edit-file-input-${id}`}
              type="file"
              onChange={(e) => {
                console.log();
                e.currentTarget.files &&
                  editHandler({ value: e.currentTarget.files?.[0], id });
              }}
            />
            <button
              className="outline-none"
              onClick={() =>
                document.getElementById(`edit-file-input-${id}`)?.click()
              }
            >
              <UploadIcon className="w-4 3xl:w-8" />
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}
