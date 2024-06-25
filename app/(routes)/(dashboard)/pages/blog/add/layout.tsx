import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: 'Add New Article',
};

export default function AddArticleLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
