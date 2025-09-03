import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    // включаем строгий режим React
    reactStrictMode: true,
    output: "export",
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
