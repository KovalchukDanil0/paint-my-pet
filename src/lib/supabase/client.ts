import { createBrowserClient } from "@supabase/ssr";

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

export function createClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error("Environment variables are undefined");
  }

  return createBrowserClient(supabaseUrl, supabaseAnonKey);
}
