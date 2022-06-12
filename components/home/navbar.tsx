import { useRouter } from 'next/router'
import { useState } from 'react'
import { FiMenu, FiSearch } from 'react-icons/fi'
import {
  MdClose,
  MdOutlineKeyboardArrowDown,
  MdOutlineKeyboardArrowUp,
} from 'react-icons/md'
import LeftSidebar from './leftSidebar'

const Navbar = (props: {
  user: { name: string; profilePhotoUrl: string }
  onSearch: Function
  showSearchBox: boolean
}) => {
  const [showModal, setShowModal] = useState<boolean>(false)
  const [select, setSelect] = useState<boolean>(false)
  const router = useRouter()
  const profilePhoto: string = props.user.profilePhotoUrl
    ? process.env.NEXT_PUBLIC_BASE_DOWNLOAD_URL + props.user.profilePhotoUrl
    : `https://avatar.oxro.io/avatar.svg?name=${
        props.user?.name ? props.user.name.replace(' ', '+') : ''
      }`

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
      <button
        className="md:hidden"
        onClick={() => {
          setShowModal(true)
        }}
      >
        <FiMenu size={25} />
      </button>
      <div
        className={`${
          !props.showSearchBox ? 'hidden' : ''
        } flex w-96 items-center space-x-3 rounded-md bg-gray-100 px-4 py-2`}
      >
        <input
          type="text"
          placeholder="pesquisar"
          className="w-full bg-gray-100 outline-none"
          onChange={(e) => props.onSearch(e.target.value)}
        />
        <FiSearch />
      </div>
      <div></div>
      <div className="flex">
        <div className="flex items-center space-x-4">
          <img
            className="w-8 rounded-full"
            src={profilePhoto}
            alt="profile-photo"
          />
          <p className="hidden md:block">{props.user?.name}</p>
        </div>
        <div className="relative ml-2 inline-block text-left">
          <button
            onClick={() => {
              setSelect(!select)
            }}
            type="button"
            className="inline-flex w-full justify-center gap-2 rounded-md border border-gray-300  bg-white p-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 focus:ring-offset-gray-100"
            id="menu-button"
            aria-expanded="true"
            aria-haspopup="true"
          >
            {select ? (
              <MdOutlineKeyboardArrowDown />
            ) : (
              <MdOutlineKeyboardArrowUp />
            )}
          </button>

          {select ? (
            <div
              className="absolute right-0 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
              role="menu"
              aria-orientation="vertical"
              aria-labelledby="menu-button"
            >
              <div className="py-1" role="none">
                <button
                  onClick={() => {
                    logOut()
                  }}
                  className="block w-56 px-4 py-2 text-sm text-gray-700 hover:bg-slate-100"
                  role="menuitem"
                  id="menu-item-0"
                >
                  Terminar Sessão
                </button>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </nav>
  )
}

export default Navbar
