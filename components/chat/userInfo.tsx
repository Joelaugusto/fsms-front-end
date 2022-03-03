const UserInfo = (props: {user: any}) => {
  return (
    <div className="mt-4 flex w-full flex-col items-center rounded-lg border border-emerald-200 bg-emerald-100 py-6 px-4">
      <div className="h-20 w-20 overflow-hidden rounded-full border">
        <img
          src="https://avatar.oxro.io/avatar.svg?name=Joel+Augusto"
          alt="Avatar"
          className="h-full w-full"
        />
      </div>
      <div className="mt-2 text-sm font-semibold">{props.user.name}</div>
      <div className="text-xs text-gray-500">{props.user.role}</div>
      <div className="mt-3 flex flex-row items-center">
        <div className="flex h-4 w-8 flex-col justify-center rounded-full bg-emerald-600">
          <div className="mr-1 h-3 w-3 self-end rounded-full bg-white"></div>
        </div>
        <div className="ml-1 text-xs leading-none">Activo</div>
      </div>
    </div>
  )
}

export default UserInfo;