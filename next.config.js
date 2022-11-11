/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  env: {
    //API_URL: 'https://ticlass-staging.herokuapp.com/',
  	CLIENT_ID: 'k42t26Dn5cNqLyv9Zt36ZTFBKJRF7C6Aq2aLp4FV',
  	CLIENT_SECRET: 'TJ2eJvovunI9rJDNCTm1OILRDlC4GNXuj1HZgx0grdkYzntTIMUz9NdyqcgT9i87WfFl3a7eOhqxrXc9dZBC4mVgYxg062hOIJMkhblSPM78dJ1TDnylrljlwiuSOdjn',
  	TOKEN_GENERIC_API: 'ed00f82cd64c7ed6f0f7d90116e01247fcaa3a6f',
    API_URL: 'http://localhost:8000/',
  	SITE_URL: 'https://www.ticlass.com',
  	SITE_NAME: 'TIClass.com',
  },
}

module.exports = nextConfig
