/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
  	CLIENT_ID: 'wW9MMzkevjAzHSuJtz33rtW4iAylk9WwwYKn1zL0',
  	CLIENT_SECRET: 'besj1rRQ95FHBYFGQEaMtYUQGVXPHnhjQSklzu46Gbhyf6SpvAWJARtytpkdcQ8xJiLsuKx1faXQ9f89EQRPhcPDNgYvxDzsVB9iKjFYvKFtjOSUTwcEw3KZR6I1VTW8',
  	TOKEN_GENERIC_API: '465e58394a7145c1ed83e780e66fef7001f72b2e',
  	// API_URL: 'https://ticlass-staging.herokuapp.com/',
    API_URL: 'http://localhost:8002/',
  	SITE_URL: 'https://www.ticlass.com',
  	SITE_NAME: 'TIClass.com',
    PORT: 3000
  },
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
}

module.exports = nextConfig
