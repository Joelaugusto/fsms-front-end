import Ads from "./ads";

const AdsContainer = () => {

  return (
    <div className="mx-6">
      <h1 className="my-6 text-3xl">Anúncios</h1>
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