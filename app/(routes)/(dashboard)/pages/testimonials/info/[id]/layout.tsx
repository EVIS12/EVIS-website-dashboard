import { Metadata } from 'next';
import React from 'react';

interface Props {
  children: React.ReactNode;
  params: { id: string };
}

export const metadata: Metadata = {
  title: 'Testimonial Info',
};

export default function TestimonialInfoLayout({ children }: Props) {
  return <>{children}</>;
}
