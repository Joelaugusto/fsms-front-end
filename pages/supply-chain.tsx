import { NextPage } from "next";
import dynamic from "next/dynamic";

const Map = dynamic(() => import('../components/map'), { ssr: false })


const SupplyChain: NextPage = () => {
  return (
    <div>
      <Map
        latitude={-25.9260416}
        longitude={32.5517312}
        popup={'ABC'}
        key={11}
      />
    </div>
  )
}

export default SupplyChain;