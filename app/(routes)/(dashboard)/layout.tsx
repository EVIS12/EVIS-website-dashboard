import { AcountInfo, Navbar } from '@/app/_components';
import { authOptions } from '@/app/_lib/authOptions';
import { Metadata } from 'next';
import { getServerSession } from 'next-auth/next';
import { redirect } from 'next/navigation';
import React from 'react';

export const metadata: Metadata = {
  title: 'EVIS Analytics',
};

export default async function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);
  if (!session) redirect('/login');

  return (
    <body className="flex bg-[#E1E9EB]">
      <Navbar />
      <>
        <main className="w-full">
          <div className="container">
            <AcountInfo />
            {children}
          </div>
        </main>
      </>
    </body>
  );
}
