import type { NextConfig } from "next";

const isMobile = process.env.NEXT_PUBLIC_IS_MOBILE === 'true';
const nextConfig: NextConfig = {
	...(isMobile ? {output: 'export',distDir: '../www'} : {}),
	reactStrictMode: true,
	images: {
		unoptimized: true, // Required for static export
	},
};

export default nextConfig;
