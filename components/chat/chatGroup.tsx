import Conversation from "./conversation";

const ChatGroup = (props: {title: string}) => {
  
  return(
    <>
    <div className="flex flex-row items-center justify-between text-xs">
        <span className="font-bold">{props.title}</span>
        <span className="flex h-4 w-4 items-center justify-center rounded-full bg-gray-300">
          4
        </span>
      </div>
      <div className="-mx-2 mt-4 flex h-48 flex-col space-y-1 overflow-y-auto">
        <Conversation/>
      </div>
    </>
  )
}

export default ChatGroup;