
/** @type {import('next').NextConfig} */
import withPWA from 'next-pwa';

const config = {
  reactStrictMode: true,
  // Your existing Next.js config
};

const withPWAConfig = withPWA({
  dest: 'public',
  register: true,
  skipWaiting: true,
});

export default withPWAConfig(config);
