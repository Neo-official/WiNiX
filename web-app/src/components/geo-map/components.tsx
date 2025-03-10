import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Device, DeviceStatus } from "@/types";
import { divIcon, LatLng, point } from "leaflet";
import { colors, defaultCenter, defaultZoom, icons } from "@/components/geo-map/commons";
import { MapCenterProp, MapProps } from "@/components/geo-map/types";
import { Marker, Popup, Tooltip, useMap, useMapEvents } from "react-leaflet";
import { RotateCcw, LocateFixed, Maximize2, Minimize2 } from "lucide-react";
import { DeviceSelect } from "@/app/devices/device-select";
import 'leaflet.fullscreen';
import 'leaflet.fullscreen/Control.FullScreen.css';

export const createClusterCustomIcon = (device: Device) => divIcon({
	html: `<div class="bg-primary-500 w-8 h-8">${icons[device.status]}</div>`,
	// @ts-ignore
	className : device.status === DeviceStatus.BROKEN ? colors[device.status] : colors[(device.area in colors ? device.area : 'default') as string],
	iconSize  : point(40, 40, true),
	iconAnchor: point(20, 20, true),
});

export function MapCenter({
	// data
}: MapCenterProp) {
	const coordinates =
			  // 0 < data.length ?
			  //   calculateAverageCoordinates(data) :
			  defaultCenter;
	const map = useMap()
	const [location, setLocation] = useState(map.getCenter())
	const {lat, lng} = location
	const text = `${lat.toFixed(4)}, ${lng.toFixed(5)}`
	useMapEvents({
		move(event) {
			setLocation(event.target.getCenter())
		},
		zoom(event) {
			setLocation(event.target.getCenter())
		},
	})
	// @ts-ignore
	return (
		<Button
			variant="ghost"
			color="transparent"
			className={`absolute left-2 bottom-2 z-[1] bg-white text-black rounded px-2 py-1 border-2 border-neutral-400`}
			onClick={() => map!.flyTo(coordinates, defaultZoom)}
		>
			<RotateCcw/>
			{text}
		</Button>
	)
}

const CoordinatesLink = ({coordinates}: { coordinates: string }) => {
	const getMapUrls = (coords: string) => {
		try {
			const [lat, lon] = coords.split(',').map(coord => coord.trim());

			return {
				// Universal format (works on Android)
				geo: `geo:${lat},${lon}?q=${lat},${lon}`,
				// Apple Maps (works on iOS)
				apple: `maps://maps.apple.com/?ll=${lat},${lon}&q=${lat},${lon}`,
				// Google Maps (fallback for browsers)
				google: `https://www.google.com/maps?q=${lat},${lon}`,
			};
		}
		catch {
			return null;
		}
	};

	const handleClick = (e: React.MouseEvent) => {
		e.preventDefault();
		const urls = getMapUrls(coordinates);

		if (!urls || typeof window === "undefined") return;

		// Try opening in native map app first
		window!.location.href = urls.geo;

		// Fallback timer for desktop browsers
		setTimeout(() => {
			if (typeof window === "undefined") return
			// If geo: link didn't work, try Apple Maps on iOS
			if (navigator.platform.indexOf('iPhone') !== -1 ||
				navigator.platform.indexOf('iPad') !== -1 ||
				navigator.platform.indexOf('iPod') !== -1) {
				window!.location.href = urls.apple;
			}
			else {
				// Fallback to Google Maps in browser
				window!.open(urls.google, '_blank');
			}
		}, 500);
	};

	return (
		<div className="flex items-center gap-2">
			<span className="font-bold">Coordinates:</span>
			<Button
				onClick={handleClick}
				variant="link"
				title="Open in Maps"
			>
				Open in Maps
			</Button>
		</div>
	);
};

export function CustomMarker({
	device,
	onCoordinateSelect,
}: { device: Device, onCoordinateSelect: MapProps['onCoordinateSelect'] }) {
	const map = useMap();
	const [lat, lng] = device.coordinates.split(',').map(coord => parseFloat(coord.trim()))
	const position: [number, number] = [lat || defaultCenter[0], lng || defaultCenter[1]]
	return (
		<Marker
			key={device.id}
			icon={createClusterCustomIcon(device)}
			position={position}
		>
			<Popup>
				<Button variant="link" onClick={() => onCoordinateSelect(device)} className="m-0 p-0">
					#{device.id} - {device.name}
				</Button>
				<div className="flex flex-col gap-2">
					<CoordinatesLink coordinates={device.coordinates}/>
					<div className={'flex item-center'}>
						<span className="font-bold me-2">Status:</span>
						<DeviceSelect<DeviceStatus>
							value={device.status}
							onChange={(status) => {
								const updatedDevice = {
									...device,
									status,
								};
								onCoordinateSelect(updatedDevice, true);
							}}
							source={DeviceStatus}
						/>

					</div>
				</div>
				<Button variant="link" onClick={() => map.setView(position, 18)} className="m-0 p-0">
					Zoom in
				</Button>
			</Popup>
			<Tooltip sticky>
				<span className="text-lg font-bold">
					#{device.id} - {device.name}
				</span>
			</Tooltip>
		</Marker>
	)
}


export function UserCurrentLocation() {
	const [position, setPosition] = useState<any>(null)
	const map = useMapEvents({
		locationfound(e) {
			setPosition(e.latlng)
			map.flyTo(e.latlng, map.getZoom())
		},
	})

	useEffect(() => {
		let watchId = 0

		function showPosition(position: any) {
			const pos = new LatLng(position.coords.latitude, position.coords.longitude)
			setPosition(pos)
			// map.flyTo(pos, map.getZoom())
		}

		if (navigator.geolocation) {
			watchId = navigator.geolocation.watchPosition(
				showPosition,
				err => console.error(err.code, err.message),
				{enableHighAccuracy: true, timeout: 60000, maximumAge: 600000},
			);
		}
		else {
			console.log('Geolocation is not supported by this browser.')
		}

		return () => {
			navigator.geolocation.clearWatch(watchId)
		}
	}, [])


	return (
		<>
			{position === null ? null : (
				<Marker position={position}>
					<Popup>You are here</Popup>
				</Marker>
			)}
			<Button
				variant="link"
				className="absolute right-2 bottom-2 z-[1] bg-white text-black rounded px-2 py-1 border-2 border-neutral-400"
				onClick={() => {
					map.locate()
				}}
			>
				<LocateFixed/>
			</Button>
		</>
	)
}


// export function FullscreenControl() {
// 	const map = useMap();
//
// 	useEffect(() => {
// 		// @ts-ignore (since TypeScript doesn't know about the fullscreen control)
// 		const fullscreenControl = new Control.Fullscreen({
// 			position: 'topright',
// 			title   : {
// 				'false': 'View Fullscreen',
// 				'true' : 'Exit Fullscreen',
// 			},
// 		});
//
// 		map.addControl(fullscreenControl);
//
// 		// Cleanup on unmount
// 		return () => {
// 			map.removeControl(fullscreenControl);
// 		};
// 	}, [map]);
//
// 	const toggleFullscreen = () => {
// 		if (map.isFullscreen()) {
// 			map.toggleFullscreen();
// 		}
// 		else {
// 			map.toggleFullscreen();
// 		}
// 	};
//
// 	return (
// 		<Button
// 			variant="link"
// 			className="absolute right-2 top-2 z-[1] bg-white text-black rounded px-2 py-1 border-2 border-neutral-400"
// 			onClick={toggleFullscreen}
// 		>
// 			Fullscreen
// 		</Button>
// 	);
// }


export function FullscreenControl() {
	const map = useMap();
	const [isFullscreen, setIsFullscreen] = useState(false);

	const toggleFullscreen = () => {
		// @ts-ignore
		if (!document.fullscreenElement) {
			const container = map.getContainer();
			if (container.requestFullscreen) {
				container.requestFullscreen()
				.then(() => {
					map.invalidateSize();
				});
				// if (map) {
				// 	setTimeout(() => {
				// 		map.invalidateSize();
				// 	}, 100);
				// }
				setIsFullscreen(true)
			}
		}
		else {
			if (document.exitFullscreen) {
				document.exitFullscreen()
				.then(() => {
					map.invalidateSize();
				});
				setIsFullscreen(false)
			}
		}
	};

	return (
		<Button
			variant="link"
			className="absolute left-2 bottom-12 z-[1] bg-white text-black rounded px-2 py-1 border-2 border-neutral-400"
			onClick={toggleFullscreen}
		>
			{isFullscreen ? <Minimize2/> : <Maximize2/>}
		</Button>
	);
}
