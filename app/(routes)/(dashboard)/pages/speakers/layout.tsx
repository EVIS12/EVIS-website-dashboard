import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: 'EVIS Speakers',
};

export default function SpeakersLayout({ children }: { children: string }) {
  return <>{children}</>;
}
