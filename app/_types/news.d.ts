declare module 'News' {
  interface SendNews {
    title: string;
    body: string;
    photo: FileList;
    link: string;
    press_center: boolean;
  }

  interface RecievedNews extends SendNews {
    id: string;
    photo: string;
    created_at: string;
    updated_at: string;
  }
}
