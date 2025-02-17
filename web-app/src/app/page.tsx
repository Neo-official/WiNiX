'use client'

import { Button } from '@/components/ui/button'
import { usePathname } from 'next/navigation'
import config from "@/config";
import Link from "next/link";

const routes = Object.values(config.ROUTES)
export default function Home() {
	const pathname = usePathname()

	return (
		<main className="flex min-h-screen flex-col items-center justify-center p-24">
			<div className="space-y-4">
				{routes.map((route, key) => (
					route.href === pathname ? null : (
					<Link href={route.href} key={key}>
						<Button color='primary' className="w-full m-2" variant='link'>
							{route.label}
						</Button>
					</Link>
				)))}
			</div>
		</main>
	)
}
