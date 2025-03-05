'use client'

import * as React from "react"
import {
	Table as TableType,
	ColumnDef,
	ColumnFiltersState,
	SortingState,
	VisibilityState,
	flexRender,
	getCoreRowModel,
	getFacetedRowModel,
	getFacetedUniqueValues,
	getFilteredRowModel,
	getPaginationRowModel,
	getSortedRowModel,
	useReactTable,
} from "@tanstack/react-table"

import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table"
import { DataTablePagination } from "@/components/ui/data-table/pagination";
import { DataTableToolbar } from "@/components/ui/data-table/toolbar";
import { FacetedFilter } from "@/components/ui/data-table/faceted-filter";
import { ImportButton } from "@/components/importButton";
import { ExportMenu } from "@/components/export-menu";
import { Button } from "@/components/ui/button";

interface DataTableProps<TData, TValue> {
	title?: string | React.ReactNode
	columns: ColumnDef<TData, TValue>[]
	data: TData[]
	importFilename: string
	defaultColumnVisibility?: { [key: string]: boolean }
	facetedFilters?: FacetedFilter[]
	onAdd?: () => void
	onEdit?: (data: TData[]) => void
	onDelete?: (data: TData[]) => void
	onImport?: (data: TData[]) => void
}

export function DataTable<TData, TValue>({
	columns,
	data,
	facetedFilters,
	importFilename,
	defaultColumnVisibility,
	title = "",
	onImport,
	onAdd,
	onDelete,
}: DataTableProps<TData, TValue>) {
	const [rowSelection, setRowSelection] = React.useState({})
	const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>(defaultColumnVisibility ?? {})
	const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
	const [sorting, setSorting] = React.useState<SortingState>([])
	const [globalFilter, setGlobalFilter] = React.useState("")
	const [pagination, setPagination] = React.useState({pageIndex: 0, pageSize: 25})

	const table = useReactTable<TData>({
		data,
		columns,
		state                   : {
			sorting,
			columnVisibility,
			rowSelection,
			columnFilters,
			globalFilter,
			pagination,
		},
		onPaginationChange      : setPagination,
		enableRowSelection      : true,
		onRowSelectionChange    : setRowSelection,
		onSortingChange         : setSorting,
		onColumnFiltersChange   : setColumnFilters,
		onColumnVisibilityChange: setColumnVisibility,
		getCoreRowModel         : getCoreRowModel(),
		getFilteredRowModel     : getFilteredRowModel(),
		getPaginationRowModel   : getPaginationRowModel(),
		getSortedRowModel       : getSortedRowModel(),
		getFacetedRowModel      : getFacetedRowModel(),
		getFacetedUniqueValues  : getFacetedUniqueValues(),
	})

	return (
		<div className="space-y-4">
			<div className="flex justify-between items-center mb-4">
				<div className="text-2xl font-bold my-2">{title}</div>
				<div className="space-x-2 my-2">
					<ImportButton<TData> onImport={onImport}/>
					<ExportMenu data={data} filename={importFilename}/>
					<Button color="primary" onClick={onAdd}>Add New</Button>
				</div>
			</div>
			<DataTableToolbar {...{table, globalFilter, setGlobalFilter, facetedFilters, importFilename, onDelete}}/>
			<div className="rounded-md border">
				<Table>
					<TableHeader>
						{table.getHeaderGroups().map((headerGroup) => (
							<TableRow key={headerGroup.id}>
								{headerGroup.headers.map((header) => (
									<TableHead key={header.id} colSpan={header.colSpan}>
										{header.isPlaceholder
											? null
											: flexRender(
												header.column.columnDef.header,
												header.getContext(),
											)}
									</TableHead>
								))}
							</TableRow>
						))}
					</TableHeader>
					<TableBody>
						{table.getRowModel().rows?.length ? (
							table.getRowModel().rows.map((row) => (
								<TableRow
									key={row.id}
									data-state={row.getIsSelected() && "selected"}
								>
									{row.getVisibleCells().map((cell) => (
										<TableCell key={cell.id}>
											{flexRender(
												cell.column.columnDef.cell,
												cell.getContext(),
											)}
										</TableCell>
									))}
								</TableRow>
							))
						) : (
							<TableRow>
								<TableCell
									colSpan={columns.length}
									className="h-24 text-center"
								>
									No results.
								</TableCell>
							</TableRow>
						)}
					</TableBody>
				</Table>
			</div>
			<DataTablePagination<TData> table={table as TableType<TData>}/>
		</div>
	)
}
