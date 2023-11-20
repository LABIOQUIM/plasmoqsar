/// <reference types="lucia" />
declare namespace Lucia {
  type Auth = import("./lucia.js").Auth;
  type DatabaseUserAttributes = {
    firstName: string;
    lastName: string;
    email: string;
    username: string;
    createdAt?: string;
    updatedAt?: string;
  };
  type DatabaseSessionAttributes = {};
}
