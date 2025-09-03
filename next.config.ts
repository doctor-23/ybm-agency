import type { NextConfig } from "next";
const isProd = process.env.NODE_ENV === 'production';
const basePath = isProd ? '/ybm-agency/out' : '';
const assetPrefix = isProd ? 'https://doctor-23.github.io/ybm-agency/out' : '';

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
