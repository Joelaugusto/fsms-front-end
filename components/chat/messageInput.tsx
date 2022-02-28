
import { FiSend } from 'react-icons/fi'
import { BsEmojiSmile } from 'react-icons/bs'
import { IoMdAttach } from 'react-icons/io'

const MessageInput = () => {

  return (
    <div className="flex h-16 w-full flex-row items-center rounded-xl bg-white px-4">
      <button className="flex items-center justify-center text-gray-400 hover:text-gray-600">
        <IoMdAttach />
      </button>
      <div className="ml-4 flex-grow">
        <div className="relative w-full">
          <input
            type="text"
            className="flex h-10 w-full rounded-xl border pl-4 focus:border-emerald-300 focus:outline-none"
          />
          <button className="absolute right-0 top-0 flex h-full w-12 items-center justify-center text-gray-400 hover:text-gray-600">
            <BsEmojiSmile />
          </button>
        </div>
      </div>
      <div className="ml-4">
        <button className="flex flex-shrink-0 items-center justify-center rounded-xl bg-emerald-400 px-4 py-1 text-white hover:bg-emerald-600">
          <span>Enviar</span>
          <FiSend className="ml-2" />
        </button>
      </div>
    </div>
  )
}

export default MessageInput;