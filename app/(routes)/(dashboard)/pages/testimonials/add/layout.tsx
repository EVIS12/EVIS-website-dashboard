import React from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Add Testimonial',
};

export default function AddTestimonialLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
