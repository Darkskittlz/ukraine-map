import React, { useState, useRef, useMemo, useCallback } from 'react'
import { MapContainer, TileLayer, Marker, Popup, Polygon, useMapEvent } from 'react-leaflet'
import "../App.css"
import L from "leaflet";
import { DonateContainer, HeaderContainer } from '../styles/CreateStyles';
import ukraine from "../assets/ukraine.jpg"


delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
    iconRetinalUrl: require('leaflet/dist/images/marker-icon-2x.png'),
    iconUrl: require('leaflet/dist/images/marker-icon.png'),
    shadowUrl: require('leaflet/dist/images/marker-shadow.png')
})

const multiPolygon = [
    [
        [51.51, 23.7],
        [52.3, 33.4],
        [49.6, 40],
        [48, 40],
        [44.7, 35],
        [44.7, 30],
        [48.1, 22.6]
    ]
]

const center = {
    lat: 49,
    lng: 31.5,
}

function DraggableMarker() {
    const [draggable, setDraggable] = useState(false)
    const [position, setPosition] = useState(center)
    const markerRef = useRef(null)
    const eventHandlers = useMemo(
        () => ({
            dragend() {
                const marker = markerRef.current
                if (marker != null) {
                    setPosition(marker.getLatLng())
                }
            },
        }),
        [],
    )
    const toggleDraggable = useCallback(() => {
        setDraggable((d) => !d)
    }, [])

    return (
        <Marker
            draggable={draggable}
            eventHandlers={eventHandlers}
            position={position}
            ref={markerRef}>
            <Popup minWidth={90}>
                <span style={{ cursor: "pointer" }} onClick={toggleDraggable}>
                    {draggable
                        ? 'Marker is draggable'
                        : 'Click here to make marker draggable'}
                </span>
            </Popup>
        </Marker>
    )
}

function SetViewOnClick({ animateRef }) {
    const map = useMapEvent('click', (e) => {
        map.setView(e.latlng, map.getZoom(), {
            animate: animateRef.current || false,
        })
    })

    return null
}

const MapComponent = () => {
    const animateRef = useRef(false)
    const redOptions = { color: 'red' }

    return (
        <>
            <HeaderContainer>
                <h1>Help Support The Ukraine</h1>
                <p>
                    <label>
                        <input
                            type="checkbox"
                            onChange={() => {
                                animateRef.current = !animateRef.current
                            }}
                        />
                        Animate panning
                    </label>
                </p>
            </HeaderContainer>
            <DonateContainer>
                <img src={ukraine} alt="Ukraine Flag" />
                <button onClick={() => { window.location.href = "https://savelife.in.ua/en/" }}>Donate</button>
            </DonateContainer>
            <MapContainer
                center={[47.99, 31.7]}
                zoom={5.1}
                scrollWheelZoom={true}
                style={{ height: "90vh", width: "100%", position: 'fixed' }}
            >
                <TileLayer
                    style={{ position: 'fixed', right: 0, bottom: 0 }}
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Polygon pathOptions={redOptions} positions={multiPolygon} />
                <SetViewOnClick animateRef={animateRef} />
                <DraggableMarker />
            </MapContainer >
        </>
    )
}

export default MapComponent

