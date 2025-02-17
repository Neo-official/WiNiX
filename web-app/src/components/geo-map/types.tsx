import { MapContainerProps } from "react-leaflet";
import { Map as LeafletMap } from "leaflet";
import { Device } from "@/types";

export type LMap = MapContainerProps & LeafletMap

export interface MapProps {
	onCoordinateSelect: (device: Device, force?: boolean) => void
	data: Array<Device>
	setMap: (map: LMap) => void
}

export type MapCenterProp = {
	data: Device[]
}

export interface MapEditorProps {
	editingItem: Device
	setEditingItem: (item: Device) => void
}