'use client'

import { useEffect, useState } from 'react'
import { DataTable } from '@/components/ui/data-table'
import type { ColumnDef } from '@tanstack/react-table'
import { Button } from '@/components/ui/button'
import { ErrorMessage } from '@/types'
import { storage } from '@/lib/utils/storage'
import { TableActions } from '@/components/table-actions'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from "@/components/ui/textarea";
import config from "@/config";
import { ERROR_MESSAGES_KEY } from "@/lib/utils/db";

export default function ErrorMessages() {
	const [data, setData] = useState<ErrorMessage[]>([])
	const [editingItem, setEditingItem] = useState<ErrorMessage | null>(null)

	useEffect(() => {
		const savedData = storage.get(ERROR_MESSAGES_KEY)
		setData(savedData)
	}, [])

	const columns: ColumnDef<ErrorMessage>[] = [
		{
			accessorKey: 'id',
			header     : 'ID',
		},
		{
			accessorKey: 'code',
			header     : 'Code',
		},
		{
			accessorKey: 'message',
			header     : 'Message',
		},
		{
			accessorKey: 'remedy',
			header     : 'Remedy',
		},
		{
			id    : 'actions',
			header: 'Actions',
			cell  : ({row}) => (
				<TableActions
					onEdit={() => setEditingItem(row.original)}
					onDelete={() => handleDelete(row.original.id)}
				/>
			),
		},
	]

	const handleAdd = () => {
		const newId = Math.max(...data.map(item => item.id), 0) + 1
		const newItem: ErrorMessage = {
			id     : newId,
			code   : '',
			message: '',
			remedy : '',
		}
		// const newData = [...data, newItem]
		// setData(newData)
		// storage.set(STORAGE_KEY, newData)
		setEditingItem(newItem)
	}

	const handleEdit = (updatedItem: ErrorMessage) => {
		const index = data.findIndex(item => item.id === updatedItem.id)
		const newData =
				  index !== -1
					  ? [...data.slice(0, index), updatedItem, ...data.slice(index + 1)]
					  : [...data, updatedItem]
		setData(newData)
		storage.set(ERROR_MESSAGES_KEY, newData)
		setEditingItem(null)
	}

	const handleDelete = (id: number) => {
		const newData = data.filter(item => item.id !== id)
		setData(newData)
		storage.set(ERROR_MESSAGES_KEY, newData)
	}

	return (
		<div className="container mx-auto py-10">
			<DataTable
				title={config.ROUTES.errorMessages.label}
				columns={columns}
				data={data}
				onAdd={handleAdd}
				onImport={data => {
					setData(data)
					storage.set(ERROR_MESSAGES_KEY, data)
				}}
				importFilename={ERROR_MESSAGES_KEY}
			/>

			<Dialog open={!!editingItem} onOpenChange={() => setEditingItem(null)}>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>
							{editingItem?.id ? 'Edit Error Message' : 'Add Error Message'}
						</DialogTitle>
					</DialogHeader>
					{editingItem && (
						<div className="space-y-4">
							{[
								['code', 'Code', 'text'],
								['message', 'Message', 'textarea'],
								['remedy', 'Remedy', 'textarea'],
							].map(([key, label, type]) => (
								<div key={key} className="grid w-full items-center gap-1.5">
									<Label htmlFor={key}>{label}</Label>
									{type === 'textarea' ? (
										<Textarea
											id={key}
											value={editingItem[key as keyof ErrorMessage]}
											rows={3}
											placeholder={`Type your ${label.toLowerCase()} here.`}
											onChange={(e) => setEditingItem({
												...editingItem,
												[key as keyof ErrorMessage]: e.target.value,
											})}
										/>
									) : (
										<Input
											id={key}
											value={editingItem[key as keyof ErrorMessage]}
											placeholder={`Type your ${label.toLowerCase()} here.`}
											onChange={(e) => setEditingItem({
												...editingItem,
												[key as keyof ErrorMessage]: e.target.value,
											})}
										/>
									)}
								</div>
							))}
							<div className="flex justify-end space-x-2">
								<Button
									variant="outline"
									onClick={() => setEditingItem(null)}
								>
									Cancel
								</Button>
								<Button color={'primary'} onClick={() => handleEdit(editingItem)}>
									Save Changes
								</Button>
							</div>
						</div>
					)}
				</DialogContent>
			</Dialog>
		</div>
	)
}
