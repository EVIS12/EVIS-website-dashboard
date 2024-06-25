import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: 'EVIS Start Time',
};

export default function TimerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
