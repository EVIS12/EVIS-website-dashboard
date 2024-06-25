import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: 'EVIS Files',
};

export default function FilesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
