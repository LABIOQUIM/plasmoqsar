// eslint-disable-next-line @typescript-eslint/no-unused-vars,no-unused-vars
import NextAuth, { DefaultSession } from "next-auth";

declare global {
  interface AppUser {
    id: string;
    firstName: string;
    lastName?: string;
    username: string;
    email: string;
    createdAt: string;
    updatedAt: string;
  }

  interface AuthResponse {
    accessToken: string;
    user: AppUser;
  }
}

declare module "next-auth" {
  interface Session extends DefaultSession {
    user: AppUser;
    accessToken: string;
  }
  interface User extends AppUser {
    accessToken: string;
  }
}

declare module "next-auth/jwt" {
  /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
  interface JWT {
    user: AppUser;
  }
}
