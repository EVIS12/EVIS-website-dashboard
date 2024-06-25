declare module 'Blog' {
  interface SendArticle {
    title: string;
    subtitle: string;
    body: EditorState;
    photo: FileList;
    schedule: string;
    status: boolean;
    date_time: string;
    press_center: boolean;
    home_page: boolean;
  }

  interface RecievedArticleInfo extends SendArticle {
    id: string;
    body: string;
    photo: string;
    view_count: number;
    created_at: string;
    updated_at: string;
  }
}
