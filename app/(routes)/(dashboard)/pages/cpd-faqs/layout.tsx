import { Metadata } from 'next';
import { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'CPD FAQs',
};

export default function CPDFAQslayout({ children }: { children: ReactNode }) {
  return children;
}
