import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { hostname: 'lh3.googleusercontent.com' },
      { hostname: 'avatars.githubusercontent.com' },
      { hostname: 'phinf.pstatic.net' },
      { hostname: '*.kakaocdn.net' },
    ],
  },
};

export default nextConfig;
