"use server";

import { ExternalProviders } from "@supabase/supabase-js";
import Axios from "axios";
import { setupCache } from "axios-cache-interceptor";
import RegisterPageClient from "./RegisterPage";

const axios = setupCache(Axios.create());

export default async function RegisterPageServer() {
  const response: { data: { external: ExternalProviders } } = await axios.get(
    `${process.env.NEXT_PUBLIC_SUPABASE_URL}/auth/v1/settings?apikey=${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY}`,
  );
  const externalProviders: ExternalProviders = response.data.external;

  return <RegisterPageClient externalProviders={externalProviders} />;
}
