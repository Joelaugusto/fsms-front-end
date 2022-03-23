import 'leaflet/dist/leaflet.css'
import mapIcons from './MapIcon'
import 'leaflet/dist/leaflet.css'



import { MapContainer, TileLayer, Marker, Tooltip } from 'react-leaflet'

const Map = (props: { latitude: number; longitude: number; popup: String, className: string }) => {
  const setMap = () => {}

  console.log(props)

  return (
    <MapContainer
      center={[props.latitude, props.longitude]}
      zoom={13}
      scrollWheelZoom={true}
      whenCreated={setMap}
      className={props.className}
    >
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
