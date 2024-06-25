import { authOptions } from '@/app/_lib/authOptions';
import { getServerSession } from 'next-auth/next';
import { redirect } from 'next/navigation';
import React from 'react';

export default async function AuthLayout({ children }: { children: string }) {
  const session = await getServerSession(authOptions);
  if (session) redirect('/');

  return <body className="flex bg-[#E1E9EB]">{children}</body>;
}
