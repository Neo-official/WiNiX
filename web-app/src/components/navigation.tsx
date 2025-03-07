'use client'

import Link from 'next/link'
import { cn } from '@/lib/utils'
import { ThemeToggle } from '@/components/theme-toggle'
import { config } from "@/config";
import { SettingsButton } from "@/components/settingsButton";

export function Navigation() {

	return (
		<div className="border-b">
			<div className="flex h-16 items-center justify-between container px-4 mx-auto">
				<ThemeToggle/>
				<Link
					href="/"
					className={cn(
						"text-lg font-medium transition-colors hover:text-primary",
						"text-black dark:text-white",
					)}
				>
					{config.site.name}
				</Link>
				<SettingsButton/>
			</div>
		</div>
	)
}
