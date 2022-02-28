import Conversations from './conversations'
import Message from './Message/message'
import MessageInput from './messageInput'
import UserInfo from './userInfo'
import { AiOutlineBell, AiOutlineSearch } from 'react-icons/ai'
import { IoArrowBack } from 'react-icons/io5'
import MessageUserInfo from './Message/messageUserInfo'


const Chat = () => {
  return (
    <div className="flex h-screen text-gray-800 antialiased">
      <div className="flex h-full w-full flex-row overflow-x-hidden">
        <div className="flex w-64 flex-shrink-0 flex-col bg-white py-8 pl-6 pr-2">
          <div className="flex h-12 w-full">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-700">
              <IoArrowBack />
            </div>
            <div className="ml-2 text-2xl font-bold">Conversas</div>
          </div>
          <UserInfo />
          <Conversations />
        </div>
        <div className="flex h-full flex-auto flex-col p-6 ">
          <div className="flex h-full flex-auto flex-shrink-0 flex-col rounded-2xl bg-gray-100 p-4">
            <div className="mb-4 flex h-full flex-col overflow-x-auto">
              <div className="px flex h-full flex-col">
                <div className="flex justify-between border-b-2 border-gray-200 py-3 sm:items-center">
                  <MessageUserInfo/>
                  <div className="flex items-center space-x-2">
                    <button
                      type="button"
                      className="inline-flex h-10 w-10 items-center justify-center rounded-lg border text-gray-500 transition duration-500 ease-in-out hover:bg-emerald-300 focus:outline-none"
                    >
                      <AiOutlineSearch size={25} />
                    </button>
                    <button
                      type="button"
                      className="inline-flex h-10 w-10 items-center justify-center rounded-lg border text-gray-500 transition duration-500 ease-in-out hover:bg-emerald-300 focus:outline-none"
                    >
                      <AiOutlineBell size={25} />
                    </button>
                  </div>
                </div>
                <div className="grid grid-cols-12 gap-y-2">
                  <Message received={true} text="Ola! tudo bem contigo?" />
                  <Message received={false} text="Tudo e ai?" />
                </div>
              </div>
            </div>
            <MessageInput />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Chat
