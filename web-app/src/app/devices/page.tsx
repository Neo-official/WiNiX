'use client'

import React, { useEffect, useMemo, useState } from 'react'
import type { ColumnDef } from '@tanstack/react-table'
import { Device, DeviceArea, DeviceProduct, DeviceStatus, ErrorMessage } from '@/types'
import { storage } from '@/lib/utils/storage'
import { Button } from '@/components/ui/button'
import { DataTable } from '@/components/ui/data-table'
import { TableActions } from '@/components/table-actions'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import { FacetedFilter } from "@/components/ui/data-table/faceted-filter";
import { Textarea } from "@/components/ui/textarea";
import { ArrowUpDown, MapPin, MapPinCheckInside, MapPinPlusInside } from "lucide-react";

import dynamic from "next/dynamic";
import { DeviceSelect } from "@/app/devices/device-select";
import { LMap } from "@/components/geo-map/types";
import { defaultCenter, defaultZoom } from "@/components/geo-map/commons";
import { DEVICES_KEY, ERROR_MESSAGES_KEY } from "@/lib/utils/db";
import config from "@/config";

const defaultColumnVisibility = {
	id         : false,
	bank       : true,
	name       : true,
	description: false,
	coordinates: false,
	status     : false,
	product    : false,
	area       : false,
	model      : false,
	city       : false,
	phone      : false,
	unit       : true,
	merchant   : true,
	address    : false,
	// irma         : false,
	// epp_key      : false,
	// software     : false,
	// mac_address  : false,
	// ip_address   : false,
	// ip_gateway   : false,
	// merchant_code: false,
	// terminal_id  : false,
	// serial_number: false,
}

const facetedFilters: FacetedFilter[] = ([
	['status', "Status", DeviceStatus, [MapPin, MapPinCheckInside, MapPinPlusInside]],
	['product', "Product", DeviceProduct, []],
	['area', "Area", DeviceArea, []],
] as const).map(([key, title, values, icons]) => ({
	key,
	title,
	options: Object.values(values).map((value, index) => ({
		label: value,
		value,
		icon : icons[index] ?? null,
	})),
}))


function ErrorMessagesPopup() {
	const [errorMessages, setErrorMessages] = useState<ErrorMessage[]>([])
	const [selectedErrMsg, setSelectedErrMsg] = useState<ErrorMessage | null>(null)

	useEffect(() => {
		const savedData = storage.get(ERROR_MESSAGES_KEY)
		if (savedData)
			setErrorMessages(savedData)
	}, [])

	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button variant="outline">
					{config.ROUTES.errorMessages.label}{' '}
					{errorMessages.length > 0 && (`(${errorMessages.length})`)}
				</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle>{config.ROUTES.errorMessages.label}</DialogTitle>
				</DialogHeader>
				{selectedErrMsg && (
					<div className="grid gap-4 py-4">
						{[
							['Code', 'code'],
							['Message', 'message'],
							['Remedy', 'remedy'],
						].map(([label, key]) => (
							<div key={key} className="flex items-center gap-4">
								{label}: {selectedErrMsg[key as keyof ErrorMessage]}
							</div>
						))}
					</div>
				)}
				<div className="grid grid-cols-10 gap-4 py-4">
					{errorMessages?.map((message, index) => (
						<Button variant="outline" onClick={() => setSelectedErrMsg(message)}>{message.code}</Button>
					))}
				</div>
			</DialogContent>
		</Dialog>
	)
}

export default function Devices() {
	// @ts-ignore
	const [map, setMap] = useState<LMap | null>(null)
	const [data, setData] = useState<Device[]>([])
	const [editingItem, setEditingItem] = useState<Device | null>(null)
	const CustomMap = useMemo(() => dynamic(() => import("@/components/geo-map").then(x => x.CustomMap), {ssr: false}), [])
	const MapEditor = useMemo(() => dynamic(() => import("@/components/geo-map").then(x => x.MapEditor), {ssr: false}), [])


	useEffect(() => {
		const savedData = storage.get(DEVICES_KEY)
		setData(savedData)
	}, [])

	const columns: ColumnDef<Device, keyof Device>[] = [
		{
			id           : "select",
			header       : ({table}) => (
				<Checkbox
					checked={
						table.getIsAllPageRowsSelected() ||
						(table.getIsSomePageRowsSelected() && "indeterminate")
					}
					onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
					aria-label="Select all"
					className="translate-y-[2px]"
				/>
			),
			cell         : ({row}) => (
				<Checkbox
					checked={row.getIsSelected()}
					onCheckedChange={(value) => row.toggleSelected(!!value)}
					aria-label="Select row"
					className="translate-y-[2px]"
				/>
			),
			enableSorting: false,
			enableHiding : false,
		},
		{
			accessorKey: 'id',
			header     : ({column}) => {
				return (
					<Button
						variant="ghost"
						className="px-2 rounded"
						onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
					>
						ID
						<ArrowUpDown/>
					</Button>
				)
			},
			cell       : ({row}) => (
				<div className="flex items-center gap-3">
					<Button
						variant="link"
						className="p-0 capitalize"
						onClick={() => {
							setEditingItem(row.original)
						}}
					>
						#{row.original.id}
					</Button>
				</div>
			),
		},
		{
			accessorKey: 'bank',
			header     : ({column}) => (
				<Button
					variant="ghost"
					className="px-2 rounded"
					onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
				>
					Bank
					<ArrowUpDown/>
				</Button>
			),
		},
		{
			accessorKey: 'city',
			header     : ({column}) => (
				<Button
					variant="ghost"
					className="px-2 rounded"
					onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
				>
					City
					<ArrowUpDown/>
				</Button>
			),
		},
		{
			accessorKey: 'name',
			header     : ({column}) => (
				<Button
					variant="ghost"
					className="px-2 rounded"
					onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
				>
					Name
					<ArrowUpDown/>
				</Button>
			),
			cell       : ({row}) => (
				<div className="flex items-center gap-3">
					{/* row.original.product && <Badge variant="outline" className={'uppercase'}>{row.original.product}</Badge> */}
					<Button
						variant="link"
						className="p-0 capitalize"
						onClick={() => {
							setEditingItem(row.original)
						}}
					>
						{row.original.name}
					</Button>
				</div>
			),
		},
		{
			accessorKey: 'description',
			header     : 'Description',
			cell       : ({row}) => (
				<pre className="flex items-center gap-3 w-64 overflow-hidden truncate">
					{row.original.description}
				</pre>
			),
		},
		{
			accessorKey: 'coordinates',
			header     : 'Coordinates',
			cell       : ({row}) => (
				<div className="flex items-center">
					<Button
						variant="link"
						className="p-0 text-info-500"
						onClick={() => {
							const [lat, lng] = row.original.coordinates
							.split(',')
							.map(coord => parseFloat(coord.trim()))
							map!.setView([lat, lng], defaultZoom + 3)
						}}
					>
						{row.original.coordinates
						.split(',')
						.map(coord => parseFloat(coord.trim()).toFixed(5))
						.join(', ')}
					</Button>
				</div>
			),
		},
		{
			accessorKey: 'status',
			header     : ({column}) => (
				<Button
					variant="ghost"
					className="px-2 rounded"
					onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
				>
					Status
					<ArrowUpDown/>
				</Button>
			),
			cell       : ({row}) => (
				<div className="flex items-center gap-3">
					<div className="flex items-center">
						<DeviceSelect<DeviceStatus>
							value={row.original.status}
							onChange={(status) => {
								const updatedItem = {
									...row.original,
									status,
								}
								handleEdit(updatedItem)
							}}
							source={DeviceStatus}
						/>
					</div>
				</div>
			),
		},
		{
			accessorKey: 'product',
			header     : ({column}) => (
				<Button
					variant="ghost"
					className="px-2 rounded"
					onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
				>
					Product
					<ArrowUpDown/>
				</Button>
			),
			cell       : ({row}) => (
				<div className="flex items-center gap-3">
					<DeviceSelect<DeviceProduct>
						value={row.original.product}
						onChange={(product) => {
							const updatedItem = {
								...row.original,
								product,
							}
							handleEdit(updatedItem)
						}}
						source={DeviceProduct}
					/>
				</div>
			),
		},
		{
			accessorKey: 'area',
			header     : ({column}) => (
				<Button
					variant="ghost"
					className="px-2 rounded"
					onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
				>
					Area
					<ArrowUpDown/>
				</Button>
			),
			cell       : ({row}) => (
				<div className="flex items-center gap-3">
					<DeviceSelect<DeviceArea>
						value={row.original.area}
						onChange={(area) => {
							const updatedItem = {
								...row.original,
								area,
							}
							handleEdit(updatedItem)
						}}
						source={DeviceArea}
					/>
				</div>
			),
		},
		{accessorKey: 'model', header: 'Model'},
		{accessorKey: 'phone', header: 'Phone'},
		{accessorKey: 'unit', header: 'Unit'},
		{accessorKey: 'merchant', header: 'Merchant'},
		{accessorKey: 'address', header: 'Address'},
		// {accessorKey: 'irma', header: 'Irma'},
		// {accessorKey: 'epp_key', header: 'Epp Key'},
		// {accessorKey: 'software', header: 'Software'},
		// {accessorKey: 'mac_address', header: 'Mac Address'},
		// {accessorKey: 'ip_address', header: 'IP Address'},
		// {accessorKey: 'ip_gateway', header: 'IP Gateway'},
		// {accessorKey: 'merchant_code', header: 'Merchant Code'},
		// {accessorKey: 'terminal_id', header: 'Terminal ID'},
		// {accessorKey: 'serial_number', header: 'Serial Number'},
		{
			id          : 'actions',
			header      : 'Actions',
			cell        : ({row}) => (
				<TableActions
					onEdit={() => setEditingItem(row.original)}
					onDelete={() => handleDelete([row.original])}
				/>
			),
			enableHiding: false,
		},
	]

	const handleAdd = () => {
		const newId = Math.max(...data.map(item => item.id), 0) + 1
		const newItem: Device = {
			id             : newId,
			bank           : '',
			name           : '',
			description    : '',
			coordinates    : defaultCenter.join(','),
			status         : DeviceStatus.PENDING,
			product        : DeviceProduct.ATM,
			area           : DeviceArea.CENTER,
			model          : '',
			city           : '',
			phone          : '',
			unit           : '',
			merchant       : '',
			address        : '',
			irma           : '',
			epp_key        : '',
			software       : '',
			mac_address    : '',
			ip_address     : '',
			ip_gateway     : '',
			merchant_code  : '',
			terminal_id    : '',
			serial_number  : '',
			os             : '',
			connection_type: '',
		}
		// const newData = [...data, newItem]
		// setData(newData)
		// storage.set(STORAGE_KEY, newData)
		setEditingItem(newItem)
	}

	const handleEdit = (updatedItem: Device) => {
		const index = data.findIndex(item => item.id === updatedItem.id)
		const newData =
				  index !== -1
					  ? [...data.slice(0, index), updatedItem, ...data.slice(index + 1)]
					  : [...data, updatedItem]
		setData(newData)
		storage.set(DEVICES_KEY, newData)
		setEditingItem(null)
	}

	const handleDelete = (selectedData: Device[]) => {
		// const newData = data.filter(item => item.id !== id)
		// setData(newData)
		// storage.set(STORAGE_KEY, newData)
		const newData = data.filter(item => !selectedData.includes(item))
		setData(newData)
		storage.set(DEVICES_KEY, newData)
	}

	return (
		<div className="container mx-auto py-2">
			<CustomMap
				data={data}
				onCoordinateSelect={(device, force) =>
					force ?
						handleEdit(device) :
						setEditingItem(device)}
				setMap={setMap}
			/>
			<DataTable<Device, keyof Device>
				// title={config.ROUTES.devices.label}
				title={<ErrorMessagesPopup/>}
				columns={columns}
				data={data}
				onAdd={handleAdd}
				defaultColumnVisibility={defaultColumnVisibility}
				facetedFilters={facetedFilters}
				onImport={data => {
					setData(data)
					storage.set(DEVICES_KEY, data)
				}}
				onDelete={handleDelete}
				importFilename={DEVICES_KEY}
			/>
			<Dialog open={!!editingItem} onOpenChange={() => setEditingItem(null)}>
				<DialogContent className="max-w-3xl max-h-full overflow-auto">
					<DialogHeader>
						<DialogTitle>
							{editingItem?.id ? 'Edit System' : 'Add System'}
						</DialogTitle>
					</DialogHeader>
					{editingItem && (
						<div className="space-y-4">
							<div className="grid w-full items-center gap-1.5">
								<Label htmlFor="name">Name</Label>
								<Input
									id="name"
									value={editingItem.name}
									onChange={(e) => setEditingItem(prv => ({
										...prv as Device,
										name: e.target.value,
									}))}
								/>
							</div>
							<div className="grid w-full items-center gap-1.5">
								<Label htmlFor="description">Description</Label>
								<Textarea
									id="description"
									rows={3}
									placeholder="Type your description here."
									value={editingItem.description}
									onChange={(e) => setEditingItem(prv => ({
										...prv as Device,
										description: e.target.value,
									}))}
								/>
							</div>
							<div className="grid grid-cols-2 gap-4">
								{([
									['product', 'Product', DeviceProduct],
									['area', 'Area', DeviceArea],

								] as const).map(([key, label, source]) => (
									<div key={key} className="grid w-full items-center gap-1.5">
										<Label htmlFor={key}>{label}</Label>
										<DeviceSelect<typeof source>
											value={((editingItem as Device)[key as keyof Device]) as any}
											onChange={(value) => setEditingItem(prv => ({
												...prv as Device,
												[key as keyof Device]: value,
											}))}
											source={source}
										/>
									</div>
								))}
							</div>
							<div className="grid grid-cols-2 gap-4">
								{([
									['bank', 'Bank'],
									['model', 'Model'],
									['unit', 'Unit'],
									['merchant', 'Merchant'],
									['irma', 'Irma'],
									['epp_key', 'Epp Key'],
									['software', 'Software'],
									['os', 'OS'],
									['connection_type', 'Connection Type'],
									['mac_address', 'Mac Address'],
									['ip_address', 'IP Address'],
									['ip_gateway', 'IP Gateway'],
									['merchant_code', 'Merchant Code'],
									['terminal_id', 'Terminal ID'],
									['serial_number', 'Serial Number'],
									['phone', 'Phone'],
									['address', 'Address'],
									['city', 'City'],
								] as const).map(([key, label]) => (
									<div key={key} className="grid w-full items-center gap-1.5">
										<Label htmlFor={key}>{label}</Label>
										<Input
											id={key}
											value={(editingItem as Device)[key as keyof Device]}
											onChange={(e) => setEditingItem(prv => ({
												...prv as Device,
												[key as keyof Device]: e.target.value,
											}))}
										/>
									</div>
								))}
							</div>
							<div className="grid w-full items-center gap-1.5">
								<Label>Coordinates</Label>
								<Input
									id="coordinates"
									value={editingItem.coordinates}
									onChange={(e) => setEditingItem(prv => ({
										...prv as Device,
										coordinates: e.target.value,
									}))}
								/>
								<MapEditor
									editingItem={editingItem}
									setEditingItem={setEditingItem}
								/>
							</div>
							<div className="flex items-center space-x-2">
								<span className="w-[100px]">Status:</span>
								<DeviceSelect<DeviceStatus>
									value={editingItem.status}
									onChange={(status) => setEditingItem(prv => ({
										...prv as Device,
										status,
									}))}
									source={DeviceStatus}
								/>
							</div>
							<div className="flex justify-end space-x-2">
								<Button
									variant="outline"
									onClick={() => setEditingItem(null)}
								>
									Cancel
								</Button>
								<Button color={'primary'} onClick={() => handleEdit(editingItem as Device)}>
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
