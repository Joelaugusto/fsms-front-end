import 'leaflet/dist/leaflet.css'
import mapIcons from './MapIcon'
import { HiUser, HiViewGrid } from 'react-icons/hi'


import { MapContainer, TileLayer, Marker, Tooltip } from 'react-leaflet'

const Map = (props: { latitude: number; longitude: number; popup: String, className: string, markers: Array<any> }) => {
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
        {props.markers.map((marker: any, index) => (
          <Marker
            position={[marker.latitude, marker.longitude]}
            icon={mapIcons.getIcon(marker.role)}
            key={index}
          >
            <Tooltip>
              <div className="block">
                <div className="flex items-center gap-2">
                  <HiUser size={20} />
                  <p>{marker.name}</p>
                </div>
                <div className="flex items-center gap-2">
                  <HiViewGrid size={20} />
                  <p>{marker.role}</p>
                </div>
              </div>
            </Tooltip>
            {props.popup}
          </Marker>
        ))}
      </>
    </MapContainer>
  )
}

export default Map