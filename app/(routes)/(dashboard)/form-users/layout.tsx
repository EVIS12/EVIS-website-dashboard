import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: 'Form Users',
};

export default function FormUsersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
