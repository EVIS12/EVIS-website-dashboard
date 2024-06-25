import Credentials from 'next-auth/providers/credentials';
import { AuthOptions } from 'next-auth';

export const authOptions: AuthOptions = {
  providers: [
    Credentials({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (credentials) {
          const credForm = new FormData();
          credForm.append('email', credentials.email);
          credForm.append('password', credentials.password);
          const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/auth/jwt/create/`,
            {
              method: 'POST',
              body: credForm,
            }
          );
          const tokens = await res.json();
          if (res.status === 200) return tokens;
          else return null;
        } else {
          return null;
        }
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        //@ts-ignore
        token.access = user.access;
        //@ts-ignore
        token.refresh = user.refresh;
      }
      return token ?? null;
    },
    async session({ session, token }) {
      return Promise.resolve({ ...session, token });
    },
  },
  session: { strategy: 'jwt' },
};
