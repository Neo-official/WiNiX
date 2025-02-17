import { Table } from "@tanstack/react-table"
import { ChevronLeft, ChevronRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select"
import { cn } from "@/lib/utils";

type PageOption = {
	label: string
	value: number
}
interface DataTablePaginationProps<TData> {
	table: Table<TData>
	pageSizeOptions?: PageOption[]
}
// All, 5, 10, 15, 25, 50, 100
const defaultPageSizeOptions = [
	{label: 'All', value: Number.MAX_SAFE_INTEGER},
	{label: '5', value: 5},
	{label: '10', value: 10},
	{label: '15', value: 15},
	{label: '25', value: 25},
	{label: '50', value: 50},
	{label: '100', value: 100},
]
const TablePagination = ({table}: { table: Table<any> }) => {
	const currentPage = table.getState().pagination.pageIndex + 1;
	const pageCount = table.getPageCount();

	const generatePageNumbers = () => {
		const pages: (number | string)[] = [];
		const maxVisiblePages = 5;

		// Always show first page
		pages.push(1);

		if (currentPage > 3) {
			pages.push('...');
		}

		// Calculate start and end of current page range
		let start = Math.max(2, currentPage - 2);
		let end = Math.min(pageCount - 1, currentPage + 2);

		// Adjust range if at the start or end
		if (currentPage <= 3) {
			end = Math.min(maxVisiblePages, pageCount - 1);
		}
		if (currentPage >= pageCount - 2) {
			start = Math.max(2, pageCount - maxVisiblePages + 1);
		}

		// Add current range
		for (let i = start; i <= end; i++) {
			pages.push(i);
		}

		// Add ellipsis and last page if needed
		if (currentPage < pageCount - 2) {
			pages.push('...');
		}
		if (pageCount > 1) {
			pages.push(pageCount);
		}

		return pages;
	};

	return (
		<div className="flex flex-2 items-center justify-center gap-2 mx-auto">
			<Button
				variant="outline"
				className={cn(
					"h-8 w-8 p-0",
					"transition-colors duration-200",
					"hover:bg-muted/80",
				)}
				onClick={() => table.previousPage()}
				disabled={!table.getCanPreviousPage()}
			>
				<ChevronLeft className="h-4 w-4"/>
				<span className="sr-only">Previous page</span>
			</Button>

			<div className="hidden sm:flex items-center gap-1">
				{generatePageNumbers().map((page, idx) => {
					if (page === '...') {
						return (
							<div
								key={`ellipsis-${idx}`}
								className="px-2 text-muted-foreground select-none"
							>
								⋯
							</div>
						);
					}

					const pageNumber = page as number;
					return (
						<Button
							key={pageNumber}
							variant={"default"}
							color={currentPage === pageNumber ? "primary" : "default"}
							className={cn(
								"h-8 min-w-[2rem] p-0",
								"transition-all duration-200",
								currentPage === pageNumber && [
									"pointer-events-none",
									"font-medium",
								],
								currentPage !== pageNumber && [
									"hover:bg-muted/80",
								],
							)}
							onClick={() => table.setPageIndex(pageNumber - 1)}
						>
							{pageNumber}
						</Button>
					);
				})}
			</div>

			<Button
				variant="outline"
				className={cn(
					"h-8 w-8 p-0",
					"transition-colors duration-200",
					"hover:bg-muted/80",
				)}
				onClick={() => table.nextPage()}
				disabled={!table.getCanNextPage()}
			>
				<ChevronRight className="h-4 w-4"/>
				<span className="sr-only">Next page</span>
			</Button>
		</div>
	);
};

export function DataTablePagination<TData>({
	table,
	pageSizeOptions = defaultPageSizeOptions,
}: DataTablePaginationProps<TData>) {
	return (
		<div className="flex items-center justify-between">
			{table.getFilteredSelectedRowModel().rows.length > 0 && (
				<div className="flex-1 text-sm text-muted-foreground">
					{table.getFilteredSelectedRowModel().rows.length} of{" "}
					{table.getFilteredRowModel().rows.length} row
					{table.getFilteredRowModel().rows.length > 1 ? "s" : ""}
					{' selected.'}
				</div>
			)}
			<TablePagination table={table}/>
			<div className="flex items-center ml-2">
				<div className="flex items-center space-x-2">
					<p className="text-sm font-medium">Rows per page</p>
					<Select
						value={`${table.getState().pagination.pageSize}`}
						onValueChange={(value) => {
							table.setPageSize(Number(value))
						}}
					>
						<SelectTrigger className="h-8 w-[70px]">
							<SelectValue placeholder={table.getState().pagination.pageSize}/>
						</SelectTrigger>
						<SelectContent side="top">
							{pageSizeOptions?.map((pageOption: PageOption) => (
								<SelectItem key={pageOption.value} value={`${pageOption.value}`}>
									{pageOption.label}
								</SelectItem>
							))}
						</SelectContent>
					</Select>
				</div>
			</div>
		</div>
	)
}