declare module 'Exhibitors' {
  interface SendExhibitor {
    name: string;
    logo: string;
    description: string;
    standNumber: string;
    website: string;
    address: string;
    country: string;
    is_parter: boolean;
    is_sponser: boolean;
    facebook: string;
    twitter: string;
    instagram: string;
    linkedin: string;
    version: string[];
  }

  interface RecievedExhibitor extends SendExhibitor {
    id: string;
  }
}
