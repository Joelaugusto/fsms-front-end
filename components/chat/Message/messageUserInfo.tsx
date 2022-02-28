

const MessageUserInfo = () => (
  <div className="relative flex items-center space-x-4">
    <div className="relative">
      <span className="absolute right-0 bottom-0 text-green-500">
        <svg width="20" height="20">
          <circle cx="8" cy="8" r="8" fill="currentColor"></circle>
        </svg>
      </span>
      <img
        src="https://avatar.oxro.io/avatar.svg?name=Joel+Augusto"
        alt="Avatar"
        className="h-10 w-10 rounded-full sm:h-16 sm:w-16"
      />
    </div>
    <div className="flex flex-col leading-tight">
      <div className="mt-1 flex items-center text-2xl">
        <span className="mr-3 text-gray-700">Joel Augusto</span>
      </div>
      <span className="text-lg text-gray-600">Engenheiro Informático</span>
    </div>
  </div>
)

export default MessageUserInfo;