import type { Metadata } from 'next'
// import { Roboto } from 'next/font/google'
import './globals.css'
import { Navigation } from '@/components/navigation'
import { ThemeProvider } from '@/providers/theme-provider'
import { Toaster } from '@/components/ui/toaster'
import React from "react";
import config from "@/config";

// const inter = Roboto({
// 	weight: '400',
// 	subsets: ['latin']
// })

export const metadata: Metadata = {
	title      : config.site.name,
	description: config.site.description,
	icons      : {
		icon: '/favicon.ico'
	}
}

export default function RootLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<html lang="en" suppressHydrationWarning>
		<body
			// className={inter.className}
		>
		<ThemeProvider
			attribute="class"
			defaultTheme="system"
			enableSystem
			disableTransitionOnChange
		>
			<Navigation/>
			<main>{children}</main>
			<Toaster/>
		</ThemeProvider>
		</body>
		</html>
	)
}
