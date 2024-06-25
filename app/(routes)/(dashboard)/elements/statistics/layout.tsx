import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: 'EVIS Statistics',
};

export default function StatisticsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
