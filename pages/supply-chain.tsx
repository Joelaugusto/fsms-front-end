import dynamic from 'next/dynamic'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { IoArrowBack } from 'react-icons/io5'
import api from '../utils/api'

function HomePage(props: any) {

  const [latitude, setLatitude] = useState(-25.9456962)
  const [longitude, setLongitude] = useState(32.4833466)
  const [filteredMarkers, setFilteredMarkers] = useState<Array<any>>(props.markers)





  useEffect(() => {
      navigator.geolocation.getCurrentPosition((position) => {
        setLatitude(position.coords.latitude)
        setLongitude(position.coords.longitude)
      })
    }, [])

  const Map = dynamic(
    () => import('../components/map/supplyChainMap'),
    {
      loading: () => <p>O Mapa está carregando!</p>,
      ssr: false, // This line is important. It's what prevents server-side render
    }
  )

  const markers = [{
    name: "União dos agricultores de Maputo",

    position: []
  }]
  return (
    <div className="flex flex-col">
      <div className="flex gap-4 p-2">
        <Link href="/">
          <div className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-2xl bg-emerald-100 text-emerald-700">
            <IoArrowBack />
          </div>
        </Link>
        <select
          className="w-40 rounded-md border border-slate-800 bg-transparent p-2"
          onChange={(e) => {
            setFilteredMarkers(
              props.markers.filter(
                (marker: any) =>
                  marker.role.id == e.target.value || e.target.value == ''
              )
            )
          }}
        >
          <option value=''>Mostrar Todos</option>
          {props.roles.map((role: any) => (
            <option value={role.id}>{role.name}</option>
          ))}
        </select>
      </div>
      <Map
        className="h-[calc(100vh-3.5rem)] w-screen"
        latitude={latitude}
        longitude={longitude}
        popup={'você está aqui!'}
        markers={filteredMarkers}
      />
    </div>
  )
}

export const getServerSideProps = async () => {


  const markers = await api.get('/users/map-markers')
  const roles = await api.get('/users/roles')


  return {
    props: {
      markers: markers.data,
      roles: roles.data
    },
  }
}

export default HomePage
