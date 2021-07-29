import { withIronSession } from "next-iron-session";

export default function withSession(handler) {
  return withIronSession(handler, {
    password: "iwGUxp7AtgWtkePtHRT1zaLJaKhf33JG",
    cookieName: "next-app",
    cookieOptions: {
      secure: process.env.NODE_ENV === "production",
    },
  });
}
