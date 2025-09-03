import type { NextConfig } from "next";
const isProd = process.env.NODE_ENV === 'production';
const repo = 'ybm-agency';
const basePath = isProd ? `/${repo}` : '';
const assetPrefix = isProd ? `/${repo}` : '';

const nextConfig: NextConfig = {
    // включаем строгий режим React
    reactStrictMode: true,
    output: "export",
    basePath,
    assetPrefix,
    compiler: {
        // Позволяет использовать SCSS modules с CSS modules
        styledComponents: false,
    },
    typescript: {
        // Предупреждать о TS ошибках при сборке, но не останавливать билд
        // ignoreBuildErrors: false,
    },
    eslint: {
        // чтобы сборка не падала из-за ESLint ошибок
        // ignoreDuringBuilds: true,
    },
};

export default nextConfig;
