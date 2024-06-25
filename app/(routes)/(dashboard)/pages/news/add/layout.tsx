import React from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Add News',
};

export default function AddNewsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
