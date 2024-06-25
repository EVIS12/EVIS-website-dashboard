import React from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Add Exhibitor',
};

export default function AddExhibitorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
