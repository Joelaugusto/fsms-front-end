import Message from './../Message/message'
import MessageInput from './../messageInput'
import MessageUserInfo from './../Message/messageUserInfo'
import { AiOutlineBell, AiOutlineSearch } from 'react-icons/ai'

const Container = () => {
  return (
    <div className="flex h-screen flex-auto flex-col p-6 ">
      <div className="flex flex-auto flex-shrink-0 flex-col rounded-2xl bg-gray-100 p-4">
        <div className="mb-4 flex h-full flex-col">
          <div className="px flex h-full flex-col">
            <div className="flex h-20 justify-between border-b-2 border-gray-200 py-3 sm:items-center">
              <MessageUserInfo />
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
            <div className="grid h-[calc(100vh-240px)] grid-cols-12 gap-y-2 overflow-y-auto">
              <Message received={true} text="Ola! tudo bem contigo?" />
              <Message received={false} text="Tudo e ai?" />
              <Message received={true} text="Ola! tudo bem contigo?" />
              <Message received={false} text="Tudo e ai?" />
              <Message received={true} text="Ola! tudo bem contigo?" />
              <Message received={false} text="Tudo e ai?" />
              <Message received={true} text="Ola! tudo bem contigo?" />
              <Message received={false} text="Tudo e ai?" />
              <Message received={true} text="Ola! tudo bem contigo?" />
              <Message received={false} text="Tudo e ai?" />
              <Message received={true} text="Ola! tudo bem contigo?" />
              <Message received={false} text="Tudo e ai?" />
              <Message received={true} text="Ola! tudo bem contigo?" />
              <Message received={false} text="Tudo e ai?" />
              <Message received={true} text="Ola! tudo bem contigo?" />
              <Message received={false} text="Tudo e ai?" />
              <Message received={true} text="Ola! tudo bem contigo?" />
              <Message received={false} text="Tudo e ai?" />
              <Message received={true} text="Ola! tudo bem contigo?" />
              <Message received={false} text="Tudo e ai?" />
              <Message received={true} text="Ola! tudo bem contigo?" />
              <Message received={false} text="Tudo e ai?" />
              <Message received={true} text="Ola! tudo bem contigo?" />
              <Message received={false} text="Tudo e ai?" />
              <Message received={true} text="Ola! tudo bem contigo?" />
              <Message received={false} text="Tudo e ai?" />
              <Message received={true} text="Ola! tudo bem contigo?" />
              <Message received={false} text="Tudo e ai?" />
              <Message received={true} text="Ola! tudo bem contigo?" />
              <Message received={false} text="Tudo e ai?" />
            </div>
          </div>
        </div>
        <MessageInput />
      </div>
    </div>
  )
}

export default Container
