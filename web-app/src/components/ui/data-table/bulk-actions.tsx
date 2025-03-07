import { Table } from "@tanstack/react-table";
import React from "react";
import { Button } from "@/components/ui/button";
import { buttons, ExportMenuProps } from "@/components/export-menu";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuPortal, DropdownMenuSeparator, DropdownMenuSub, DropdownMenuSubContent, DropdownMenuSubTrigger, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { ChevronDown, Upload, Trash } from "lucide-react";
import { FacetedFilter } from "@/components/ui/data-table/faceted-filter";

function ExportMenu<TData>({data, filename}: ExportMenuProps<TData>) {
	return (
		<DropdownMenuSub>
			<DropdownMenuSubTrigger>
				<Upload className="h-4 w-4"/>
				Export
			</DropdownMenuSubTrigger>
			<DropdownMenuPortal>
				<DropdownMenuSubContent>
					{buttons.map(({label, onClick}) => (
						<DropdownMenuItem
							key={label}
							onClick={() => onClick(data, filename)}
						>
							{label}
						</DropdownMenuItem>
					))}
				</DropdownMenuSubContent>
			</DropdownMenuPortal>
		</DropdownMenuSub>
	)
}

function getSelectedRows<TData>(table: Table<TData>) {
	return table.getSelectedRowModel().rows.map(row => row.original)
}

interface DataTableBulkActionsProps<TData> {
	table: Table<TData>
	facetedFilters?: FacetedFilter[]
	importFilename?: string
	onDelete?: (data: TData[]) => void
}

export function DataTableBulkActions<TData>({
	table,
	facetedFilters,
	importFilename,
	onDelete,
}: DataTableBulkActionsProps<TData>) {
	const selectedValues = getSelectedRows(table)
	return (
		0 < selectedValues.length ? (
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button variant="outline" size="sm" className={`me-2`}>
						Bulk Actions
						<ChevronDown className="ml-2 h-4 w-4"/>
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent align="end">
					<ExportMenu data={selectedValues} filename={importFilename || 'data'}/>
					{facetedFilters?.map((filter) => (
						<DropdownMenuSub key={filter.key}>
							<DropdownMenuSubTrigger>
								{filter.title}
							</DropdownMenuSubTrigger>
							<DropdownMenuPortal>
								<DropdownMenuSubContent>
									{filter.options.map((option) => (
										<DropdownMenuItem
											key={option.value}
											onClick={() => selectedValues.map(data => data[filter.key as keyof TData] = option.value)}
										>
											{option.label}
										</DropdownMenuItem>
									))}
								</DropdownMenuSubContent>
							</DropdownMenuPortal>
						</DropdownMenuSub>
					))}
					<DropdownMenuItem className={`text-error-600`} onClick={() => {
						table.toggleAllRowsSelected(false);
						onDelete?.(selectedValues)
					}}>
						<Trash className="h-4 w-4"/>
						Delete
					</DropdownMenuItem>
					<DropdownMenuSeparator/>
					<DropdownMenuItem onClick={() => table.toggleAllRowsSelected(false)}>
						Clear selection
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
		) : null
	)
}