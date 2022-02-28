import { FiSearch } from 'react-icons/fi'

const Navbar = () => {
  return (
    <nav className="flex items-center justify-between border-b bg-white px-10 py-6">
      <div className="flex w-96 items-center space-x-3 rounded-md bg-gray-100 px-4 py-2">
        <input
          type="text"
          placeholder="pesquisar"
          className="w-full bg-gray-100 outline-none"
        />
        <FiSearch/>
      </div>
      <div className="flex items-center space-x-4">
        <img
          className="w-8 rounded-full"
          src="https://imagez.tmz.com/image/f7/1by1/2021/12/14/f7703994b69d48ca802df55729a2325c_xl.jpg"
          alt="Elon Musk"
        />
        <p className="hidden md:block">Joel Augusto</p>
      </div>
    </nav>
  )
}

export default Navbar
