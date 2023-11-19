import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

import { api } from "./api";

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    maxAge: 600,
    updateAge: 30 * 24 * 60 * 60,
  },
  jwt: {
    maxAge: 600,
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.user = {
          id: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
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
        console.log("authorize");
        if (credentials) {
          console.log("has creds");
          const response = await api.post<AuthResponse>("/auth", credentials);

          console.log(response.data);

          if (response.status === 201) {
            return {
              ...response.data.user,
              accessToken: response.data.accessToken,
            };
          }
        }

        throw new Error("failed");
      },
    }),
  ],
};
