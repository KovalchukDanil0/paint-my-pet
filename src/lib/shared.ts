import { Session } from "next-auth";

export enum Dimensions {
  "16x20",
  "12x16",
  "11x14",
  "8x10",
  "5x7",
}

export const isAdmin = (session: Session) =>
  process.env.ADMINS_LIST?.split(",").includes(session?.user.email);
