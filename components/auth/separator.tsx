const Separator = (props: { children: String }) => (
  <div className="grid mx-0 my-10">
    <span className="z-10 absolute bg-white flex items-center justify-self-center py-0 px-9 leading-4 text-zinc-500">{props.children}</span>
    <hr className="w-full border border-solid border-current" />
  </div>
)

export default Separator
