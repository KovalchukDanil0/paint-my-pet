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

export function isEmpty(object?: Object) {
  if (!object) {
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

type SupabaseProps = {
  supabaseUrl: string;
  supabaseAnonKey: string;
};

export function getSupabaseProps(): SupabaseProps {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error("Environment variables are undefined");
  }

  return { supabaseUrl, supabaseAnonKey };
}
