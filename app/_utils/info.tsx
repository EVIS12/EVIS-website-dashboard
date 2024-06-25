import {
  AnalyticsIcon,
  DelegateIcon,
  ElementsIcons,
  ExhibitorsIcon,
  PagesIcons,
  ParticipatingIcon,
  SpeakerIcon,
  SquareMetersIcon,
  UserIcon,
} from './SVGIcons';

import countries from './countries.json';

export const navLinks = [
  {
    link: '/',
    name: 'Analytics',
    icon: <AnalyticsIcon className="text-main-dark w-5" />,
  },
  {
    name: 'Pages',
    icon: <PagesIcons className="text-main-dark w-5" />,
    subRoutes: [
      { name: 'Speakers', link: '/pages/speakers' },
      { name: 'Exhibitors', link: '/pages/exhibitors' },
      { name: 'Blog', link: '/pages/blog' },
      { name: 'News', link: '/pages/news' },
      { name: 'Testimonials', link: '/pages/testimonials' },
      { name: 'Advisory board', link: '/pages/advisory-board' },
      { name: 'CPD FAQs', link: '/pages/cpd-faqs' },
      { name: 'Attendees', link: '/pages/attendees' },
      { name: 'Sponsors & Partners', link: '/pages/sponsors' },
      { name: 'Register', link: '/pages/register' },
    ],
  },
  {
    name: 'Elements',
    icon: <ElementsIcons className="text-main-dark w-5" />,
    subRoutes: [
      { name: 'Timer', link: '/elements/timer' },
      { name: 'Statistics', link: '/elements/statistics' },
      { name: 'Files', link: '/elements/files' },
    ],
  },
  {
    link: '/form-users',
    name: 'Downlaod Form',
    icon: <UserIcon className="text-main-dark w-5" />,
  },
  {
    link: '/registration-form',
    name: 'Register Form',
    icon: <UserIcon className="text-main-dark w-5" />,
  },
  {
    link: '/students-project-info',
    name: 'Students Projects Info',
    icon: <UserIcon className="text-main-dark w-5" />,
  },
];

export const speakerFields = [
  {
    title: 'Name',
    key: 'name',
    type: 'text',
    width: 'half',
    properties: {
      required: 'Name is required',
    },
  },
  {
    title: 'Job Title',
    key: 'job_title',
    type: 'text',
    width: 'half',
    properties: {
      required: 'Title is required',
    },
  },
  {
    title: 'Company',
    key: 'company',
    type: 'text',
    width: 'half',
    properties: {
      required: 'Company is required',
    },
  },
  {
    title: 'Country',
    key: 'country',
    type: 'select',
    width: 'half',
    properties: {
      required: 'Country is required',
    },
    options: countries,
  },
  {
    title: 'Version',
    key: 'version',
    type: 'select',
    width: 'half',
    properties: {
      required: 'Version is required',
    },
  },

  {
    title: 'Conference Page',
    key: 'conference_page',
    type: 'checkbox',
    width: 'quarter',
  },
  {
    title: 'About',
    key: 'description',
    type: 'textarea',
    width: 'full',
  },
  {
    title: 'Facebook Link',
    key: 'facebook',
    type: 'url',
    width: 'full',
  },
  {
    title: 'Twitter Link',
    key: 'twitter',
    type: 'url',
    width: 'full',
  },
  {
    title: 'Linkedin Link',
    key: 'linkedin',
    type: 'url',
    width: 'full',
  },
];

export const exhibitorFields = [
  {
    title: 'Name',
    key: 'name',
    type: 'text',
    width: 'half',
    properties: {
      required: 'Name is required',
    },
  },
  {
    title: 'Country',
    key: 'country',
    type: 'select',
    width: 'half',
    properties: {
      required: 'Country is required',
    },
    options: countries,
  },
  {
    title: 'Address',
    key: 'address',
    type: 'text',
    width: 'half',
    properties: {
      required: 'Address is required',
    },
  },
  {
    title: 'Stand Number',
    key: 'standNumber',
    type: 'text',
    width: 'half',
    properties: {
      required: 'Stand Number is required',
    },
  },
  {
    title: 'Website',
    key: 'website',
    type: 'url',
    width: 'half',
    properties: {
      required: 'Website is required',
    },
  },
  {
    title: 'Online Exhibitor Manual URL',
    key: 'exhibitor_url',
    type: 'url',
    width: 'half',
    properties: {
      required: 'Online Exhibitor Manual URL is required',
    },
  },
  {
    title: 'Description',
    key: 'description',
    type: 'textarea',
    width: 'full',
    properties: {
      required: 'Description is required',
    },
  },
  {
    title: 'Facebook Link',
    key: 'facebook',
    type: 'url',
    width: 'full',
  },
  {
    title: 'Twitter Link',
    key: 'twitter',
    type: 'url',
    width: 'full',
  },
  {
    title: 'Linkedin Link',
    key: 'linkedin',
    type: 'url',
    width: 'full',
  },
];

export const advisorFields = [
  {
    title: 'Name',
    key: 'name',
    type: 'text',
    width: 'half',
    properties: {
      required: 'Name is required',
    },
  },
  {
    title: 'Company',
    key: 'company',
    type: 'text',
    width: 'half',
    properties: {
      required: 'Company is required',
    },
  },
  {
    title: 'Job',
    key: 'job_title',
    type: 'text',
    width: 'half',
    properties: {
      required: 'Job title is required',
    },
  },
  {
    title: 'Home Page',
    key: 'home_page',
    type: 'checkbox',
    width: 'half',
  },
  {
    title: 'Description',
    key: 'description',
    type: 'textarea',
    width: 'full',
    properties: {
      required: 'Description is required',
    },
  },
  {
    title: 'Facebook Link',
    key: 'facebook',
    type: 'url',
    width: 'full',
  },
  {
    title: 'Twitter Link',
    key: 'twitter',
    type: 'url',
    width: 'full',
  },
  {
    title: 'Linkedin Link',
    key: 'linkedin',
    type: 'url',
    width: 'full',
  },
];

export const testimonialsFields = [
  {
    title: 'Name',
    key: 'name',
    type: 'text',
    width: 'full',
    properties: {
      required: 'Name is required',
    },
  },
  {
    title: 'Job Title',
    key: 'subtitle',
    type: 'text',
    width: 'half',
    properties: {
      required: 'Job Title is required',
    },
  },
  {
    title: 'Company',
    key: 'company',
    type: 'text',
    width: 'half',
    properties: {
      required: 'Company is required',
    },
  },
  {
    title: 'Testimonial',
    key: 'body',
    type: 'textarea',
    width: 'full',
    properties: {
      required: 'Testimonial is required',
    },
  },
  {
    title: 'Youtube Link',
    key: 'youtube_link',
    type: 'url',
    width: 'full',
  },
  {
    title: 'Press Center',
    key: 'press_center',
    type: 'checkbox',
    width: 'quarter',
  },
];

export const newsFields = [
  {
    title: 'Title',
    key: 'title',
    type: 'text',
    width: 'full',
    properties: {
      required: 'Title is required',
    },
  },

  {
    title: 'Content',
    key: 'body',
    type: 'textarea',
    width: 'full',
    properties: {
      required: 'Content is required',
    },
  },
  {
    title: 'Link',
    key: 'link',
    type: 'url',
    width: 'full',
  },
  {
    title: 'Press Center',
    key: 'press_center',
    type: 'checkbox',
    width: 'quarter',
  },
];

export const sponsorsFields = [
  {
    title: 'Subtitle',
    key: 'subtitle',
    type: 'text',
    width: 'full',
  },
  {
    title: 'Link',
    key: 'link',
    type: 'url',
    width: 'full',
  },
];

export const statistics = [
  {
    icon: <DelegateIcon className="w-4 md:w-8 3xl:w-14" />,
    title: 'Delegates',
    key: 'delegates',
  },
  {
    icon: <SpeakerIcon className="w-4 md:w-8 3xl:w-14" />,
    title: 'Speakers',
    key: 'speakers',
  },
  {
    icon: <SquareMetersIcon className="w-4 md:w-8 3xl:w-14" />,
    title: 'Square Meters',
    key: 'square_meters',
  },

  {
    icon: <ParticipatingIcon className="w-4 md:w-8 3xl:w-14" />,
    title: 'Participating Countries',
    key: 'country',
  },
  {
    icon: <ExhibitorsIcon className="w-4 md:w-8 3xl:w-14" />,
    title: 'Exhibiting brands',
    key: 'exhibitors',
  },
];
