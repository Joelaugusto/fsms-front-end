import Conversation from "./conversation";


const ChatGroup = (props: {title: string, onSelectChat: Function, chats: [any]}) => {
  
  return (
    <>
      <div className="flex flex-row items-center justify-between text-xs">
        <span className="font-bold">{props.title}</span>
        <span className="flex h-4 w-4 items-center justify-center rounded-full bg-gray-300">
          {props.chats.length}
        </span>
      </div>
      <div className="-mx-2 mt-4 flex flex-col space-y-1 overflow-y-auto">
        {props.chats.map((chat: any) => (
          <Conversation onSelectChat={props.onSelectChat} key={chat.id} chat={chat} />
        ))}
      </div>
    </>
  )
}

export default ChatGroup;