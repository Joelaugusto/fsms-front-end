const Separator = (props: { children: String }) => (
  <div className="flex items-center gap-4 mb-4 mt-10">
    <hr className="w-full border border-current" />
    <span>{props.children}</span>
    <hr className="w-full border border-current" />
  </div>
)

export default Separator
