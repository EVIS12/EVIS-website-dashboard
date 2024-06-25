import React from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Add Advisor',
};

export default function AddAdvisorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
