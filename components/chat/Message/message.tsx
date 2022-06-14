const Message = (props: {
  received: boolean
  text: string
  seenAt: Date
  image: string}) => {
  if (props.received) {
    return (
      <div className="col-start-1 col-end-8 rounded-lg p-3">
        <div className="flex flex-row items-center">
          <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-emerald-400">
            <img
              className="h-10 w-10 rounded-full"
              src={`${process.env.NEXT_PUBLIC_BASE_DOWNLOAD_URL + props.image}`}
            />
          </div>
          <div className="relative ml-3 rounded-xl bg-white py-2 px-4 text-sm shadow">
            <div>{props.text}</div>
          </div>
        </div>
      </div>
    )
  } else {
    return (
      <div className="col-start-6 col-end-13 rounded-lg p-3">
        <div className="flex flex-row-reverse items-center justify-start">
          <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-emerald-400">
            <img
              className="h-10 w-10 rounded-full"
              src={`${process.env.NEXT_PUBLIC_BASE_DOWNLOAD_URL + props.image}`}
            />
          </div>
          <div className="relative mr-3 rounded-xl bg-emerald-100 py-2 px-4 text-sm shadow">
            <div>{props.text}</div>
            <div className="absolute bottom-0 right-0 -mb-5 mr-2 text-xs text-gray-500">
              {props.seenAt ? 'vista' : ''}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Message
