import { Metadata } from 'next';
import React from 'react';

interface Props {
  params: { id: string };
  children: React.ReactNode;
}

export const metadata: Metadata = {
  title: 'Advisor Info',
};

export default function AdvisorInfoLayout({ children }: Props) {
  return <>{children}</>;
}
