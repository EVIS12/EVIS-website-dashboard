declare module 'Files' {
  interface SendFile {
    file: FileList;
    type: string;
  }

  interface RecievedFile extends SendFile {
    id: string;
    file: string;
    file_name: string;
  }

  interface FormUser {
    id: string;
    name: string;
    company: string;
    email: string;
    country: string;
    phone: string;
    industry: string;
    interested_in: string;
    contract_file: string[];
  }
}
