import { Metadata } from 'next';
import React from 'react';

interface Props {
  children: React.ReactNode;
}

export const metadata: Metadata = {
  title: 'Edit Testimonial',
};

export default function EditTestimonialLayout({ children }: Props) {
  return <>{children}</>;
}
