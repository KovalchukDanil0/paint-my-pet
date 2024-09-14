// @ts-check

import withMDX from "@next/mdx";
import createNextIntlPlugin from "next-intl/plugin";

// @ts-ignore
import withPlugins from "next-compose-plugins";

const withMDXPlugin = withMDX({
  extension: /\.mdx?$/,
});

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    NEXT_PUBLIC_EXCHANGE_API: process.env.NEXT_PUBLIC_EXCHANGE_API,
  },
  webpack: (config) => {
    config.resolve.fallback = { fs: false };

    return config;
  },
  images: {
    remotePatterns: [
      { hostname: "ljcwvpublqnhcfwtbjli.supabase.co" },
      { hostname: "http.cat" },
    ],
  },
  pageExtensions: ["ts", "tsx", "mdx"],
  reactStrictMode: true,
};

export default withPlugins([withMDXPlugin, withNextIntl], nextConfig);
