import { Session } from 'next-auth';
import NextAuth from 'next-auth/next';

declare module 'next-auth' {
  interface Session extends Session {
    token: { access: string; refresh: string };
  }
}
