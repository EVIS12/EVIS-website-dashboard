import { Metadata } from 'next';
import React from 'react';

interface Props {
  params: { id: string };
  children: React.ReactNode;
}

export const metadata: Metadata = {
  title: 'Download Form User',
};

export default function UserInfoLayout({ children }: Props) {
  return <>{children}</>;
}
