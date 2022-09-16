import dynamic from 'next/dynamic'
import { useEffect, useState } from 'react'
import { FiMaximize2, FiMinimize2 } from 'react-icons/fi'
let Map = dynamic(() => import('./map'), { ssr: false })

const MapBox = (props: {
  latitude: number,
  longitude: number,
  setLatitude: Function,
  setLongitude: Function
}) => {
  const [mapIsMaximized, setMapIsMaximized] = useState(false)

  const [latitude, setLatitude] = useState(props.latitude)
  const [longitude, setLongitude] = useState(props.longitude)
  const [zoom, setZoom] = useState(13)

  useEffect(() => {
    const updateMap = () => {
      Map = dynamic(() => import('./map'), { ssr: false })
    }

    updateMap()
  }, [mapIsMaximized, props])

  const onClickOnMap = (lat: number, lgt: number, _zoom: number) => {
    setLatitude(lat)
    setLongitude(lgt)
    setZoom(_zoom)
    props.setLatitude(lat)
    props.setLongitude(lgt)
  }

  return (
    <div>
      <div
        className={
          mapIsMaximized
            ? 'absolute top-0 left-0 h-screen w-screen'
            : 'relative h-96 w-full md:w-96'
        }
      >
        <button
          onClick={(e) => {
            e.preventDefault()
            setMapIsMaximized(!mapIsMaximized)
          }}
          className="absolute right-3 top-3 z-[1000] flex h-10 w-10 cursor-pointer items-center justify-center rounded-2xl bg-emerald-100 text-emerald-700"
        >
          {mapIsMaximized ? <FiMinimize2 /> : <FiMaximize2 />}
        </button>
        <Map
          latitude={latitude}
          longitude={longitude}
          popup={'Voce está aqui!'}
          className={'h-full w-full'}
          onClick={onClickOnMap}
          zoom={zoom}

        />
      </div>
    </div>
  )
}

export default MapBox
