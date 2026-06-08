import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import Google from 'next-auth/providers/google';
import { compare } from 'bcryptjs';
import { store } from './store';

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID!,
      clientSecret: process.env.AUTH_GOOGLE_SECRET!,
    }),
    Credentials({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        const user = store.findUserByEmail(credentials.email as string);
        if (!user) return null;

        const isValid = await compare(credentials.password as string, user.password);
        if (!isValid) return null;

        return {
          id: user.id,
          email: user.email,
          name: user.name || user.email,
          plan: user.plan,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, account }) {
      // Google OAuth: create user if first time
      if (account?.provider === 'google' && user) {
        const existing = store.findUserByEmail(user.email!);
        if (!existing) {
          store.createUserOAuth(user.email!, user.name || 'Google User', 'google');
        }
        token.id = user.id || user.email;
        token.plan = 'free';
      }
      if (user && account?.provider === 'credentials') {
        token.id = user.id;
        token.plan = (user as any).plan || 'free';
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as any).id = token.id;
        (session.user as any).plan = token.plan || 'free';
      }
      return session;
    },
  },
  pages: {
    signIn: '/login',
  },
  session: {
    strategy: 'jwt',
  },
});
