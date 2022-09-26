import { useState } from 'react'
import { FiPlusCircle } from 'react-icons/fi'
import { RiCloseCircleLine } from 'react-icons/ri'
import { BiHide, BiShow } from 'react-icons/bi'

const AddVideo = (props: {onUpdateLinks: Function}) => {
  const [showTextField, setShowTextField] = useState<boolean>(false)
  const [showLinkList, setShowLinkList] = useState<boolean>(true)

    const [links, setLinks] = useState<Array<string>>([])
    const [link, setLink] = useState<string>()

    const addLink = () => {
    if (link) {
      links.push(link)
    }
        setShowTextField(false)
        props.onUpdateLinks(links)
  }

  const addVideoBtn = (
    <button
      onClick={() => {
        setShowTextField(true)
      }}
      className="my-5 flex gap-2 rounded-md bg-emerald-600 p-2 text-white"
    >
      Adicionar Video <FiPlusCircle size={25} />
    </button>
    )

    const hideLinkListBtn = (
      <button
        onClick={() => {
          setShowLinkList(!showLinkList)
        }}
        className="my-5 flex gap-2 rounded-md bg-emerald-600 p-2 text-white"
      >
        {showLinkList ? 'Ocultar lista de vídeos' : 'Mostrar lista de vídeos'}{' '}
        {showLinkList ? <BiHide size={25} /> : <BiShow size={25} />}
      </button>
    )

  const urlField = (
    <div className="flex gap-5">
      <input
        placeholder="Adicione o link do vídeo"
              className="my-5 rounded-md border border-emerald-400 p-2 text-sm"
              onChange={(e) => {setLink(e.target.value)}}
      />
      <div className="flex gap-5">
        <button
          onClick={() => {
            setShowTextField(false)
          }}
          className="my-5 flex gap-2 rounded-md bg-red-700 p-2 text-white"
        >
          Cancelar <RiCloseCircleLine size={25} />
        </button>
        <button
          onClick={() => {
            addLink()
          }}
          className="my-5 flex gap-2 rounded-md bg-emerald-600 p-2 text-white"
        >
          Adicionar <FiPlusCircle size={25} />
        </button>
      </div>
    </div>
  )
    

  return (
    <div>
      <div className="flex gap-5">{showTextField ? urlField : addVideoBtn}</div>
      <div className="flex gap-5">{links.length !== 0 && hideLinkListBtn}</div>
      {}
      {showLinkList && links.map((link, index) => (
        <div key={index} className="my-2 flex items-center gap-5">
          <button
            onClick={() => {
              const linksAux: Array<string> = links
              linksAux.splice(index, 1)
              setLinks([...linksAux])
              props.onUpdateLinks(links)
            }}
            className="rounded-md bg-red-700 p-2 text-white "
          >
            <RiCloseCircleLine />
          </button>
          <p>{link}</p>
        </div>
      ))}
    </div>
  )
}

export default AddVideo
