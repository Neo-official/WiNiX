'use client'

import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import { exportData } from '@/lib/utils/storage'

export const buttons = [
	{label: 'Export as JSON', onClick: exportData.toJSON},
	{label: 'Export as CSV', onClick: exportData.toCSV},
	{label: 'Export as Excel', onClick: exportData.toExcel},
]

export interface ExportMenuProps<TData> {
	data: TData[]
	filename: string
}

export function ExportMenu<TData>({data, filename}: ExportMenuProps<TData>) {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant="outline">Export</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent>
				{buttons.map(({label, onClick}) => (
					<DropdownMenuItem key={label} onClick={() => onClick(data, filename)}>
						{label}
					</DropdownMenuItem>
				))}
			</DropdownMenuContent>
		</DropdownMenu>
	)
}
