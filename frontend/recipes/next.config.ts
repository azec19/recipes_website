import type { NextConfig } from "next";
import 'dotenv/config'
const nextConfig: NextConfig = {
  /* config options here 
  proxy pour rediriger sur le bon port.
  la source vient tj de /api/.... et on redirige simplement en enlevant le "api" */
  /*update, je sais pas vraiment si c'est utile ca*/
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://localhost:3000/api/:path*',
      },
      {
        source: '/auth/:path*',
        destination: 'http://localhost:3000/auth/:path*',
      },
      {
        source: '/upload',
        destination: 'http://localhost:3000/upload',
      },
      {
        source: '/images/:path*',
        destination: 'http://localhost:3000/images/:path*',
      },
    ];
  },
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
  images: {
    remotePatterns: [new URL('http://localhost:3000/images/**')],
  },
};

export default nextConfig;
