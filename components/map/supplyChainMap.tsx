import 'leaflet/dist/leaflet.css'
import mapIcons from './MapIcon'
import { HiUser, HiViewGrid } from 'react-icons/hi'
import { useRouter } from 'next/router'


import { MapContainer, TileLayer, Marker, Tooltip, useMapEvents } from 'react-leaflet'
import { useRef, useState } from 'react'
import api from '../../utils/api'

const Map = (props: { latitude: number; longitude: number; popup: String, className: string, markers: Array<any> }) => {
  const setMap = () => { }
  const router = useRouter()

  const [clickedMarkerPosition, setClickedMarkerPosition] = useState<{
    x: number, y: number
  }>()

  const [clickedMarkerInfo, setClickedMarkerInfo] = useState<any>()

  const markerOption = useRef<any>(null)
  
  
  const getRoleName = (role: string): string => {
    const roles = [
      'Agricultor',
      'Estoquicista',
      'Varejista',
      'Distribuidor',
      'Vendedor de insumos',
    ]
    const backRoles = [
      'FARMER',
      'STOCKIST',
      'RETAILER',
      'DISTRIBUTOR',
      'INPUT_SALESMAN',
    ]

    return roles[backRoles.indexOf(role)]
  }

    function MyComponent() {
      const map = useMapEvents({
        click: (e) => {
          markerOption?.current?.focus()
        },
      })
      return null
    }


  return (
    <MapContainer
      center={[props.latitude, props.longitude]}
      zoom={13}
      scrollWheelZoom={true}
      whenCreated={setMap}
      className={props.className}
    >
      <MyComponent />

      {clickedMarkerPosition && (
        <div
          tabIndex={-1}
          onBlur={() => {setTimeout(() => setClickedMarkerPosition(undefined), 300)}}
          ref={markerOption}
          className="fixed flex h-80 w-52 cursor-default flex-col justify-between rounded-md bg-white p-4"
          style={{
            zIndex: 100000,
            top: clickedMarkerPosition?.y,
            left: clickedMarkerPosition?.x,
          }}
        >
          <p className='text-xl'>{clickedMarkerInfo?.name}</p>
          <p className='text-gray-500'>{ getRoleName(clickedMarkerInfo?.role)}</p>
          <img
            className='aspect-square'
            src={
              process.env.NEXT_PUBLIC_BASE_DOWNLOAD_URL +
              clickedMarkerInfo?.profileUrl
            }
          />
          <button
            onClick={async () => {
              await api.post('chats', { members: [clickedMarkerInfo?.id], name: clickedMarkerInfo.name })
                .then((data) => {
                  router.push(`/messages?selected=${data.data.id}`)
                  console.log(data)
                })
            }}
            className="mb-2 flex items-center justify-center rounded-md border-2 border-emerald-600 bg-emerald-600 p-2 text-white hover:bg-white hover:text-emerald-600 "
          >
            Contactar
          </button>
        </div>
      )}
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <>
        <Marker
          position={[props.latitude, props.longitude]}
          icon={mapIcons.getIcon('')}
          key={'current_location'}
        >
          <Tooltip>Você está aqui!</Tooltip>
        </Marker>
        {props.markers.map((marker: any, index) => (
          <Marker
            eventHandlers={{
              click: (e) => {
                const { pageX, pageY } = e.originalEvent
                setClickedMarkerPosition({ x: pageX, y: pageY })
                setClickedMarkerInfo(marker)
              },
            }}
            position={[marker.latitude, marker.longitude]}
            icon={
              marker.profileUrl
                ? mapIcons.getIconFromUrl(
                    process.env.NEXT_PUBLIC_BASE_DOWNLOAD_URL +
                      marker.profileUrl
                  )
                : mapIcons.getIcon(marker.role)
            }
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
                  <p>{getRoleName(marker.role)}</p>
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


