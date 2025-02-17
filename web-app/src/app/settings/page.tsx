"use client"

import { storage, importData, exportData } from "@/lib/utils/storage";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, Upload } from "lucide-react";
import { readFileContent } from "@/lib/utils";

export default function Settings() {
	function handleExport() {
		const tables = Object.keys(localStorage).map(table => [table, storage.get(table)]);
		const data = Object.fromEntries(tables);
		exportData.toJSON(data, 'db')
	}

	function handleImport() {
		const input = document.createElement("input");
		input.type = "file";
		input.accept = ".json";
		input.onchange = async (e) => {
			const file = (e.target as HTMLInputElement).files?.[0];
			if (!file) return;

			try {
				const content = await readFileContent(file);

				let importedData;
				switch (file.type) {
					case 'application/json':
						try {
							importedData = [importData.fromJSON(content)]
							if (!Array.isArray(importedData))
								throw new Error('Imported JSON must be an array');

						}
						catch (error) {
							console.error('Invalid JSON format:', error);
							return;
						}
						break;
					default:
						console.error('Unsupported file type');
						return;
				}
				const tables = importedData
				tables.forEach((table: any) => {
					Object.entries(table).forEach(([key, value]) => {
						storage.set(key, value);
					});
				});

				console.log(`Successfully imported ${tables.length} items`);
			}
			catch (error) {
				console.error('Error processing file:', error);
			}
		};
		input.click();
	}

	return (
		<div className="flex flex-col items-center justify-center gap-4 pt-16 mx-4">
			<Card className={"max-w-3xl w-full"}>
				<CardHeader>
					<CardTitle>Settings</CardTitle>
				</CardHeader>
				<CardContent className="flex gap-4">
					<div className={"flex items-center gap-2"}>
						Database:
						<Button color="primary" onClick={handleImport}>
							<Download/>
							Import
						</Button>
						<Button color="primary" onClick={handleExport}>
							<Upload/>
							Export
						</Button>
					</div>
				</CardContent>
			</Card>
		</div>
	)
}