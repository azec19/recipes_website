import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here 
  proxy pour rediriger sur le bon port.
  la source vient tj de /api/.... et on redirige simplement en enlevant le "api" */
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://localhost:3000/:path*',
      },
      {
        source: '/upload',
        destination: 'http://localhost:3000/:upload',
      },
    ];
  },
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
};

export default nextConfig;
