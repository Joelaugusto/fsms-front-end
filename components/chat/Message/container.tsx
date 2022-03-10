import Message from './../Message/message'
import MessageInput from './../messageInput'
import MessageUserInfo from './../Message/messageUserInfo'
import { AiOutlineBell, AiOutlineSearch } from 'react-icons/ai'
import ChatEmpty from '../chatEmpty'

const Container = (props: {className: string, goBack: Function, messages: [any], 
  chatId:number, username: string, userRole: string}) => {
  return (
    <div
      className={`${props.className} p-6" h-screen flex-auto flex-col md:flex`}
    >
      {props.chatId ? <div className="flex flex-auto flex-shrink-0 flex-col rounded-2xl bg-gray-100 p-4 h-full">
        <div className="mb-4 flex h-full flex-col">
          <div className="px flex h-full flex-col">
            <div className="flex justify-between border-b-2 border-gray-200 sm:items-center">
              <MessageUserInfo goBack={props.goBack} username={props.username} userrole={props.userRole} />
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
                <Message received={message.received} text={message.message} key={message.id} seenAt={message.seenAt} />
              ))}
            </div>
          </div>
        </div>
        <MessageInput chat={props.chatId} />
      </div> : <ChatEmpty/>}
    </div>
  )
}

export default Container
