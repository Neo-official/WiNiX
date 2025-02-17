import { saveAs } from 'file-saver'
import * as XLSX from 'xlsx'

export const storage = {
	get: (key: string) => {
		const data = localStorage.getItem(key)
		if (data) {
			try {
				return JSON.parse(data)
			}
			catch (e) {
				return data
			}
		}
		return []
	},
	set: (key: string, data: any) => {
		localStorage.setItem(key, JSON.stringify(data))
	},
}

export const exportData = {
	toJSON: (data: any[], filename: string) => {
		const blob = new Blob([JSON.stringify(data, null, 2)], {
			type: 'application/json',
		})
		saveAs(blob, `${filename}.json`)
	},

	toCSV: (data: any[], filename: string) => {
		const worksheet = XLSX.utils.json_to_sheet(data)
		const csvContent = XLSX.utils.sheet_to_csv(worksheet)
		const blob = new Blob([csvContent], {type: 'text/csv;charset=utf-8'})
		saveAs(blob, `${filename}.csv`)
	},

	toExcel: (data: any[], filename: string) => {
		const worksheet = XLSX.utils.json_to_sheet(data)
		const workbook = XLSX.utils.book_new()
		XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1')
		XLSX.writeFile(workbook, `${filename}.xlsx`)
	},
}

export const importData = {
	fromJSON : (content: ArrayBuffer) => {
		try {
			const text = new TextDecoder().decode(content)
			return JSON.parse(text)
		}
		catch (error) {
			console.error('Invalid JSON format:', error)
			return []
		}
	},
	fromCSV  : (content: ArrayBuffer) => {
		const workbook = XLSX.read(content, {type: 'array'})
		const sheetName = workbook.SheetNames[0]
		const worksheet = workbook.Sheets[sheetName]
		return XLSX.utils.sheet_to_json(worksheet)
	},
	fromExcel: (content: ArrayBuffer) => {
		console.log(content)
		const workbook = XLSX.read(content, {type: 'array'})
		const sheetName = workbook.SheetNames[0]
		return XLSX.utils.sheet_to_json(workbook.Sheets[sheetName])
	},
}
