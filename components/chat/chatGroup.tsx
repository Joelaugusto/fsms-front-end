import Conversation from "./conversation";

const ChatGroup = (props: {title: string, onSelectChat: Function}) => {
  
  return (
    <>
      <div className="flex flex-row items-center justify-between text-xs">
        <span className="font-bold">{props.title}</span>
        <span className="flex h-4 w-4 items-center justify-center rounded-full bg-gray-300">
          4
        </span>
      </div>
      <div className="-mx-2 mt-4 flex h-[calc(100vh-450px)] flex-col space-y-1 overflow-y-auto">
        <Conversation onSelectChat={props.onSelectChat} />
        <Conversation onSelectChat={props.onSelectChat} />
        <Conversation onSelectChat={props.onSelectChat} />
        <Conversation onSelectChat={props.onSelectChat} />
        <Conversation onSelectChat={props.onSelectChat} />
        <Conversation onSelectChat={props.onSelectChat} />
        <Conversation onSelectChat={props.onSelectChat} />
        <Conversation onSelectChat={props.onSelectChat} />
        <Conversation onSelectChat={props.onSelectChat} />
        <Conversation onSelectChat={props.onSelectChat} />
        <Conversation onSelectChat={props.onSelectChat} />
        <Conversation onSelectChat={props.onSelectChat} />
        <Conversation onSelectChat={props.onSelectChat} />
        <Conversation onSelectChat={props.onSelectChat} />
        <Conversation onSelectChat={props.onSelectChat} />
        <Conversation onSelectChat={props.onSelectChat} />
        <Conversation onSelectChat={props.onSelectChat} />
      </div>
    </>
  )
}

export default ChatGroup;