"use client"

import { Table } from "@tanstack/react-table"
import { X } from "lucide-react"

import { Button } from "@/components/ui/button"
import React from "react";
import { Input } from "@/components/ui/input";
import { DataTableFacetedFilter, FacetedFilter } from "@/components/ui/data-table/faceted-filter";

interface DataTableFiltersProps<TData> {
	table: Table<TData>
	globalFilter: string
	setGlobalFilter: React.Dispatch<React.SetStateAction<string>>
	facetedFilters?: FacetedFilter[]
}

export function DataTableFilters<TData>({
	table,
	globalFilter,
	setGlobalFilter,
	facetedFilters,
}: DataTableFiltersProps<TData>) {
	const isFiltered = table.getState().columnFilters.length > 0
	return (
		<div className="sm:flex items-center gap-2">
			<Input
				placeholder="Search..."
				value={globalFilter}
				onChange={(e) => setGlobalFilter(e.target.value)}
				className="max-w-sm mb-4"
			/>
			{facetedFilters?.map((filter) => (
				<DataTableFacetedFilter
					key={filter.key}
					column={table.getColumn(filter.key)}
					title={filter.title}
					options={filter.options}
				/>
			))}
			{isFiltered && (
				<Button
					variant="ghost"
					onClick={() => table.resetColumnFilters()}
					className="h-8 px-2 lg:px-3"
				>
					Reset
					<X/>
				</Button>
			)}
		</div>
	)
}