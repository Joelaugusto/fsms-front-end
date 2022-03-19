// import 'https://unpkg.com/leaflet@1.7.1/dist/leaflet.js'

import { MapContainer, TileLayer, Marker,Tooltip  } from 'react-leaflet'



const Map = (props:{latitude: number, longitude:number, popup: String}) => {


  const setMap = (e: any) => {

  }

  return (
    <MapContainer
      center={[props.latitude, props.longitude]}
      zoom={13}
      scrollWheelZoom={true}
      whenCreated={setMap}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={[props.latitude, props.longitude]}>
        <Tooltip>{props.popup}</Tooltip>
        {props.popup}
      </Marker>
    </MapContainer>
  )}

export default Map;