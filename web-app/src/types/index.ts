// app/types/index.ts
export type WorkTime = {
	id: number
	work_start: number
	work_end: number
	mission_start: number
	mission_end: number
}

export type ErrorMessage = {
	id: number
	code: string
	message: string
	remedy: string
}

export enum DeviceStatus {
	DONE    = 'done',
	PENDING = 'visit',
	BROKEN  = 'ticket',
}

export enum DeviceProduct {
	ATM   = 'atm',
	KIOSK = 'kiosk',
	VNB   = 'vnb',
	VSAT  = 'vsat',
}

export enum DeviceArea {
	NORTH   = 'شمال',
	CENTER  = 'مركز',
	SOUTH   = 'جنوب',
	AZNA    = 'ازنا',
	BROJERD = 'بروجرد',
	NULL    = 'تعریف نشده',
	// WEST    = 'west',
	// EAST    = 'east',
}

export type Device = {
	id: number
	bank: string
	name: string
	description: string
	coordinates: string
	status: DeviceStatus
	product: DeviceProduct
	area: DeviceArea
	model: string
	city: string
	phone: string
	unit: string
	merchant: string
	address: string
	irma: string
	epp_key: string
	software: string
	mac_address: string
	ip_address: string
	ip_gateway: string
	os: string
	connection_type: string
	merchant_code: string
	terminal_id: string
	serial_number: string

}
