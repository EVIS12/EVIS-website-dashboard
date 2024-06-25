import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: 'EVIS Testimonials',
};

export default function TestimonialsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
