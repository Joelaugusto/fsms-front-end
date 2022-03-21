import L, { divIcon, map } from 'leaflet'
import 'leaflet/dist/leaflet.css'
import mapIcons from './MapIcon'


import { MapContainer, TileLayer, Marker, Tooltip } from 'react-leaflet'

const Map = (props: { latitude: number; longitude: number; popup: String, className: string }) => {
  const setMap = () => {}

  return (
    <MapContainer
      center={[props.latitude, props.longitude]}
      zoom={13}
      scrollWheelZoom={true}
      whenCreated={setMap}
      className={props.className}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <>
        <Marker
          position={[props.latitude, props.longitude]}
          icon={mapIcons.farmer}
        >
          <Tooltip>
            <div>
              <p>{props.popup}</p>
              <p>{props.popup}</p>
              <p>{props.popup}</p>
            </div>
          </Tooltip>
          {props.popup}
        </Marker>
      </>
    </MapContainer>
  )
}

export default Map
