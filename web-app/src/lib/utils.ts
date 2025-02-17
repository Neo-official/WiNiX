import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function readFileContent(file: File) {
	return new Promise<ArrayBuffer>((resolve, reject) => {
		const reader = new FileReader();
		reader.onload = (e) => resolve(e.target?.result as ArrayBuffer);
		reader.onerror = () => reject(new Error('Error reading file'));
		reader.readAsArrayBuffer(file);
	});
}