
import { useState } from 'react'
import { FiSend } from 'react-icons/fi'
import { BsEmojiSmile } from 'react-icons/bs'
import { IoMdAttach } from 'react-icons/io'
import cookies from '../../utils/cookies'

const MessageInput =  (props: {chat: number}) => {


  const [message, setMessage] = useState<string>('')

  const sendMessage = async(e: any) => {
    e.preventDefault()
    const resp = await fetch(
      `http://localhost:8080/api/v1/chats/${props.chat}/messages`,
      {
        method: 'post',
        headers: {
          'Authorization': 'Bearer ' + cookies.getCookie('accessToken'),
          'Accept': 'application/json',
          'Content-Type': 'application/json'

        },
        body: JSON.stringify({
          message
        })
      }
    )
    setMessage('')
  }

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
            onChange={(e:any) => {setMessage(e.target.value)}}
            value={message}
          />
          <button className="absolute right-0 top-0 flex h-full w-12 items-center justify-center text-gray-400 hover:text-gray-600">
            <BsEmojiSmile />
          </button>
        </div>
      </div>
      <div className="ml-4">
        <button onClick={sendMessage} className="flex flex-shrink-0 items-center justify-center rounded-xl bg-emerald-400 py-1 text-white hover:bg-emerald-600 md:px-4">
          <span className="hidden md:flex">Enviar</span>
          <FiSend className="ml-2" />
        </button>
      </div>
    </div>
  )
}

export default MessageInput;