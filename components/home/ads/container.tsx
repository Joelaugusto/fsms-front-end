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
          userImage="https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80"
        />
        <Ads
          title="How to do Basic Jumping and how to landing safely"
          user="Thomas Hope"
          views="53K views"
          date="2 weeks ago"
          userImage="https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80"
        />
      </div>
    </div>
  )
}


export default AdsContainer;