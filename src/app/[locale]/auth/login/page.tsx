"use server";

import { ExternalProviders } from "@supabase/supabase-js";
import axios from "axios";
import ClientLoginPage from "./LoginPage";

export default async function ServerLoginPage() {
  const response: { data: { external: ExternalProviders } } = await axios.get(
    `${process.env.NEXT_PUBLIC_SUPABASE_URL}/auth/v1/settings?apikey=${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY}`,
  );
  const externalProviders: ExternalProviders = response.data.external;

  return <ClientLoginPage externalProviders={externalProviders} />;
}
