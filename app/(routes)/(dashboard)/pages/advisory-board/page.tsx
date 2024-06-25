'use client';

import { InfoCard, PagesHead, InfoCardLoader } from '@/app/_components';
import {
  useDeleteAdvisorMutation,
  useGetAllAdvisorsQuery,
} from '@/app/_redux/apiService/mainApi';
import { displayError } from '@/app/_utils/functions';
import { RecievedAllAdvisors } from 'Advisors';
import React, { useEffect, useMemo, useState } from 'react';

export default function AdvisoryBoard() {
  const [page, setPage] = useState<number>(1);
  const [allAdvisors, setAllAdvisors] = useState<RecievedAllAdvisors[]>();

  const {
    data: advisors,
    isLoading: advisorsLoading,
    error: advisorsError,
  } = useGetAllAdvisorsQuery({ page });

  const [
    deleteAdvisor,
    {
      error: deleteAdvisorError,
      isLoading: advisorDeleting,
      isSuccess: advisorDeleted,
    },
  ] = useDeleteAdvisorMutation();

  useEffect(() => {
    !advisorDeleting &&
      !advisorsLoading &&
      (allAdvisors && page > 1
        ? setAllAdvisors([
            ...(advisors?.results as RecievedAllAdvisors[]),
            ...allAdvisors,
          ])
        : setAllAdvisors(advisors?.results));
  }, [advisors]);

  useMemo(() => {
    if (advisorsError) {
      displayError(advisorsError);
    }
  }, [advisorsError]);

  useMemo(() => {
    if (deleteAdvisorError) {
      displayError(deleteAdvisorError);
    }
  }, [deleteAdvisorError]);

  useMemo(() => {
    if (advisorDeleted) {
      setAllAdvisors([]);
      setPage(1);
    }
  }, [advisorDeleted]);

  return (
    <>
      <section className="section-pad">
        <PagesHead
          title={'Advisory Board'}
          btn={{ title: 'Add Advisor', link: '/pages/advisory-board/add' }}
        />

        <div className="advisory mt-8 md:mt-14 lg:mt-20">
          <div className="advisory-cards">
            {advisorDeleting || advisorsLoading ? (
              <InfoCardLoader />
            ) : (
              allAdvisors?.map(({ id, photo, name, job_title }) => (
                <InfoCard
                  id={id}
                  image={photo}
                  title={name}
                  subtitle={job_title}
                  infoLink="/pages/advisory-board/info"
                  editLink="/pages/advisory-board/edit"
                  deleteLink={deleteAdvisor}
                  key={id}
                />
              ))
            )}
          </div>
        </div>
      </section>
    </>
  );
}
