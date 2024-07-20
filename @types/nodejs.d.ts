declare namespace NodeJS {
  export interface ProcessEnv {
    DATABASE_URL: string;
    DIRECT_URL: string;
    NEXTAUTH_URL: string;
    STRIPE_SECRET_KEY: string;
    SUPABASE_ANON_KEY: string;
    NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY: string;
    NEXT_PUBLIC_EXCHANGE_API: string;
    NEXT_PUBLIC_SUPABASE_URL: string;
  }
}
