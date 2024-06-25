import { Metadata } from 'next';
import React from 'react';

interface Props {
  params: { id: string };
  children: React.ReactNode;
}

export const metadata: Metadata = {
  title: 'Edit News',
};

export default function EditNewsLayout({ children }: Props) {
  return <>{children}</>;
}
