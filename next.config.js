/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    MONGODB_URI: process.env.MONGODB_URI,
    ZEPTOMAIL_API_KEY: process.env.ZEPTOMAIL_API_KEY,
    ZEPTOMAIL_FROM_EMAIL: process.env.ZEPTOMAIL_FROM_EMAIL,
  },
}

module.exports = nextConfig
