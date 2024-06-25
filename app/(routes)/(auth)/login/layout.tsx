import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: 'Signin',
};

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
