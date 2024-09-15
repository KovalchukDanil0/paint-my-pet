"use server";

import { ExternalProviders } from "@supabase/supabase-js";
import Axios from "axios";
import { setupCache } from "axios-cache-interceptor";
import { join } from "path";
import AuthComponent from "./client";

const axios = setupCache(Axios.create());

export default async function AuthPageServer() {
  const response: { data: { external: ExternalProviders } } = await axios.get(
    join(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      "auth",
      "v1",
      `settings?apikey=${process.env.SUPABASE_ANON_KEY}`,
    ),
  );
  const externalProviders: ExternalProviders = response.data.external;

  return <AuthComponent externalProviders={externalProviders} />;
}
