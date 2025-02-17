import { Device } from "@/types";
import { latLng, LatLng } from "leaflet";

export const calculateAverageCoordinates = (
	data: Device[],
	[lat, lng]: [number, number] = [0, 0],
): LatLng => {
	const pendingDevices = data;

	if (pendingDevices.length === 0)
		return latLng({lat, lng});

	try {
		const [lat, lng] = pendingDevices
		.reduce((acc, device) => {
			try {
				const [lat, lng] = device.coordinates
				.split(/,\s*/)
				.map(coord => {
					const parsed = parseFloat(coord.trim());
					if (isNaN(parsed)) throw new Error('Invalid coordinate');
					return parsed;
				});

				return [acc[0] + lat, acc[1] + lng];
			}
			catch {
				console.warn(`Invalid coordinates found for device: ${device.id || 'unknown'}`);
				return acc;
			}
		}, [0, 0])
		.map(sum => (sum / pendingDevices.length))
		return latLng({lat, lng});
	}
	catch {
		return latLng({lat, lng});
	}
};