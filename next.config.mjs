/** @type {import('next').NextConfig} */
const nextConfig = {
    trailingSlash: true,
    reactStrictMode: true,
    output: "standalone",
    async rewrites() {
        return [
            {
                source: '/api/proxy/:path*',
                destination: 'https://proofa-backend-40641038540.europe-west1.run.app/:path*',
            },
        ];
    },
};

export default nextConfig;
