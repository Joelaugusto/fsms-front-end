import Ads from "./ads";
import { FiPlusCircle } from "react-icons/fi";

const AdsContainer = () => {

  return (
    <div className="mx-6">
      <div className="flex items-center gap-2">
        <h1 className="my-6 text-xl">Anúncios</h1>
        <button className="bg-emerald-600 flex items-center text-white py-1 px-2 rounded-md gap-1">
         Adicionar mais <FiPlusCircle size={18}/>
        </button>
      </div>
      <div className="mt-6  space-y-3 md:flex md:space-y-0 md:space-x-4">
        <Ads
          title="Seminário sobre Protecção Social e Agricultura em Moçambique"
          user="Joel Augusto"
          views="53K visualizações"
          date="2 semanas atrás"
          userImage="https://avatar.oxro.io/avatar.svg?name=Joel+Augusto"
        />
        <Ads
          title="Hoje é dia de ação! Ação de amor e solidariedade para a agricultura"
          user="Joel Augusto"
          views="53K visualizações"
          date="2 semanas atrás"
          userImage="https://avatar.oxro.io/avatar.svg?name=Joel+Augusto"
        />
      </div>
    </div>
  )
}


export default AdsContainer;