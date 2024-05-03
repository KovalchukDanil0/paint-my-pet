import { Session } from "next-auth";

export enum Dimensions {
  "16x20",
  "12x16",
  "11x14",
  "8x10",
  "5x7",
}

export enum ProductTags {
  "dog",
  "cat",
  "rat",
}

export const isAdmin = (session: Session) =>
  process.env.ADMINS_LIST?.split(",").includes(session?.user.email);

export function isEmpty(object: Object | null) {
  if (object == null) {
    return true;
  }
  return Object.values(object).every((x) => x == null || x === "");
}
