/** @type {import('next').NextConfig} */
const nextConfig = {
    trailingSlash: true,
    reactStrictMode: true,
    async rewrites() {
        return [
            {
                source: '/api/proxy/:path*',
                destination: 'https://proofa-backend-966541614788.europe-west1.run.app/:path*',
            },
        ];
    },
};

export default nextConfig;
