import 'leaflet/dist/leaflet.css'
import mapIcons from './MapIcon'
import 'leaflet/dist/leaflet.css'
// import icon from './constants'
import { MapContainer, TileLayer, Marker, Tooltip, useMapEvents } from 'react-leaflet'
// import L from 'leaflet'
// import { useState } from 'react'

const Map = (props: { latitude: number, longitude: number,zoom: number, popup: String, className: string, onClick: Function }) => {
  const setMap = () => {}


  
  function MyComponent() {
    const map = useMapEvents({
      click: (e) => {
        const { lat, lng } = e.latlng
        const {_zoom} = e.target
        // setLatitude(lat)
        // setLongitude(lng)
        // L.marker([lat, lng], { icon }).addTo(map);
        props.onClick(lat,lng,_zoom)
      },
    })
    return null
  }


  return (
    <MapContainer
      center={[props.latitude, props.longitude]}
      zoom={props.zoom}
      scrollWheelZoom={true}
      whenCreated={setMap}
      className={props.className}
    >
      <MyComponent/>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <>
        <Marker
          position={[props.latitude, props.longitude]}
          icon={mapIcons.getIcon('sd')}
        >
          <Tooltip>
            {props.popup}
          </Tooltip>
        </Marker>
      </>
    </MapContainer>
  )
}

export default Map
