import Link from "next/link";
import config from "@/config";
import { Button } from "@/components/ui/button";
import { SettingsIcon } from "lucide-react";

export function SettingsButton() {
	return (
		<Link href={config.ROUTES.settings.href}>
			<Button variant="ghost" size="icon">
				<SettingsIcon className="h-6 w-6"/>
				<span className="sr-only">Settings</span>
			</Button>
		</Link>
	)
}