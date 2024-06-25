'use client';

import React, { useMemo, useState } from 'react';
import Link from 'next/link';
import { Loader, MainModal, PagesHead } from '@/app/_components';
import { useForm } from 'react-hook-form';
import {
  useAddSponsorsCategoryMutation,
  useEditSponsorCategoryMutation,
  useGetSponsorsCategoriesQuery,
} from '@/app/_redux/apiService/mainApi';
import { displayError, displaySuccess } from '@/app/_utils/functions';
import { ReceivedSponsorsCategory, SponsorsCategory } from 'Sponsors';
import { EditIcon } from '@/app/_utils/SVGIcons';

export default function SponsorsCategories() {
  const {
    data: categories,
    error: categoriesError,
    isLoading: categoriesLoading,
  } = useGetSponsorsCategoriesQuery();

  useMemo(() => {
    if (categoriesError) {
      console.log(categoriesError);
      displayError(categoriesError);
    }
  }, [categoriesError]);

  // Handle Add Category
  const [addModalOpen, setAddModalOpen] = useState<boolean>(false);

  const [
    addSponsorCategory,
    {
      isLoading: addCategoryLoading,
      error: addCategoryError,
      isSuccess: addCategorySuccess,
    },
  ] = useAddSponsorsCategoryMutation();
  const {
    register: registerAddForm,
    handleSubmit: handleSubmitAddForm,
    formState: { errors: AddFormErrors },
  } = useForm<SponsorsCategory>();

  const addFormSubmitHandler = (value: SponsorsCategory) => {
    addSponsorCategory({ body: value });
    setAddModalOpen(false);
  };

  useMemo(() => {
    if (addCategoryError) {
      displayError(addCategoryError);
    }
  }, [addCategoryError]);

  useMemo(() => {
    if (addCategorySuccess) {
      displaySuccess('Category Added Successfully');
    }
  }, [addCategorySuccess]);

  // Handle Edit Form
  const [editModalOpen, setEditModalOpen] = useState<boolean>(false);
  const [
    editSponsorCategory,
    {
      isLoading: editCategoryLoading,
      error: editCategoryError,
      isSuccess: editCategorySuccess,
    },
  ] = useEditSponsorCategoryMutation();
  const {
    register: registerEditForm,
    handleSubmit: handleSubmitEditForm,
    formState: { errors: EditFormErrors },
    setValue: setEditFormValue,
  } = useForm<ReceivedSponsorsCategory>();

  const editFormSubmitHandler = (value: ReceivedSponsorsCategory) => {
    editSponsorCategory(value);
    setEditModalOpen(false);
  };

  useMemo(() => {
    if (editCategoryError) {
      displayError(editCategoryError);
    }
  }, [editCategoryError]);

  useMemo(() => {
    if (editCategorySuccess) {
      displaySuccess('Category Edited Successfully');
    }
  }, [editCategorySuccess]);

  if (addCategoryLoading || categoriesLoading || editCategoryLoading) {
    return <Loader />;
  }

  return (
    <>
      <section className="section-pad">
        <PagesHead
          title="<span>EVIS</span> Sponsors Categories"
          btn={{
            title: 'Add Category',
            setModalOpen: setAddModalOpen,
          }}
        />
        {/* Add Version Modal  */}
        <MainModal setModalOpen={setAddModalOpen} modalOpen={addModalOpen}>
          <form onSubmit={handleSubmitAddForm(addFormSubmitHandler)}>
            <div className={`input-container`}>
              <label className="label !mb-1" htmlFor="name">
                Category Name
              </label>
              <input
                id="name"
                className={`add-input ${AddFormErrors.name && 'input-error'}`}
                type="text"
                {...registerAddForm('name', { required: 'Name is required' })}
              />
              <p className="error">{AddFormErrors.name?.message}</p>
            </div>{' '}
            <div className={`input-container`}>
              <label className="label !mb-1" htmlFor="name">
                Order Number
              </label>
              <input
                id="name"
                className={`add-input ${AddFormErrors.name && 'input-error'}`}
                type="number"
                {...registerAddForm('order_num', {
                  required: 'Order number is required',
                })}
              />
              <p className="error">{AddFormErrors.name?.message}</p>
            </div>{' '}
            <button className="main-btn mt-6" type="submit">
              Add new category
            </button>
          </form>
        </MainModal>

        <div className="body flex flex-col w-4/5 lg:w-2/3 mx-auto mt-6 md:mt-12">
          {categories?.map(({ id, name, order_num }) => (
            <div className="flex gap-2" key={id}>
              <Link
                className="page-title text-center vesrion-card"
                href={`/pages/sponsors/categories?name=${name}`}
              >
                {name}
              </Link>
              <button
                onClick={() => {
                  setEditFormValue('id', id);
                  setEditFormValue('name', name);
                  setEditFormValue('order_num', order_num);
                  console.log({ id, name, order_num });
                  setEditModalOpen(true);
                }}
              >
                <EditIcon className="w-12" />
              </button>
            </div>
          ))}{' '}
          {/* Edit Version Modal  */}
          <MainModal setModalOpen={setEditModalOpen} modalOpen={editModalOpen}>
            <form onSubmit={handleSubmitEditForm(editFormSubmitHandler)}>
              <div className={`input-container`}>
                <label className="label !mb-1" htmlFor="name">
                  Category Name
                </label>
                <input
                  id="name"
                  className={`add-input ${
                    EditFormErrors.name && 'input-error'
                  }`}
                  type="text"
                  {...registerEditForm('name', {
                    required: 'Name is required',
                  })}
                />
                <p className="error">{EditFormErrors.name?.message}</p>
              </div>{' '}
              <div className={`input-container`}>
                <label className="label !mb-1" htmlFor="name">
                  Order Number
                </label>
                <input
                  id="name"
                  className={`add-input ${
                    EditFormErrors.name && 'input-error'
                  }`}
                  type="number"
                  {...registerEditForm('order_num', {
                    required: 'Order number is required',
                  })}
                />
                <p className="error">{EditFormErrors.name?.message}</p>
              </div>{' '}
              <button className="main-btn mt-6" type="submit">
                Edit
              </button>
            </form>
          </MainModal>
        </div>
      </section>
    </>
  );
}
