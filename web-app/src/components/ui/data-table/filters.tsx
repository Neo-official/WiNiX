"use client"

import { Table } from "@tanstack/react-table"
import { X } from "lucide-react"

import { Button } from "@/components/ui/button"
import React from "react";
import { Input } from "@/components/ui/input";
import { DataTableFacetedFilter, FacetedFilter } from "@/components/ui/data-table/faceted-filter";

interface DataTableFiltersProps {
	globalFilter: string
	setGlobalFilter: React.Dispatch<React.SetStateAction<string>>
}

export function DataTableSearchFilter({
	globalFilter,
	setGlobalFilter,
}: DataTableFiltersProps) {
	return (
		<>
			<Input
				placeholder="Search..."
				value={globalFilter}
				onChange={(e) => setGlobalFilter(e.target.value)}
				className="max-w-sm"
			/>
		</>
	)
}

interface DataTableFacetedFiltersProps<TData>{
	table: Table<TData>
	facetedFilters?: FacetedFilter[]
}

export function DataTableFacetedFilters<TData> ({
	table,
	facetedFilters,
}: DataTableFacetedFiltersProps<TData>) {
	const isFiltered = table.getState().columnFilters.length > 0
	return (
		<>
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
		</>
	)
}