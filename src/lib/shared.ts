import { Session } from "next-auth";

export enum Dimensions {
  "16x20",
  "12x16",
  "11x14",
  "8x10",
  "5x7",
}

const adminsList = ["danilkovalchuk0@gmail.com"];

export const isAdmin = (session: Session) =>
  adminsList.includes(session?.user.email);
