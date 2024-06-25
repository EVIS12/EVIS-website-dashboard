import React from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Add Speaker',
};

export default function AddSpeakerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
