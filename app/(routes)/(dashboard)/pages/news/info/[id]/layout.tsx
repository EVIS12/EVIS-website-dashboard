import React from 'react';
import { Metadata } from 'next';

interface Props {
  children: React.ReactNode;
  params: { id: string };
}

export const metadata: Metadata = {
  title: 'News Info',
};

export default function NewsInfoLayout({ children }: Props) {
  return <>{children}</>;
}
