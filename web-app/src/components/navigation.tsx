'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { ThemeToggle } from '@/components/theme-toggle'
import { config, RouteType } from "@/config";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SettingsButton } from "@/components/settingsButton";

const routes = Object.values(config.ROUTES).filter((route) => !(route as RouteType).hidden)

export function Navigation() {
	const pathname = usePathname()

	return (
		<div className="border-b">
			<div className="flex h-16 items-center px-4 container mx-auto">
				{/* Mobile Sheet Trigger */}
				<Sheet>
					<SheetTrigger asChild className="sm:hidden">
						<Button variant="ghost" size="icon">
							<Menu className="h-6 w-6"/>
							<span className="sr-only">Toggle menu</span>
						</Button>
					</SheetTrigger>

					{/* Mobile Sheet Content */}
					<SheetContent side="left" className="w-72">
						<SheetHeader>
							<SheetTitle>{config.site.name}</SheetTitle>
						</SheetHeader>
						<nav className="flex flex-col space-y-4 mt-4">
							{routes.map((route) => (
								<Link
									key={route.href}
									href={route.href}
									className={cn(
										"text-sm font-medium transition-colors hover:text-primary",
										pathname === route.href
											? "text-black dark:text-white"
											: "text-muted-foreground",
									)}
								>
									{route.label}
								</Link>
							))}
						</nav>
					</SheetContent>
				</Sheet>
				<nav className="hidden sm:flex items-center space-x-4 sm:space-x-6 mx-6">
					{routes.map((route) => (
						<Link
							key={route.href}
							href={route.href}
							className={cn(
								"text-sm font-medium transition-colors hover:text-primary",
								pathname === route.href
									? "text-black dark:text-white"
									: "text-muted-foreground",
							)}
						>
							{route.label}
						</Link>
					))}
				</nav>
				<div className="ml-auto flex items-center space-x-4">
					<SettingsButton/>
					<ThemeToggle/>
				</div>
			</div>
		</div>
	)
}
