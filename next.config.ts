import type { NextConfig } from "next";

// GitHub Pages serves this repo at /profiles. Override with BASE_PATH="" for local or custom-domain builds.
const basePath = process.env.BASE_PATH ?? "/profiles";

const nextConfig: NextConfig = {
  output: "export",
  basePath,
  trailingSlash: true,
  images: { unoptimized: true },
  env: { NEXT_PUBLIC_BASE_PATH: basePath },
};

export default nextConfig;
