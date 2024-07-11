import withMDX from "@next/mdx";
import withPlugins from "next-compose-plugins";
import createNextIntlPlugin from "next-intl/plugin";

const withMDXPlugin = withMDX({
  extension: /\.mdx?$/,
});

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    SUPABASE_PAGE: process.env.SUPABASE_PAGE,
    SUPABASE_API: process.env.SUPABASE_API,
    NEXT_PUBLIC_EXCHANGE_API: process.env.NEXT_PUBLIC_EXCHANGE_API,
  },
  webpack5: true,
  webpack: (config) => {
    config.resolve.fallback = { fs: false };

    return config;
  },
  images: {
    remotePatterns: [{ hostname: "ljcwvpublqnhcfwtbjli.supabase.co" }],
  },
  pageExtensions: ["ts", "tsx", "js", "jsx", "md", "mdx"],
  reactStrictMode: true,
};

export default withPlugins([withMDXPlugin, withNextIntl], nextConfig);
