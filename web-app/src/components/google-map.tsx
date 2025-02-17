'use client'

import { useEffect, useRef, useState } from 'react'
import { Button } from './ui/button'

interface MapProps {
  coordinates: string
  onCoordinateSelect: (coords: string) => void
  isEditing?: boolean
  pendingDevices?: Array<{ coordinates: string }>
}

declare global {
  interface Window {
    google: typeof google
  }
}

const DEFAULT_CENTER = { lat: 0, lng: 0 }

const isValidCoordinates = (lat: number, lng: number) => {
  return !isNaN(lat) && !isNaN(lng) &&
         lat >= -90 && lat <= 90 &&
         lng >= -180 && lng <= 180
}

export function GoogleMap({ coordinates, onCoordinateSelect, isEditing, pendingDevices = [] }: MapProps) {
  const mapRef = useRef<HTMLDivElement>(null)
  const [map, setMap] = useState<google.maps.Map | null>(null)
  const [marker, setMarker] = useState<google.maps.Marker | null>(null)
  const [pendingMarkers, setPendingMarkers] = useState<google.maps.Marker[]>([])

  // Initialize map
  useEffect(() => {
    if (!window.google || !mapRef.current) return

    let initialCenter = DEFAULT_CENTER

    if (coordinates) {
      const [lat, lng] = coordinates.split(',').map(Number)
      if (isValidCoordinates(lat, lng)) {
        initialCenter = { lat, lng }
      }
    }

    const mapInstance = new window.google.maps.Map(mapRef.current, {
      center: initialCenter,
      zoom: 12,
      mapTypeControl: true,
      streetViewControl: false,
      fullscreenControl: true,
      zoomControl: true,
      styles: [
        {
          featureType: "poi",
          elementType: "labels",
          stylers: [{ visibility: "off" }],
        },
      ],
    })

    setMap(mapInstance)

    // Create marker if coordinates exist and are valid
    if (coordinates) {
      const [lat, lng] = coordinates.split(',').map(Number)
      if (isValidCoordinates(lat, lng)) {
        const newMarker = new window.google.maps.Marker({
          position: { lat, lng },
          map: mapInstance,
          draggable: isEditing,
          animation: window.google.maps.Animation.DROP,
        })
        setMarker(newMarker)

        if (isEditing) {
          newMarker.addListener('dragend', () => {
            const position = newMarker.getPosition()
            if (position) {
              onCoordinateSelect(`${position.lat()},${position.lng()}`)
            }
          })
        }
      }
    }

    if (isEditing) {
      mapInstance.addListener('click', (e: google.maps.MapMouseEvent) => {
        const position = e.latLng
        if (position) {
          const lat = position.lat()
          const lng = position.lng()

          if (isValidCoordinates(lat, lng)) {
            if (marker) {
              marker.setPosition(position)
            } else {
              const newMarker = new window.google.maps.Marker({
                position,
                map: mapInstance,
                draggable: true,
                animation: window.google.maps.Animation.DROP,
              })
              setMarker(newMarker)

              newMarker.addListener('dragend', () => {
                const newPosition = newMarker.getPosition()
                if (newPosition) {
                  onCoordinateSelect(`${newPosition.lat()},${newPosition.lng()}`)
                }
              })
            }
            onCoordinateSelect(`${lat},${lng}`)
          }
        }
      })
    }

    return () => {
      if (marker) {
        marker.setMap(null)
      }
      pendingMarkers.forEach(marker => marker.setMap(null))
    }
  }, [coordinates, isEditing])

  // Handle pending devices markers
  useEffect(() => {
    if (!map || !window.google) return

    pendingMarkers.forEach(marker => marker.setMap(null))
    const newMarkers: google.maps.Marker[] = []
    const bounds = new window.google.maps.LatLngBounds()
    let hasValidMarkers = false

    // Create markers for pending devices
    pendingDevices.forEach(device => {
      if (!device.coordinates) return

      const [lat, lng] = device.coordinates.split(',').map(Number)
      if (isValidCoordinates(lat, lng)) {
        const marker = new window.google.maps.Marker({
          position: { lat, lng },
          map,
          icon: {
            url: 'http://maps.google.com/mapfiles/ms/icons/red-dot.png'
          },
          animation: window.google.maps.Animation.DROP,
        })
        newMarkers.push(marker)
        bounds.extend({ lat, lng })
        hasValidMarkers = true
      }
    })

    setPendingMarkers(newMarkers)

    // Center map on pending devices if any valid markers exist
    if (hasValidMarkers) {
      map.fitBounds(bounds)
    }

    return () => {
      newMarkers.forEach(marker => marker.setMap(null))
    }
  }, [map, pendingDevices])

  return (
    <div className="relative">
      <div ref={mapRef} className="w-full h-[400px] rounded-lg" />
      {isEditing && (
        <div className="absolute top-4 right-4 space-y-2">
          <Button
            variant="secondary"
            onClick={() => {
              if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition((position) => {
                  const { latitude, longitude } = position.coords
                  if (isValidCoordinates(latitude, longitude)) {
                    const coords = `${latitude},${longitude}`
                    onCoordinateSelect(coords)
                    map?.setCenter({ lat: latitude, lng: longitude })
                    if (marker) {
                      marker.setPosition({ lat: latitude, lng: longitude })
                    }
                  }
                })
              }
            }}
          >
            Use Current Location
          </Button>
        </div>
      )}
    </div>
  )
}
