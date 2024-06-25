declare module 'Advisors' {
  interface RecievedAllAdvisors {
    id: string;
    photo: string;
    name: string;
    job_title: string;
    about_page: boolean;
  }

  interface SendAdvisor {
    photo: FileList;
    name: string;
    job_title: string;
    description: string;
    company: string;
    about_page: boolean;
    facebook: string;
    twitter: string;
    linkedin: string;
  }

  interface RecievedAdvisor extends SendAdvisor {
    id: string;
    photo: string;
  }
}
