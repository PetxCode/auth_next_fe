/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "monipoint.com",
      },
    ],
  },
};

export default nextConfig;
