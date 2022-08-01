import SockJsClient from 'react-stomp'
import { FiSend } from 'react-icons/fi'
import { BsEmojiSmile } from 'react-icons/bs'
import { IoMdAttach } from 'react-icons/io'
import cookies from '../../utils/cookies'

import { useState, useRef } from 'react'

const SOCKET_URL = process.env.NEXT_PUBLIC_BASE_URL + 'stomp'

const MessageInput = (props: {
  chat: number,
  onMessageReceived: Function
}) => {
  const [message, setMessage] = useState<string>('')

  let clientRef = useRef<any>()

  const sendMessage = async (e: any) => {
    e.preventDefault()

      ; (clientRef as any).sendMessage(
      '/app/messages-all',
      JSON.stringify({
        chatId: props.chat,
        message: message,
        apiKey: cookies.getCookie('accessToken'),
      })
    )
    setMessage('')
  }

  return (
    <form
      className="flex h-16 w-full flex-row items-center rounded-xl bg-white px-4"
      onSubmit={sendMessage}
    >
      <SockJsClient
        url={SOCKET_URL}
        topics={['/topic/messages']}
        // onConnect={console.log('Connected!')}
        // onDisconnect={console.log('Disconnected!')}
        onMessage={(msg: any) => {
          props.onMessageReceived(msg)
        }}
        debug={false}
        ref={(client: any) => {
          clientRef = client
        }}
      />
      <button
        className="flex items-center justify-center text-gray-400 hover:text-gray-600"
        onClick={(e: any) => {
          e.preventDefault()
        }}
      >
        <IoMdAttach />
      </button>
      <div className="ml-4 flex-grow">
        <div className="relative w-full">
          <input
            type="text"
            className="flex h-10 w-full rounded-xl border pl-4 focus:border-emerald-300 focus:outline-none"
            onChange={(e: any) => {
              setMessage(e.target.value)
            }}
            value={message}
          />
          <button
            className="absolute right-0 top-0 flex h-full w-12 items-center justify-center text-gray-400 hover:text-gray-600"
            onClick={(e: any) => {
              e.preventDefault()
            }}
          >
            <BsEmojiSmile />
          </button>
        </div>
      </div>
      <div className="ml-4">
        <button className="flex flex-shrink-0 items-center justify-center rounded-xl bg-emerald-400 py-1 text-white hover:bg-emerald-600 md:px-4"
        onClick={sendMessage}>
          <span className="hidden md:flex">Enviar</span>
          <FiSend className="ml-2" />
        </button>
      </div>
    </form>
  )
}

export default MessageInput
