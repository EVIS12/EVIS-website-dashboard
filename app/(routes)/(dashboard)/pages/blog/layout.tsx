import React from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'EVIS Blog',
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
