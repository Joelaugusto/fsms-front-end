import dynamic from 'next/dynamic'
import api from '../utils/api'

function HomePage(props: any) {
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
      latitude={-25.9456962}
      longitude={32.4833466}
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
