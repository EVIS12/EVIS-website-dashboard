declare module 'Speakers' {
  interface SendSpeakersVersion {
    name: string;
    year: string;
  }

  interface RecievedSpeakersVersion extends SendSpeakersVersion {
    id: string;
  }

  interface SendSpeaker {
    photo: FileList;
    name: string;
    job_title: string;
    description: string;
    address: string;
    facebook: string;
    twitter: string;
    linkedin: string;
    home_page: boolean;
    conference_page: boolean;
    company: string;
    country: string;
    version: string[];
  }

  interface RecievedSpeaker extends SendSpeaker {
    id: string;
    photo: string;
    created_at: string;
    year: string[];
  }

  interface RecievedAllSpeakers {
    id: string;
    name: string;
    job_title: string;
    photo: string;
    conference_page: boolean;
    home_page: boolean;
  }
}
