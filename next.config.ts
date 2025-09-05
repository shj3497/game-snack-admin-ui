import type {NextConfig} from 'next';

const nextConfig: NextConfig = {
  /* config options here */

  experimental: {
    // serverActions: {
    //   allowedOrigins: [
    //     'https://admin-api-test.game-snack.co.kr',
    //     'https://admin-api.game-snack.co.kr',
    //   ],
    // },
  },

  rewrites: async () => {
    return [
      {
        source: '/admin/api/:path*',
        destination: `${process.env.API_BASE_URL}/admin/api/:path*`,
      },
    ];
  },

  publicRuntimeConfig: {
    NEXT_PUBLIC_BASE_URL: process.env.NEXT_PUBLIC_BASE_URL,
  },
  serverRuntimeConfig: {
    API_BASE_URL: process.env.API_BASE_URL,
  },
};

export default nextConfig;
