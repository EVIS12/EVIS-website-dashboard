'use client';

import {
  InfoCardLoader,
  Loader,
  MainModal,
  PagesHead,
} from '@/app/_components';
import {
  useAddAttendeeMutation,
  useAddFAQMutation,
  useDeleteAttendeeMutation,
  useDeleteFAQMutation,
  useEditAttendeeMutation,
  useEditFAQMutation,
  useGetAttendeesQuery,
  useGetFAQsQuery,
} from '@/app/_redux/apiService/mainApi';
import { DeleteIcon, EditIcon } from '@/app/_utils/SVGIcons';

import { displayError, displaySuccess } from '@/app/_utils/functions';
import { Attendee, ReceivedAttendee } from 'Attendees';
import { FAQ, ReceivedFAQ } from 'CPD';
import React, { Dispatch, useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import InfiniteScroll from 'react-infinite-scroll-component';

type ModalProps = {
  setModalOpen: Dispatch<React.SetStateAction<boolean>>;
  modalOpen: boolean;
};

export default function Attendees() {
  const [page, setPage] = useState<number>(1);
  const [allAttendees, setAllAttendees] = useState<ReceivedAttendee[]>([]);
  const [addModalOpen, setAddModalOpen] = useState<boolean>(false);
  const [editModalOpen, setEditModalOpen] = useState<boolean>(false);
  const [currentEditedAttendee, setCurrentEditedAttendee] =
    useState<ReceivedAttendee>();

  const {
    data: attendees,
    isLoading: attendeesLoading,
    error: attendeesError,
  } = useGetAttendeesQuery({ page });

  const [
    deleteAttendee,
    {
      isLoading: deletingAttendee,
      error: deleteAttendeeError,
      isSuccess: attendeeDeleted,
    },
  ] = useDeleteAttendeeMutation();

  useMemo(() => {
    if (attendeesError) {
      displayError(attendeesError);
    }
  }, [attendeesError]);

  useMemo(() => {
    if (deleteAttendeeError) {
      displayError(deleteAttendeeError);
    }
  }, [deleteAttendeeError]);

  useEffect(() => {
    !deletingAttendee &&
      !attendeesLoading &&
      (allAttendees && page > 1
        ? setAllAttendees([
            ...allAttendees,
            ...(attendees?.results as ReceivedAttendee[]),
          ])
        : setAllAttendees(attendees?.results ?? []));
  }, [attendees]);

  useMemo(() => {
    if (attendeeDeleted) {
      setAllAttendees([]);
      setPage(1);
    }
  }, [attendeeDeleted]);

  return (
    <section className="section-pad">
      <PagesHead
        title="Attendees"
        btn={{ title: 'Add Attendee', setModalOpen: setAddModalOpen }}
      />
      <div className="Attendees mt-8 md:mt-14 lg:mt-20 mx-auto">
        <div className="Atendees-cards">
          {attendeesLoading || deletingAttendee ? (
            <InfoCardLoader />
          ) : (
            <InfiniteScroll
              dataLength={allAttendees?.length as number}
              next={() => setPage((page) => page + 1)}
              style={{ display: 'flex', flexDirection: 'column' }} //To put endMessage and loader to the top.
              hasMore={Math.ceil((attendees?.count as number) / 20) >= page}
              loader={<Loader />}
            >
              {allAttendees?.map(({ id, name }) => (
                <div
                  className={`flex items-center justify-between bg-white rounded-xl w-full py-3 px-5 md:py-5 md:px-10 3xl:py-7 3xl:px-12 my-2 md:my-4 shadow-sm drop-shadow-md`}
                  key={id}
                >
                  <h3 className="text-main-dark font-semibold md:text-xl 3xl:text-2xl ml-2 md:ml-4 lg:ml-6">
                    {name}
                  </h3>
                  <div className="links flex">
                    <button
                      className="w-fit"
                      onClick={() => {
                        setCurrentEditedAttendee({ name, id });
                        setEditModalOpen(true);
                      }}
                      aria-label={`${name} Edit Link`}
                    >
                      <EditIcon className="w-[20px] md:w-8 lg:w-12" />
                    </button>
                    <button
                      className="ml-5 lg:ml-0 w-fit"
                      name="delete-btn"
                      aria-label="Delete Button"
                      onClick={() => deleteAttendee({ id })}
                    >
                      <DeleteIcon className="w-6 md:w-8 lg:w-12" />
                    </button>
                  </div>
                </div>
              ))}
            </InfiniteScroll>
          )}
        </div>
      </div>

      {/* Add Modal */}
      <AddModalForm modalOpen={addModalOpen} setModalOpen={setAddModalOpen} />

      {/* Edit Modal */}
      <EditModalForm
        modalOpen={editModalOpen}
        setModalOpen={setEditModalOpen}
        AttendeeValues={currentEditedAttendee as ReceivedAttendee}
      />
    </section>
  );
}

const AddModalForm = ({ setModalOpen, modalOpen }: ModalProps) => {
  const [addAttendee, { isLoading: addingAttendee, error: addAttendeeError }] =
    useAddAttendeeMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Attendee>();

  const submitHandler = async (value: Attendee) => {
    addAttendee({ body: value });
    setModalOpen(false);
    reset();
  };

  useMemo(() => {
    if (addAttendeeError) {
      displayError(addAttendeeError);
    }
  }, [addAttendeeError]);
  return (
    <MainModal setModalOpen={setModalOpen} modalOpen={modalOpen}>
      {addingAttendee ? (
        <Loader />
      ) : (
        <form onSubmit={handleSubmit(submitHandler)}>
          <div className={`input-container`}>
            <label className="label !mb-1" htmlFor="name">
              Company Name
            </label>
            <input
              id="question"
              className={`add-input ${errors.name && 'input-error'}`}
              type="text"
              {...register('name', { required: 'Company Name is required' })}
            />
            <p className="error">{errors.name?.message}</p>
          </div>

          <button className="main-btn mt-6" type="submit">
            Add new Attendee
          </button>
        </form>
      )}
    </MainModal>
  );
};

const EditModalForm = ({
  setModalOpen,
  modalOpen,
  AttendeeValues,
}: ModalProps & { AttendeeValues: ReceivedAttendee }) => {
  const [
    editAttendee,
    {
      isLoading: editingAttendee,
      error: editAttendeeError,
      isSuccess: AttendeeEdited,
    },
  ] = useEditAttendeeMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Attendee>({ values: AttendeeValues });

  const submitHandler = async (value: Attendee) => {
    editAttendee({ body: value, id: AttendeeValues.id });
    setModalOpen(false);
  };

  useMemo(() => {
    if (editAttendeeError) {
      displayError(editAttendeeError);
    }
  }, [editAttendeeError]);

  useMemo(() => {
    if (AttendeeEdited) {
      displaySuccess('Attendee Edited Successfully!');
    }
  }, [AttendeeEdited]);
  return (
    <MainModal setModalOpen={setModalOpen} modalOpen={modalOpen}>
      {editingAttendee ? (
        <Loader />
      ) : (
        <form onSubmit={handleSubmit(submitHandler)}>
          <div className={`input-container`}>
            <label className="label !mb-1" htmlFor="name">
              Company Name
            </label>
            <input
              id="question"
              className={`add-input ${errors.name && 'input-error'}`}
              type="text"
              {...register('name', { required: 'Company Name is required' })}
            />
            <p className="error">{errors.name?.message}</p>
          </div>

          <button className="main-btn mt-6" type="submit">
            Edit Attendee
          </button>
        </form>
      )}
    </MainModal>
  );
};
