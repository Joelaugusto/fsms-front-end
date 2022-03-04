import Message from './../Message/message'
import MessageInput from './../messageInput'
import MessageUserInfo from './../Message/messageUserInfo'
import { AiOutlineBell, AiOutlineSearch } from 'react-icons/ai'

const Container = (props: {className: string, goBack: Function, messages: [any]}) => {
  console.log(props.messages)
  return (
    <div
      className={`${props.className} p-6" h-screen flex-auto flex-col md:flex`}
    >
      <div className="flex flex-auto flex-shrink-0 flex-col rounded-2xl bg-gray-100 p-4">
        <div className="mb-4 flex h-full flex-col">
          <div className="px flex h-full flex-col">
            <div className="flex h-20 justify-between border-b-2 border-gray-200 py-3 sm:items-center">
              <MessageUserInfo goBack={props.goBack} />
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
            <div className="h-[calc(100vh-240px)] gap-y-2 overflow-y-auto">
              {props.messages.map((message) => (
                <Message received={message.received} text={message.message} key={message.id} />
              ))}
            </div>
          </div>
        </div>
        <MessageInput chat={1} />
      </div>
    </div>
  )
}

export default Container
