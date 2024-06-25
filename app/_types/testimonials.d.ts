declare module 'Testimonials' {
  interface SendTestimonial {
    name: string;
    subtitle: string;
    photo: FileList;
    body: string;
    company: string;
    youtube_link: string;
    press_center: boolean;
  }

  interface RecievedTestimonialsInfo {
    id: string;
    name: string;
    photo: string;
    youtube_link: string;
    video_id: string;
    company: string;
  }

  interface RecievedTestimonial extends SendTestimonial {
    video_id: string;
  }
}
