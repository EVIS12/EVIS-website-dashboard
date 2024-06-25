import { Metadata } from 'next';
import React from 'react';

interface Props {
  params: { id: string };
  children: React.ReactNode;
}

export const metadata: Metadata = {
  title: 'Edit Speaker',
};

export default function EditSpeakerLayout({ children }: Props) {
  return <>{children}</>;
}
