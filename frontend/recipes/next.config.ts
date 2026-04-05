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
        destination: process.env.Backend_URL + '/api/:path*',
      },
      {
        source: '/auth/:path*',
        destination: process.env.Backend_URL + '/auth/:path*',
      },
      {
        source: '/upload',
        destination: process.env.Backend_URL + '/upload',
      },
      {
        source: '/images/:path*',
        destination: process.env.Backend_URL + '/images/:path*',
      },
    ];
  },
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
  images: {
    remotePatterns: [new URL(process.env.Backend_URL + '/images/**')],
  },
};

export default nextConfig;
