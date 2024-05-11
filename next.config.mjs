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
    remotePatterns: [{ hostname: "lh3.googleusercontent.com" }],
  },
  pageExtensions: ["ts", "tsx", "js", "jsx", "md", "mdx"],
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: "/redirect",
        destination: "/",
        basePath: false,
        permanent: true,
      },
    ];
  },
  async rewrites() {
    return {
      beforeFiles: [
        // These rewrites are checked after headers/redirects
        // and before all files including _next/public files which
        // allows overriding page files
        {
          source: "/rewrite",
          destination: "https://github.com/vercel/next.js/discussions/8207",
        },
      ],
      afterFiles: [],
      fallback: [],
    };
  },
};

export default withPlugins([withMDXPlugin, withNextIntl], nextConfig);
