import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import React from "react";

type DeviceSelectProps<TData> = {
	value: TData
	onChange: (value: TData) => void
	// @ts-ignore
	source: typeof TData
}

export function DeviceSelect<TData>({value, onChange, source}: DeviceSelectProps<TData>) {
	return (
		<Select
			onValueChange={value => onChange(value as TData)}
			value={value as string}
		>
			<SelectTrigger className="uppercase">
				<SelectValue placeholder="Select a product"/>
			</SelectTrigger>
			<SelectContent>
				{Object.values(source).map((key: any) => (
					<SelectItem key={key} value={key} className="uppercase">
						{key}
					</SelectItem>
				))}
			</SelectContent>
		</Select>
	)
}