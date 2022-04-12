import dynamic from 'next/dynamic'
import { useEffect, useState } from 'react'
import api from '../utils/api'

function HomePage(props: any) {

  const [latitude, setLatitude] = useState(-25.9456962)
  const [longitude, setLongitude] = useState(32.4833466)


  useEffect(() => {
      navigator.geolocation.getCurrentPosition((position) => {
        setLatitude(position.coords.latitude)
        setLongitude(position.coords.longitude)
      })
    }, [])

  const Map = dynamic(
    () => import('../components/map/supplyChainMap'),
    {
      loading: () => <p>A map is loading</p>,
      ssr: false, // This line is important. It's what prevents server-side render
    }
  )

  const markers = [{
    name: "União dos agricultores de Maputo",

    position: []
  }]
  return (
    <Map
      className="h-screen w-screen"
      latitude={latitude}
      longitude={longitude}
      popup={'você está aqui!'}
      markers={props.markers}
      
    />
  )
}

export const getServerSideProps = async () => {


  const markers = await api.get('/users/map-markers')

  return {
    props: {
      markers: markers.data
    },
  }
}

export default HomePage
