'use client';

import {
  InfoCardLoader,
  Loader,
  MainModal,
  PagesHead,
} from '@/app/_components';
import {
  useAddFAQMutation,
  useDeleteFAQMutation,
  useEditFAQMutation,
  useGetFAQsQuery,
} from '@/app/_redux/apiService/mainApi';
import { DeleteIcon, EditIcon } from '@/app/_utils/SVGIcons';

import { displayError, displaySuccess } from '@/app/_utils/functions';
import { FAQ, ReceivedFAQ } from 'CPD';
import React, { Dispatch, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';

type ModalProps = {
  setModalOpen: Dispatch<React.SetStateAction<boolean>>;
  modalOpen: boolean;
};

export default function CPDFAQs() {
  const [addModalOpen, setAddModalOpen] = useState<boolean>(false);
  const [editModalOpen, setEditModalOpen] = useState<boolean>(false);
  const [currentEditedFAQ, setCurrentEditedFAQ] = useState<ReceivedFAQ>();

  const {
    data: FAQs,
    isLoading: FAQsLoading,
    error: FAQsError,
  } = useGetFAQsQuery();

  const [
    deleteFAQ,
    { isLoading: deletingFAQ, error: deleteFAQError, isSuccess: FAQDeleted },
  ] = useDeleteFAQMutation();

  useMemo(() => {
    if (FAQsError) {
      displayError(FAQsError);
    }
  }, [FAQsError]);

  useMemo(() => {
    if (deleteFAQError) {
      displayError(deleteFAQError);
    }
  }, [deleteFAQError]);

  return (
    <section className="section-pad">
      <PagesHead
        title="CPD FAQs"
        btn={{ title: 'Add FAQ', setModalOpen: setAddModalOpen }}
      />
      <div className="FAQs mt-8 md:mt-14 lg:mt-20 mx-auto">
        <div className="FAQs-cards">
          {FAQsLoading || deletingFAQ ? (
            <InfoCardLoader />
          ) : (
            FAQs?.map(({ id, question, answer }) => (
              <div
                className={`flex items-center justify-between bg-white rounded-xl w-full py-3 px-5 md:py-5 md:px-10 3xl:py-7 3xl:px-12 my-4 md:my-6 shadow-sm drop-shadow-md`}
                key={id}
              >
                <h3 className="text-main-dark font-semibold md:text-xl 3xl:text-2xl ml-2 md:ml-4 lg:ml-6">
                  {question}
                </h3>
                <div className="links flex">
                  <button
                    className="w-fit"
                    onClick={() => {
                      setCurrentEditedFAQ({ question, answer, id });
                      setEditModalOpen(true);
                    }}
                    aria-label={`${question} Edit Link`}
                  >
                    <EditIcon className="w-[20px] md:w-8 lg:w-12" />
                  </button>
                  <button
                    className="ml-5 lg:ml-0 w-fit"
                    name="delete-btn"
                    aria-label="Delete Button"
                    onClick={() => deleteFAQ({ id })}
                  >
                    <DeleteIcon className="w-6 md:w-8 lg:w-12" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Add Modal */}
      <AddModalForm modalOpen={addModalOpen} setModalOpen={setAddModalOpen} />

      {/* Edit Modal */}
      <EditModalForm
        modalOpen={editModalOpen}
        setModalOpen={setEditModalOpen}
        FAQValues={currentEditedFAQ as ReceivedFAQ}
      />
    </section>
  );
}

const AddModalForm = ({ setModalOpen, modalOpen }: ModalProps) => {
  const [addFAQ, { isLoading: addingFAQ, error: addFAQError }] =
    useAddFAQMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FAQ>();

  const submitHandler = async (value: FAQ) => {
    addFAQ({ body: value });
    setModalOpen(false);
    reset();
  };

  useMemo(() => {
    if (addFAQError) {
      displayError(addFAQError);
    }
  }, [addFAQError]);
  return (
    <MainModal setModalOpen={setModalOpen} modalOpen={modalOpen}>
      {addingFAQ ? (
        <Loader />
      ) : (
        <form onSubmit={handleSubmit(submitHandler)}>
          <div className={`input-container`}>
            <label className="label !mb-1" htmlFor="question">
              Question
            </label>
            <input
              id="question"
              className={`add-input ${errors.question && 'input-error'}`}
              type="text"
              {...register('question', { required: 'Question is required' })}
            />
            <p className="error">{errors.question?.message}</p>
          </div>
          <div className={`input-container`}>
            <label className="label !mb-1" htmlFor="answer">
              Answer
            </label>
            <textarea
              id="answer"
              className={`add-input h-44 ${errors.answer && 'input-error'}`}
              {...register('answer', { required: 'Answer is required' })}
            ></textarea>
            <p className="error">{errors.answer?.message}</p>
          </div>
          <button className="main-btn mt-6" type="submit">
            Add new FAQ
          </button>
        </form>
      )}
    </MainModal>
  );
};

const EditModalForm = ({
  setModalOpen,
  modalOpen,
  FAQValues,
}: ModalProps & { FAQValues: ReceivedFAQ }) => {
  const [
    editFAQ,
    { isLoading: editingFAQ, error: editFAQError, isSuccess: FAQEdited },
  ] = useEditFAQMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FAQ>({ values: FAQValues });

  const submitHandler = async (value: FAQ) => {
    console.log({ value, id: FAQValues.id });
    editFAQ({ body: value, id: FAQValues.id });
    setModalOpen(false);
  };

  useMemo(() => {
    if (editFAQError) {
      displayError(editFAQError);
    }
  }, [editFAQError]);

  useMemo(() => {
    if (FAQEdited) {
      displaySuccess('FAQ Edited Successfully!');
    }
  }, [FAQEdited]);
  return (
    <MainModal setModalOpen={setModalOpen} modalOpen={modalOpen}>
      {editingFAQ ? (
        <Loader />
      ) : (
        <form onSubmit={handleSubmit(submitHandler)}>
          <div className={`input-container`}>
            <label className="label !mb-1" htmlFor="question">
              Question
            </label>
            <input
              id="question"
              className={`add-input ${errors.question && 'input-error'}`}
              type="text"
              {...register('question', { required: 'Question is required' })}
            />
            <p className="error">{errors.question?.message}</p>
          </div>
          <div className={`input-container`}>
            <label className="label !mb-1" htmlFor="answer">
              Answer
            </label>
            <textarea
              id="answer"
              className={`add-input h-44 ${errors.answer && 'input-error'}`}
              {...register('answer', { required: 'Answer is required' })}
            ></textarea>
            <p className="error">{errors.answer?.message}</p>
          </div>
          <button className="main-btn mt-6" type="submit">
            Edit FAQ
          </button>
        </form>
      )}
    </MainModal>
  );
};
