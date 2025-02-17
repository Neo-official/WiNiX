"use client"
import { DeviceStatus } from "@/types";
import React from "react";

import 'leaflet/dist/leaflet.css'
import 'leaflet-defaulticon-compatibility'
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css'
import { MapEditorProps, MapProps } from "@/components/geo-map/types";
import { defaultCenter, defaultZoom } from "@/components/geo-map/commons";
import { createClusterCustomIcon, CustomMarker, MapCenter, UserCurrentLocation } from "@/components/geo-map/components";
import { LayerGroup, LayersControl, MapContainer, Marker, TileLayer, useMapEvents } from "react-leaflet";
import { calculateAverageCoordinates } from "@/components/geo-map/utils";

export const CustomMap = ({data, onCoordinateSelect, setMap}: MapProps) => {
	// Parse coordinates string to [lat, lng]
	const coordinates = data.length > 0 ?
		calculateAverageCoordinates(data).toString()
		: defaultCenter.join(',')
	const [lat, lng] = coordinates.split(',').map(coord => parseFloat(coord.trim()))
	const defaultPosition: [number, number] = [lat || defaultCenter[0], lng || defaultCenter[1]]
	return (
		<MapContainer
			center={defaultPosition}
			zoom={defaultZoom}
			maxZoom={18}
			className="h-[320px] w-full relative"
			ref={setMap}
		>
			<TileLayer
				url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
				attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
			/>
			<MapCenter data={data}/>
			<UserCurrentLocation />

			{/* Main marker for the selected location */}
			{/*<Marker position={defaultPosition}>*/}
			{/*	<Popup>*/}
			{/*		Selected Location*/}
			{/*	</Popup>*/}
			{/*</Marker>*/}
			{data
			.filter(device => device.status === DeviceStatus.PENDING)
			.map((device) => (
				<CustomMarker key={device.id} device={device} onCoordinateSelect={onCoordinateSelect}/>
			))}
			<LayersControl position="topright">
				<LayersControl.Overlay checked name="Show Done Devices">
					<LayerGroup>
						{data
						.filter(device => device.status === DeviceStatus.DONE)
						.map((device) => (
							<CustomMarker key={device.id} device={device} onCoordinateSelect={onCoordinateSelect}/>
						))}
					</LayerGroup>
				</LayersControl.Overlay>
				<LayersControl.Overlay checked name="Show Broken Devices">
					<LayerGroup>
						{data
						.filter(device => device.status === DeviceStatus.BROKEN)
						.map((device) => (
							<CustomMarker key={device.id} device={device} onCoordinateSelect={onCoordinateSelect}/>
						))}
					</LayerGroup>
				</LayersControl.Overlay>
			</LayersControl>
		</MapContainer>
	)
}

export const MapEditor = ({editingItem, setEditingItem}: MapEditorProps) => {
	// Parse coordinates string to [lat, lng]
	const [lat, lng] = editingItem.coordinates.split(',').map(coord => parseFloat(coord.trim()))
	const defaultPosition: [number, number] = [lat || defaultCenter[0], lng || defaultCenter[1]]
	const isEditing = !!editingItem
	const LocationMarker = ({onCoordinateSelect}: { onCoordinateSelect: (coord: any) => void }) => {
		useMapEvents({
			click(e) {
				const {lat, lng} = e.latlng
				onCoordinateSelect(`${lat},${lng}`)
			},
		})
		return null
	}
	return (
		<MapContainer
			center={defaultPosition}
			zoom={13}
			style={{height: '400px', width: '100%', zIndex: 0}}
		>
			<TileLayer
				url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
				attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
			/>
			<MapCenter data={[editingItem]}/>

			{/* Enable clicking on map when editing */}
			{isEditing && (
				<LocationMarker
					onCoordinateSelect={(coords) => setEditingItem({
						...editingItem,
						coordinates: coords,
					})}
				/>
			)}

			{/* Show current location marker */}
			{editingItem.coordinates && (
				<Marker position={defaultPosition} icon={createClusterCustomIcon(editingItem)}/>
			)}

		</MapContainer>
	)
}