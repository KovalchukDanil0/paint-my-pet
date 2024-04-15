const withPlugins = require("next-compose-plugins");
const createNextIntlPlugin = require("next-intl/plugin");
const withMDX = require("@next/mdx")({
  extension: /\.mdx?$/,
  options: {
    // If you use remark-gfm, you'll need to use next.config.mjs
    // as the package is ESM only
    // https://github.com/remarkjs/remark-gfm#install
    remarkPlugins: [],
    rehypePlugins: [],
    // If you use `MDXProvider`, uncomment the following line.
    // providerImportSource: "@mdx-js/react",
  },
});

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
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

module.exports = withPlugins([withMDX, withNextIntl], nextConfig);
