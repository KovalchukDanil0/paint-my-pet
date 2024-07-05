import withMDX from "@next/mdx";
import withPlugins from "next-compose-plugins";
import createNextIntlPlugin from "next-intl/plugin";

const withMDXPlugin = withMDX({
  extension: /\.mdx?$/,
});

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    config.resolve.fallback = { fs: false };

    return config;
  },
  images: {
    remotePatterns: [{ hostname: "ljcwvpublqnhcfwtbjli.supabase.co" }],
  },
  pageExtensions: ["ts", "tsx", "js", "jsx", "md", "mdx"],
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: "/:locale/auth",
        destination: "/auth/login",
        basePath: false,
        permanent: true,
      },
    ];
  },
};

export default withPlugins([withMDXPlugin, withNextIntl], nextConfig);
