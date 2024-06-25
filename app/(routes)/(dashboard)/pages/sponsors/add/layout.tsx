import React from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Add Sponsor',
};

export default function AddSpeakerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
