import { useRouter } from 'next/router'
import { useState } from 'react'
import { FiMenu, FiSearch } from 'react-icons/fi'
import { MdClose, MdOutlineKeyboardArrowDown, MdOutlineKeyboardArrowUp } from 'react-icons/md'
import LeftSidebar from './leftSidebar'

const Navbar = (props: { user: { name: string }, onSearch: Function, showSearchBox: boolean }) => {


  const [showModal, setShowModal] = useState<boolean>(false)
  const [select, setSelect] = useState<boolean>(false)
  const router = useRouter()


  const modal = (
    <div className="fixed top-0 left-0 z-10 flex h-screen w-screen flex-col items-center justify-center overflow-auto bg-white p-5">
      <MdClose
        size={25}
        className="fixed top-5 right-5"
        onClick={() => {
          setShowModal(false)
        }}
      />
      <LeftSidebar />
      <div className="w-full bg-white md:w-1/2"></div>
    </div>
  )

  const logOut = () => { 
    document.cookie = 'accessToken= ; expires = Thu, 01 Jan 1970 00:00:00 GMT'
    router.push({ pathname: '/auth/login' })
  }


  return (
    <nav className="flex items-center justify-between border-b bg-white px-10 py-6">
      {showModal ? modal : null}
      <button className='md:hidden' onClick={() => { setShowModal(true) }}>
        <FiMenu size={25} />
      </button>
      <div className={`${!props.showSearchBox ? 'hidden' : ''} flex w-96 items-center space-x-3 rounded-md bg-gray-100 px-4 py-2`}>
        <input
          type="text"
          placeholder="pesquisar"
          className="w-full bg-gray-100 outline-none"
          onChange={(e) => props.onSearch(e.target.value)}
        />
        <FiSearch />
      </div>
      <div className='flex'>
        <div className="flex items-center space-x-4">
          <img
            className="w-8 rounded-full"
            src={`https://avatar.oxro.io/avatar.svg?name=${props.user?.name ? props.user.name.replace(' ', '+') : ''}`}
            alt="Joel Augusto"
          />
          <p className="hidden md:block">{props.user?.name}</p>
        </div>
        <div className="relative inline-block text-left ml-2">
            <button onClick={() => { setSelect(!select) }} type="button" className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm  p-2 gap-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-emerald-500" id="menu-button" aria-expanded="true" aria-haspopup="true">
              {select ? <MdOutlineKeyboardArrowDown /> : <MdOutlineKeyboardArrowUp />}
            </button>

          {select ?
            <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" >
            <div className="py-1" role="none">
                <button onClick={() => {logOut()}} className="text-gray-700 w-56 block px-4 py-2 text-sm hover:bg-slate-100" role="menuitem" id="menu-item-0">Terminar Sessão</button>
            </div>
          </div> : null}
        </div>
      </div>

    </nav>
  )
}

export default Navbar
