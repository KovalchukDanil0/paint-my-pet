import { UserResponse } from "@supabase/supabase-js";

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

export function isAdmin(user: UserResponse) {
  if (user.error != null || user.data.user == null) {
    return false;
  }

  return process.env.ADMINS_LIST?.split(",").includes(user.data.user.email!);
}

export function isEmpty(object: Object | null) {
  if (object == null) {
    return true;
  }
  return Object.values(object).every((x) => x == null || x === "");
}

export interface Countries {
  data: Name[];
}

interface Name {
  name: { common: string };
}
