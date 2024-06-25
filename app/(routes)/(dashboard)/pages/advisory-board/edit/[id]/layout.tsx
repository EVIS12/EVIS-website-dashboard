import { Metadata } from 'next';
import React from 'react';

interface Props {
  params: { id: string };
  children: React.ReactNode;
}

export const metadata: Metadata = {
  title: 'Edit Advisory',
};

export default function EditAdvisorLayout({ children }: Props) {
  return <>{children}</>;
}
