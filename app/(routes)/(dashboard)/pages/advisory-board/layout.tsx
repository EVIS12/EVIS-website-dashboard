import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: 'Advisory Board',
};

export default function AdvisoryBoardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
