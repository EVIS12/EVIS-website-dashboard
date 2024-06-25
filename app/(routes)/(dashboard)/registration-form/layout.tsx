import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: 'Students Projects Info',
};

export default function StudentsProjectsInfoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
