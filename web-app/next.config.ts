import type { NextConfig } from "next";

const isMobile = process.env.NEXT_PUBLIC_IS_MOBILE === 'true';
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? '';
const nextConfig: NextConfig = {
	...(isMobile ? {output: 'export',distDir: '../www'} : {}),
	basePath: basePath,
	assetPrefix: `${basePath}/`,
	reactStrictMode: true,
	images: {
		unoptimized: true, // Required for static export
	},
};

export default nextConfig;
