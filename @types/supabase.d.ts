import "@supabase/supabase-js";

declare module "@supabase/supabase-js" {
  interface ExternalProviders {
    anonymous_users: boolean;
    apple: boolean;
    azure: boolean;
    bitbucket: boolean;
    discord: boolean;
    facebook: boolean;
    figma: boolean;
    fly: boolean;
    github: boolean;
    gitlab: boolean;
    google: boolean;
    keycloak: boolean;
    kakao: boolean;
    linkedin: boolean;
    linkedin_oidc: boolean;
    notion: boolean;
    spotify: boolean;
    slack: boolean;
    workos: boolean;
    twitch: boolean;
    twitter: boolean;
    email: boolean;
    phone: boolean;
    zoom: boolean;
  }
}
