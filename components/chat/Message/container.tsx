import Message from './../Message/message'
import MessageInput from './../messageInput'
import MessageUserInfo from './../Message/messageUserInfo'
import { AiOutlineBell, AiOutlineSearch } from 'react-icons/ai'
import ChatEmpty from '../chatEmpty'
import {useEffect, useRef} from 'react'
const Container = (props: {
  className: string
  goBack: Function
  messages: Array<any>
  chatId: number
  user:any
  onMessageReceived: Function
}) => {

  const lastMessageRef = useRef<any>()

  //move scroll to down
  useEffect(() => {
    if (lastMessageRef.current) {
      lastMessageRef.current.scrollTop = lastMessageRef.current.scrollHeight
    }
  }, [props.messages.length])

  return (
    <div
      className={`${props.className} p-6" h-screen flex-auto flex-col md:flex`}
    >
      {props.chatId ? (
        <div className="flex h-full flex-auto flex-shrink-0 flex-col rounded-2xl bg-gray-100 p-4">
          <div className="mb-4 flex h-full flex-col">
            <div className="px flex h-full flex-col">
              <div className="flex justify-between border-b-2 border-gray-200 sm:items-center">
                <MessageUserInfo
                  profilePhoto={props.user.profilePhotoUrl}
                  goBack={props.goBack}
                  username={props.user.username}
                  userrole={props.user.userRole}
                />
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
              <div
                className="h-[calc(100vh-150px)] gap-y-2 overflow-y-auto"
                ref={lastMessageRef}
              >
                {props.messages.map((message) => (
                  <Message
                    received={message.received}
                    text={message.message}
                    key={message.id}
                    seenAt={message.seenAt}
                    image={message.sendByProfilePhotoUrl}
                  />
                ))}
              </div>
            </div>
          </div>
          <MessageInput
            chat={props.chatId}
            onMessageReceived={props.onMessageReceived}
          />
        </div>
      ) : (
        <ChatEmpty />
      )}
    </div>
  )
}

export default Container
