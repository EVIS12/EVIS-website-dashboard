import { Metadata } from 'next';
import React from 'react';

interface Props {
  children: React.ReactNode;
}

export const metadata: Metadata = {
  title: 'Edit Article',
};

export default function EditArticleLayout({ children }: Props) {
  return <>{children}</>;
}
