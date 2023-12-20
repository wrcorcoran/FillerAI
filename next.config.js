/** @type {import('next').NextConfig} */
const nextConfig = {
    output: "export",
    basePath: "",
    images: {
        unoptimized: true,
    },
    // async rewrites() {
    //     return [
    //         {
    //             source: "/api/:path*",
    //             destination: "http://127.0.0.1:5328/:path*", // Proxy to Backend
    //         },
    //     ];
    // },
};

module.exports = nextConfig;
