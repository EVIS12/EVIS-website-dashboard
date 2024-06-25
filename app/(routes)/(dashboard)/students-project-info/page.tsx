'use client';

import React, { useMemo } from 'react';
import { Loader, PagesHead } from '@/app/_components';
import { useGetProjectsInfoQuery } from '@/app/_redux/apiService/mainApi';
import { displayError } from '@/app/_utils/functions';
import { useSession } from 'next-auth/react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import FileDownload from 'js-file-download';

export default function StudentsProjectsInfo() {
  const session = useSession();

  const {
    data: projects,
    isLoading: projectsLoading,
    error: projectsError,
  } = useGetProjectsInfoQuery();
  const downloadSheet = async () => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/dashboard/student-project-info/export_to_excel/`,
      {
        method: 'GET',

        headers: {
          Authorization: `Bearer ${session?.data?.token.access as string}`,
        },
      }
    );

    FileDownload(await res.blob(), `Students Projects.xlsx`);
  };

  useMemo(() => {
    if (projectsError) {
      displayError(projectsError);
    }
  }, [projectsError]);

  if (projectsLoading) return <Loader />;

  return (
    <section className="section-pad">
      <PagesHead title="Register Form" />
      <div className="formUsers mt-8 md:mt-14 lg:mt-20 lg:w-2/3 mx-auto">
        <div className="head">
          <button
            className="main-btn !px-2 md:!px-4 my-2 md:my-0"
            onClick={downloadSheet}
          >
            Export users in Excel sheet
          </button>
        </div>
        <div className="formUsers-cards">
          {projects?.map(({ university, id, project_name, team_number }) => (
            <div
              className={`flex items-center justify-between bg-white rounded-xl w-full py-3 px-5 md:py-6 md:px-10 3xl:py-7 3xl:px-12 my-4 md:my-6 shadow-sm drop-shadow-md`}
              key={id}
            >
              <h3 className="text-main-dark font-semibold md:text-xl 3xl:text-2xl ml-2 md:ml-4 lg:ml-6">
                {project_name}
              </h3>

              <p className="block text-dark-gray text-xs md:text-base 3xl:text-lg">
                {university}
              </p>

              <p className="block text-dark-gray text-xs md:text-base 3xl:text-lg">
                {team_number}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
