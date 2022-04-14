import { useState } from 'react'
import { FiMenu, FiSearch } from 'react-icons/fi'
import { MdClose } from 'react-icons/md'
import LeftSidebar from './leftSidebar'

const Navbar = (props: { user: { name: string }, onSearch: Function, showSearchBox: boolean }) => {
  

  const [showModal, setShowModal] = useState<boolean>(false)


   const modal = (
     <div className="fixed top-0 left-0 z-10 flex h-screen w-screen flex-col items-center justify-center overflow-auto bg-white p-5">
       <MdClose
         size={25}
         className="fixed top-5 right-5"
         onClick={() => {
           setShowModal(false)
         }}
       />
        <LeftSidebar/>
       <div className="w-full bg-white md:w-1/2"></div>
     </div>
   )


  return (
    <nav className="flex items-center justify-between border-b bg-white px-10 py-6">
      {showModal ? modal: null}
      <button className='md:hidden' onClick={() => {setShowModal(true)}}>
        <FiMenu size={25}/>
      </button>
      <div className={`${!props.showSearchBox ? 'hidden': ''} flex w-96 items-center space-x-3 rounded-md bg-gray-100 px-4 py-2`}>
        <input
          type="text"
          placeholder="pesquisar"
          className="w-full bg-gray-100 outline-none"
          onChange={(e) => props.onSearch(e.target.value)}
        />
        <FiSearch />
      </div>
      <div className="flex items-center space-x-4">
        <img
          className="w-8 rounded-full"
          src={`https://avatar.oxro.io/avatar.svg?name=${props.user.name ? props.user.name.replace(' ', '+'):''}`}
          alt="Joel Augusto"
        />
        <p className="hidden md:block">{props.user.name}</p>
      </div>
    </nav>
  )
}

export default Navbar
