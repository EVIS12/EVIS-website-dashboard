import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: 'Registration Form',
};

export default function RegistrationFormLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
