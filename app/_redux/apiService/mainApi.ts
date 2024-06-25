import { RegisterLink } from '@/app/_types/registerLinks';
import { RecievedStatistics, SendStatistics } from '@/app/_types/statistics';
import {
  BaseQueryApi,
  FetchArgs,
  createApi,
  fetchBaseQuery,
} from '@reduxjs/toolkit/query/react';
import { RecievedExhibitor } from 'Exhibitors';
import {
  RecievedAllSpeakers,
  RecievedSpeaker,
  RecievedSpeakersVersion,
  SendSpeakersVersion,
} from 'Speakers';
import { RecievedArticleInfo } from 'Blog';
import { RecievedNews } from 'News';
import { RecievedTestimonial, RecievedTestimonialsInfo } from 'Testimonials';
import { RecievedAdvisor, RecievedAllAdvisors } from 'Advisors';
import { FormUser, RecievedFile } from 'Files';
import { getSession, signOut } from 'next-auth/react';
import { RegistrationFormUser } from '@/app/_types/register-forms';
import { FAQ, ReceivedFAQ } from 'CPD';
import { Attendee, ReceivedAttendee } from 'Attendees';
import {
  ReceivedSponsorsCategory,
  RecievedSponsor,
  SponsorsCategory,
} from 'Sponsors';
import { ProjectInfo } from 'Awards';

interface Filters {
  country: string;
  company?: string;
  sort: string;
  version__year?: string;
}

interface Pagination {
  page: number;
}

interface PaginationWithFilter extends Filters, Pagination {}

const addTokenToRequest = async (headers: Headers) => {
  const session: any = await getSession();
  if (session) {
    headers.set('Authorization', `Bearer ${session.token.access}`);
  }
  return headers;
};

const baseQuery = async (
  args: string | FetchArgs,
  api: BaseQueryApi,
  extraOptions: any
) => {
  const result = await fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_URL,
    prepareHeaders: (headers) => {
      return addTokenToRequest(headers);
    },
  })(args, api, extraOptions);

  if (result?.error?.status === 401) {
    signOut();
  }

  return result;
};

export const mainApi = createApi({
  reducerPath: 'mainApi',
  baseQuery,
  tagTypes: [
    'SpeakersVersion',
    'Speakers',
    'ExhibitorsVersion',
    'Exhibitors',
    'FloorPlan',
    'Location',
    'RegisterLinks',
    'Timer',
    'Statistics',
    'Blog',
    'News',
    'Testimonials',
    'Advisors',
    'Files',
    'Contacts',
    'CPD-FAQ',
    'Attendees',
    'Sponsors-Categories',
    'Sponsors',
  ],
  endpoints: (builder) => ({
    // Speakers Endpoints
    getSpeakersVersions: builder.query<RecievedSpeakersVersion[], void>({
      query: () => '/dashboard/speaker-version',
      providesTags: ['SpeakersVersion'],
    }),

    addSpeakersVersion: builder.mutation<void, SendSpeakersVersion>({
      query: (body) => ({
        url: '/dashboard/speaker-version/',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['SpeakersVersion'],
    }),

    getAllSpeakers: builder.query<
      { results: RecievedAllSpeakers[]; count: number },
      PaginationWithFilter
    >({
      query: ({ company, country, sort, page, version__year }) =>
        `/dashboard/speakers?page=${page}&country__icontains=${country}&company=${company}&order_by=${
          sort.toLowerCase() !== 'none' ? sort.toLowerCase() : ''
        }&version__year=${version__year}`,
      providesTags: ['Speakers'],
    }),

    getSpeakerInfo: builder.query<RecievedSpeaker, { id: string }>({
      query: ({ id }) => `/dashboard/speakers/${id}`,
      providesTags: ['Speakers'],
    }),

    addSpeaker: builder.mutation<void, FormData>({
      query: (body) => ({ url: '/dashboard/speakers/', method: 'POST', body }),
      invalidatesTags: ['Speakers'],
    }),

    editSpeaker: builder.mutation<void, { body: FormData; id: string }>({
      query: ({ body, id }) => ({
        url: `/dashboard/speakers/${id}/`,
        method: 'PATCH',
        body,
      }),
      invalidatesTags: ['Speakers'],
    }),

    deleteSpeaker: builder.mutation<void, { id: string }>({
      query: ({ id }) => ({
        url: `/dashboard/speakers/${id}/`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Speakers'],
    }),

    //exhibitors
    getAllExhibitors: builder.query<RecievedExhibitor[], Filters>({
      query: ({ country, sort }) =>
        `/dashboard/exhibitors/?country=${country}&order_by=${
          sort !== 'None'
            ? `${sort === 'Name' ? '-' + sort.toLowerCase() : ''}`
            : ''
        }`,
      providesTags: ['Exhibitors'],
    }),

    getExhibitorInfo: builder.query<RecievedExhibitor, { id: string }>({
      query: ({ id }) => `/dashboard/exhibitors/${id}`,
      providesTags: ['Exhibitors'],
    }),

    addExhibitor: builder.mutation<void, FormData>({
      query: (body) => ({
        url: '/dashboard/exhibitors/',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Exhibitors'],
    }),

    editExhibitor: builder.mutation<void, { id: string; body: FormData }>({
      query: ({ id, body }) => ({
        url: `/dashboard/exhibitors/${id}/`,
        method: 'PATCH',
        body,
      }),
    }),

    deleteExhibitor: builder.mutation<void, { id: string }>({
      query: ({ id }) => ({
        url: `/dashboard/exhibitors/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Exhibitors'],
    }),

    // blog endpoints
    getAllArticles: builder.query<
      {
        count: number;
        results: RecievedArticleInfo[];
      },
      { page: number }
    >({
      query: ({ page }) => `/dashboard/blog/?page=${page}`,
      providesTags: ['Blog'],
    }),

    getArticleInfo: builder.query<RecievedArticleInfo, { id: string }>({
      query: ({ id }) => `/dashboard/blog/${id}`,
      providesTags: ['Blog'],
    }),

    addArticle: builder.mutation<void, FormData>({
      query: (body) => ({
        url: '/dashboard/blog/',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Blog'],
    }),

    editArticle: builder.mutation<void, { id: string; body: FormData }>({
      query: ({ id, body }) => ({
        url: `/dashboard/blog/${id}/`,
        method: 'PATCH',
        body,
      }),
      invalidatesTags: ['Blog'],
    }),

    deleteArticle: builder.mutation<void, { id: string }>({
      query: ({ id }) => ({
        url: `/dashboard/blog/${id}/`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Blog'],
    }),

    //news endpoints
    getAllNews: builder.query<
      { count: number; results: RecievedNews[] },
      Pagination
    >({
      query: ({ page }) => `/dashboard/news/?page=${page}`,
      providesTags: ['News'],
    }),

    getNewsInfo: builder.query<RecievedNews, { id: string }>({
      query: ({ id }) => `/dashboard/news/${id}`,
      providesTags: ['News'],
    }),

    addNews: builder.mutation<void, FormData>({
      query: (body) => ({
        url: '/dashboard/news/',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['News'],
    }),

    deleteNews: builder.mutation<void, { id: string }>({
      query: ({ id }) => ({
        url: `/dashboard/news/${id}/`,
        method: 'DELETE',
      }),
      invalidatesTags: ['News'],
    }),

    editNews: builder.mutation<void, { id: string; body: FormData }>({
      query: ({ id, body }) => ({
        url: `/dashboard/news/${id}/`,
        method: 'PATCH',
        body,
      }),
      invalidatesTags: ['News'],
    }),

    //testimonials endpoints
    getAllTestimonials: builder.query<
      {
        count: Number;
        results: RecievedTestimonialsInfo[];
      },
      Pagination
    >({
      query: ({ page }) => `/dashboard/testimonials/?page=${page}`,
      providesTags: ['Testimonials'],
    }),

    getTestimonial: builder.query<RecievedTestimonial, { id: string }>({
      query: ({ id }) => `/dashboard/testimonials/${id}`,
      providesTags: ['Testimonials'],
    }),

    addTestimonial: builder.mutation<void, FormData>({
      query: (body) => ({
        url: `/dashboard/testimonials/`,
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Testimonials'],
    }),

    editTestimonial: builder.mutation<void, { id: string; body: FormData }>({
      query: ({ id, body }) => ({
        url: `/dashboard/testimonials/${id}`,
        method: 'PATCH',
        body,
      }),
      invalidatesTags: ['Testimonials'],
    }),

    deleteTestimonial: builder.mutation<void, { id: string }>({
      query: ({ id }) => ({
        url: `/dashboard/testimonials/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Testimonials'],
    }),

    // advisors endpoints
    getAllAdvisors: builder.query<
      { count: number; results: RecievedAllAdvisors[] },
      Pagination
    >({
      query: ({ page }) => `/dashboard/advisors/?page=${page}`,
      providesTags: ['Advisors'],
    }),

    getAdvisor: builder.query<RecievedAdvisor, { id: string }>({
      query: ({ id }) => `/dashboard/advisors/${id}`,
      providesTags: ['Advisors'],
    }),

    addAdvisor: builder.mutation<void, FormData>({
      query: (body) => ({ url: '/dashboard/advisors/', method: 'POST', body }),
      invalidatesTags: ['Advisors'],
    }),

    editAdvisor: builder.mutation<void, { id: string; body: FormData }>({
      query: ({ id, body }) => ({
        url: `/dashboard/advisors/${id}`,
        method: 'PATCH',
        body,
      }),
      invalidatesTags: ['Advisors'],
    }),

    deleteAdvisor: builder.mutation<void, { id: string }>({
      query: ({ id }) => ({
        url: `/dashboard/advisors/${id}/`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Advisors'],
    }),

    //floor plan get and post
    getFloorPlan: builder.query<{ id: 1; link: string }, void>({
      query: () => '/dashboard/floor-plan',
      providesTags: ['FloorPlan'],
    }),

    editFloorPlan: builder.mutation<void, { link: string }>({
      query: (body) => ({
        url: '/dashboard/floor-plan/1/',
        method: 'PATCH',
        body,
      }),
      invalidatesTags: ['FloorPlan'],
    }),

    //location plan get and post
    getLocation: builder.query<{ id: 1; location: string }, void>({
      query: () => '/dashboard/locations',
      providesTags: ['Location'],
    }),

    editLocation: builder.mutation<void, { location: string }>({
      query: (body) => ({
        url: '/dashboard/locations/1/',
        method: 'PUT',
        body,
      }),
      invalidatesTags: ['Location'],
    }),

    // register links
    getRegisterLinks: builder.query<RegisterLink[], void>({
      query: () => '/dashboard/register-link/',
      providesTags: ['RegisterLinks'],
    }),

    editRegisterLink: builder.mutation<void, { id: number; link: string }>({
      query: ({ id, link }) => ({
        url: `/dashboard/register-link/${id}/`,
        method: 'PATCH',
        body: { link },
      }),
      invalidatesTags: ['RegisterLinks'],
    }),

    //timer get and patch
    getTimer: builder.query<{ id: number; time: string }, void>({
      query: () => '/dashboard/timer/',
      providesTags: ['Timer'],
    }),

    editTimer: builder.mutation<void, { id: number; time: string }>({
      query: ({ id, time }) => ({
        url: `/dashboard/timer/${id}/`,
        method: 'PATCH',
        body: { time },
      }),
      invalidatesTags: ['Timer'],
    }),

    // statistics get and patch
    getStatistics: builder.query<RecievedStatistics, void>({
      query: () => '/dashboard/statistics/',
      providesTags: ['Statistics'],
    }),

    editStatistics: builder.mutation<
      void,
      { id: number; body: SendStatistics }
    >({
      query: ({ id, body }) => ({
        url: `/dashboard/statistics/${id}/`,
        method: 'PATCH',
        body,
      }),
      invalidatesTags: ['Statistics'],
    }),

    //download files form
    getDownloadFormUsers: builder.query<
      { count: number; results: FormUser[] },
      { type: string }
    >({
      query: ({ type }) =>
        `/dashboard/contract-form/?contract_file__type=${type}`,
    }),

    getFormUser: builder.query<FormUser, { id: string }>({
      query: ({ id }) => `/dashboard/contract-form/${id}`,
    }),

    //files endpoint
    getFiles: builder.query<RecievedFile[], void>({
      query: () => '/dashboard/contract-file/',
      providesTags: ['Files'],
    }),

    getFilesTypes: builder.query<string[], void>({
      query: () => '/dashboard/contract-file-types/',
      providesTags: ['Files'],
    }),

    addFile: builder.mutation<void, FormData>({
      query: (body) => ({
        url: '/dashboard/contract-file/',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Files'],
    }),

    editFile: builder.mutation<void, { id: string; body: FormData }>({
      query: ({ id, body }) => ({
        url: `/dashboard/contract-file/${id}/`,
        method: 'PATCH',
        body,
      }),
      invalidatesTags: ['Files'],
    }),

    //user endpoints
    getMyInfo: builder.query<{ name: string; picture: string }, void>({
      query: () => '/accounts/api/v1/users/me/',
    }),

    resetMyPassword: builder.mutation<void, { email: string }>({
      query: ({ email }) => ({
        url: '/accounts/api/v1/users/reset_password/',
        method: 'POST',
        body: { email },
      }),
    }),

    //registration-form
    registrationFormUsers: builder.query<
      {
        count: number;
        results: RegistrationFormUser[];
      },
      { interested_in: string; page: number }
    >({
      query: ({ interested_in, page }) =>
        `/dashboard/register-interest/?interested_in=${
          interested_in ?? ''
        }&page=${page ?? 1}`,
    }),

    //analytics endpoints
    getHomeViews: builder.query<{ id: string; count: number }, void>({
      query: () => '/analysis/home-views/',
    }),
    getExhibitionViews: builder.query<{ id: string; count: number }, void>({
      query: () => '/analysis/exhibition-views/',
    }),
    getRegistrationViews: builder.query<{ id: string; count: number }, void>({
      query: () => '/analysis/registration-views/',
    }),
    getTopArticles: builder.query<
      {
        id: string;
        title: string;
        photo: string;
        view_count: number;
      }[],
      void
    >({
      query: () => '/analysis/top-blog/',
    }),
    getRegions: builder.query<
      {
        id: number;
        name: string;
        registered_count: number;
      }[],
      void
    >({
      query: () => '/analysis/region/',
    }),

    // CPD FAQ's
    getFAQs: builder.query<ReceivedFAQ[], void>({
      query: () => '/dashboard/cpd/',
      providesTags: ['CPD-FAQ'],
    }),

    addFAQ: builder.mutation<void, { body: FAQ }>({
      query: ({ body }) => ({ url: '/dashboard/cpd/', method: 'POST', body }),
      invalidatesTags: ['CPD-FAQ'],
    }),

    editFAQ: builder.mutation<void, { body: FAQ; id: string }>({
      query: ({ body, id }) => ({
        url: `/dashboard/cpd/${id}/`,
        method: 'PATCH',
        body,
      }),
      invalidatesTags: ['CPD-FAQ'],
    }),

    deleteFAQ: builder.mutation<void, { id: string }>({
      query: ({ id }) => ({ url: `/dashboard/cpd/${id}`, method: 'DELETE' }),
      invalidatesTags: ['CPD-FAQ'],
    }),

    // Attendees
    getAttendees: builder.query<
      { count: number; results: ReceivedAttendee[] },
      { page: number }
    >({
      query: ({ page }) => `/dashboard/attendees/?page=${page}`,
      providesTags: ['Attendees'],
    }),

    addAttendee: builder.mutation<void, { body: Attendee }>({
      query: ({ body }) => ({
        url: '/dashboard/attendees/',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Attendees'],
    }),

    editAttendee: builder.mutation<void, { body: Attendee; id: string }>({
      query: ({ body, id }) => ({
        url: `/dashboard/attendees/${id}/`,
        method: 'PATCH',
        body,
      }),
      invalidatesTags: ['Attendees'],
    }),

    deleteAttendee: builder.mutation<void, { id: string }>({
      query: ({ id }) => ({
        url: `/dashboard/attendees/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Attendees'],
    }),

    // Sponsors and partners
    getSponsorsCategories: builder.query<ReceivedSponsorsCategory[], void>({
      query: () => '/dashboard/category-partner-sponser/',
      providesTags: ['Sponsors-Categories'],
    }),

    addSponsorsCategory: builder.mutation<void, { body: SponsorsCategory }>({
      query: ({ body }) => ({
        url: '/dashboard/category-partner-sponser/',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Sponsors-Categories'],
    }),

    editSponsorCategory: builder.mutation<void, ReceivedSponsorsCategory>({
      query: ({ id, name, order_num }) => ({
        url: `/dashboard/category-partner-sponser/${id}/`,
        method: 'PATCH',
        body: { name, order_num },
      }),
      invalidatesTags: ['Sponsors-Categories'],
    }),

    getSponsors: builder.query<RecievedSponsor[], { category: string }>({
      query: ({ category }) =>
        `/dashboard/partners_sponsrs/?category=${category}`,
      providesTags: ['Sponsors'],
    }),

    getSponsor: builder.query<RecievedSponsor, { id: string }>({
      query: ({ id }) => `/dashboard/partners_sponsrs/${id}/`,
      providesTags: ['Sponsors'],
    }),

    addSponsor: builder.mutation<void, { body: FormData }>({
      query: ({ body }) => ({
        url: '/dashboard/partners_sponsrs/',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Sponsors'],
    }),

    editSponsor: builder.mutation<void, { body: FormData; id: string }>({
      query: ({ body, id }) => ({
        url: `/dashboard/partners_sponsrs/${id}/`,
        method: 'PATCH',
        body,
      }),
      invalidatesTags: ['Sponsors'],
    }),

    deleteSponsor: builder.mutation<void, { id: string }>({
      query: ({ id }) => ({
        url: `/dashboard/partners_sponsrs/${id}/`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Sponsors'],
    }),

    // Students project info
    getProjectsInfo: builder.query<ProjectInfo[], void>({
      query: () => '/dashboard/student-project-info/',
    }),
  }),
});

export const {
  useGetSpeakersVersionsQuery,
  useAddSpeakersVersionMutation,
  useGetAllSpeakersQuery,
  useGetSpeakerInfoQuery,
  useAddSpeakerMutation,
  useEditSpeakerMutation,
  useDeleteSpeakerMutation,
  useGetAllExhibitorsQuery,
  useGetExhibitorInfoQuery,
  useAddExhibitorMutation,
  useEditExhibitorMutation,
  useDeleteExhibitorMutation,
  useGetAllArticlesQuery,
  useDeleteArticleMutation,
  useAddArticleMutation,
  useGetArticleInfoQuery,
  useEditArticleMutation,
  useGetAllNewsQuery,
  useGetNewsInfoQuery,
  useAddNewsMutation,
  useDeleteNewsMutation,
  useEditNewsMutation,
  useGetAllTestimonialsQuery,
  useGetTestimonialQuery,
  useDeleteTestimonialMutation,
  useAddTestimonialMutation,
  useEditTestimonialMutation,
  useGetAllAdvisorsQuery,
  useGetAdvisorQuery,
  useAddAdvisorMutation,
  useDeleteAdvisorMutation,
  useEditAdvisorMutation,
  useGetFloorPlanQuery,
  useEditFloorPlanMutation,
  useGetLocationQuery,
  useEditLocationMutation,
  useGetRegisterLinksQuery,
  useEditRegisterLinkMutation,
  useGetTimerQuery,
  useEditTimerMutation,
  useGetStatisticsQuery,
  useEditStatisticsMutation,
  useGetFilesQuery,
  useAddFileMutation,
  useEditFileMutation,
  useGetFilesTypesQuery,
  useGetDownloadFormUsersQuery,
  useGetFormUserQuery,
  useGetMyInfoQuery,
  useResetMyPasswordMutation,
  useRegistrationFormUsersQuery,
  useGetHomeViewsQuery,
  useGetExhibitionViewsQuery,
  useGetRegistrationViewsQuery,
  useGetTopArticlesQuery,
  useGetRegionsQuery,
  useGetFAQsQuery,
  useAddFAQMutation,
  useEditFAQMutation,
  useDeleteFAQMutation,
  useGetAttendeesQuery,
  useAddAttendeeMutation,
  useDeleteAttendeeMutation,
  useEditAttendeeMutation,
  useGetSponsorsCategoriesQuery,
  useEditSponsorCategoryMutation,
  useGetSponsorsQuery,
  useGetSponsorQuery,
  useAddSponsorMutation,
  useAddSponsorsCategoryMutation,
  useDeleteSponsorMutation,
  useEditSponsorMutation,
  useGetProjectsInfoQuery,
} = mainApi;
