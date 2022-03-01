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
        <FiSearch />
      </div>
      <div className="flex items-center space-x-4">
        <img
          className="w-8 rounded-full"
          src="https://avatar.oxro.io/avatar.svg?name=Joel+Augusto"
          alt="Joel Augusto"
        />
        <p className="hidden md:block">Joel Augusto</p>
      </div>
    </nav>
  )
}

export default Navbar
