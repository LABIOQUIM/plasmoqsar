"use server";
import axios from "axios";
import { prisma } from "database";

import { auth } from "@/lib/lucia";

export async function registerUser(data: RegisterFormInputs) {
  try {
    const user = await auth.createUser({
      key: {
        providerId: "username", // auth method
        providerUserId: data.username.toLowerCase(), // unique id when using "username" auth method
        password: data.password, // hashed by Lucia
      },
      attributes: {
        email: data.email,
        firstName: data.firstName,
        lastName: data.lastName,
        username: data.username,
      },
    });

    const userActivation = await prisma.userActivation.create({
      data: {
        user: {
          connect: {
            id: user.userId,
          },
        },
      },
    });

    await axios.post("http://mailer:3000/send-email", {
      from: `PlasmoQSAR <${process.env.SMTP_USER}>`,
      to: data.email,
      subject: "Your registration at PlasmoQSAR",
      template: "activation.hbs",
      context: {
        name: data.firstName,
        activationURL: `${process.env.APP_URL}/activate/${userActivation.id}`,
      },
    });

    // SEND MAIL HERE
  } catch (e: any) {
    if (e && e.code && e.code === "P2002") {
      return "existing-user";
    }

    return "unknown-error";
  }
}
