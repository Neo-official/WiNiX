import { Table } from "@tanstack/react-table"

import React from "react";
import { DataTableViewOptions } from "@/components/ui/data-table/view-options";
import { DataTableFilters } from "@/components/ui/data-table/filters";
import { FacetedFilter } from "@/components/ui/data-table/faceted-filter";
import { DataTableBulkActions } from "@/components/ui/data-table/bulk-actions";

interface DataTableToolbarProps<TData> {
	table: Table<TData>
	globalFilter: string
	setGlobalFilter: React.Dispatch<React.SetStateAction<string>>
	facetedFilters?: FacetedFilter[]
	importFilename?: string
	onDelete?: (data: TData[]) => void
}

export function DataTableToolbar<TData>({
	table,
	globalFilter,
	setGlobalFilter,
	facetedFilters,
	importFilename,
	onDelete,
}: DataTableToolbarProps<TData>) {

	return (
		<div className="sm:flex items-center justify-between">
			<DataTableFilters {...{table, globalFilter, setGlobalFilter, facetedFilters}}/>
			<div className={"flex items-center space-x-2"}>
				<DataTableBulkActions {...{table, importFilename, onDelete}}/>
				<DataTableViewOptions {...{table}}/>
			</div>
		</div>
	)
}