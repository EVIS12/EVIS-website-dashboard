import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: 'Registration Links',
};

export default function RegisterLinksLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
