import { Button, ButtonProps } from "@/components/ui/button";
import React from "react";
import { importData } from "@/lib/utils/storage";
import { readFileContent } from "@/lib/utils";

type ImportButtonProps<TData> = {
	onImport?: (data: TData[]) => void
} & ButtonProps

export function ImportButton<TData>({onImport, ...props}: ImportButtonProps<TData>) {
	function handleImport() {
		const input = document.createElement('input');
		input.type = 'file';
		input.accept = '.csv,.json,.xlsx';

		input.onchange = async (e) => {
			const file = (e.target as HTMLInputElement).files?.[0];
			if (!file) return;

			try {
				const content = await readFileContent(file);

				let importedData;
				switch (file.type) {
					case 'application/json':
						try {
							importedData = importData.fromJSON(content)
							if (!Array.isArray(importedData)) {
								throw new Error('Imported JSON must be an array');
							}
						}
						catch (error) {
							console.error('Invalid JSON format:', error);
							return;
						}
						break;
					case 'text/csv':
						try {
							importedData = importData.fromCSV(content)
							if (!Array.isArray(importedData)) {
								throw new Error('Imported CSV must be an array');
							}
						}
						catch (error) {
							console.error('Invalid CSV format:', error);
							return;
						}
						break;
					case 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet':
						try {
							importedData = importData.fromExcel(content)
							if (!Array.isArray(importedData)) {
								throw new Error('Imported Excel must be an array');
							}
						}
						catch (error) {
							console.error('Invalid Excel format:', error);
							return;
						}
						break
					default:
						console.error('Unsupported file type');
						return;
				}

				// Validate imported data
				const validData = importedData.filter(item =>
					item.name &&
					item.coordinates &&
					!isNaN(item.id),
				);

				if (validData.length === 0) {
					console.error('No valid data found in import');
					return;
				}
				// const newData = [...data, ...validData];
				onImport?.(validData);

				console.log(`Successfully imported ${validData.length} items`);

			}
			catch (error) {
				console.error('Error processing file:', error);
			}
		};

		input.click();
	}

	return (
		<Button variant="outline" onClick={handleImport} {...props}>Import</Button>
	)
}