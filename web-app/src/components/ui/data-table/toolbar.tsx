import { Table } from "@tanstack/react-table"

import React from "react";
import { DataTableViewOptions } from "@/components/ui/data-table/view-options";
import { DataTableFacetedFilters, DataTableSearchFilter } from "@/components/ui/data-table/filters";
import { FacetedFilter } from "@/components/ui/data-table/faceted-filter";
import { DataTableBulkActions } from "@/components/ui/data-table/bulk-actions";

interface DataTableToolbarProps<TData> {
	table: Table<TData>
	data: TData[]
	globalFilter: string
	setGlobalFilter: React.Dispatch<React.SetStateAction<string>>
	facetedFilters?: FacetedFilter[]
	importFilename?: string
	onEdit?: (data: TData[]) => void
	onDelete?: (data: TData[]) => void
}

export function DataTableToolbar<TData>({
	table,
	data,
	globalFilter,
	setGlobalFilter,
	facetedFilters,
	importFilename,
	onEdit,
	onDelete,
}: DataTableToolbarProps<TData>) {

	return (
		<div className="space-y-2">
			<div className={"flex items-center justify-between space-x-2"}>
				<DataTableSearchFilter {...{globalFilter, setGlobalFilter}}/>
				<div className="flex items-center">
					<DataTableBulkActions {...{table, onEdit, facetedFilters, importFilename, onDelete}}/>
					<DataTableViewOptions {...{table}}/>
				</div>
			</div>
			<div className="space-x-2 space-y-2">
				<DataTableFacetedFilters {...{table, facetedFilters}}/>
			</div>
			<div className="space-x-2 space-y-2 pl-4">
				<div className="text-sm text-muted-foreground">
					{/*finding {table.getFilteredRowModel().rows.length} of {table.getFilteredRowModel().rows.length} rows*/}
					{/*Results: or filter*/}
					Results:{" "}
					{table.getFilteredRowModel().rows.length} of {data.length} items
				</div>
			</div>
		</div>
	)
}