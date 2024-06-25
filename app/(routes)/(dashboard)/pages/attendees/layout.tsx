import { Metadata } from 'next';
import { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Attendees',
};

export default function Attendeeslayout({ children }: { children: ReactNode }) {
  return children;
}
