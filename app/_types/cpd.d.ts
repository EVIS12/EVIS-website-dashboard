declare module 'CPD' {
  type FAQ = {
    question: string;
    answer: string;
  };

  type ReceivedFAQ = FAQ & {
    id: string;
  };
}
