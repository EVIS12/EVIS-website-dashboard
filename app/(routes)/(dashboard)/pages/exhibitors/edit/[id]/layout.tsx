import React from 'react';
import { Metadata } from 'next';

interface Props {
  children: React.ReactNode;
}

export const metadata: Metadata = {
  title: 'Edit Exhibitor',
};

export default function EditExhibitorLayout({ children }: Props) {
  return <>{children}</>;
}
