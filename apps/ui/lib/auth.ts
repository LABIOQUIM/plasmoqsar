import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

import { api } from "./api";

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  jwt: {
    maxAge: 10 * 60,
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.user = {
          id: user.id,
          username: user.username,
          email: user.email!,
          createdAt: user.createdAt,
          updatedAt: user.updatedAt,
        };
        token.sub = user.accessToken;
      }

      return token;
    },
    async session({ session, token }) {
      session.user = token.user;
      session.accessToken = token.sub!;

      return session;
    },
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        identifier: { label: "Identifier", type: "text" },
        pass: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (credentials) {
          const response = await api.post<AuthResponse>("/auth", credentials);

          if (response.status === 201) {
            api.defaults.headers.Authorization = `Bearer ${response.data.accessToken}`;

            return {
              ...response.data.user,
              accessToken: response.data.accessToken,
            };
          }
        }

        return null;
      },
    }),
  ],
};
