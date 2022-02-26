const AuthContainer = (props: any) => (
  <section className="grid grid-cols-2">
    <div className="grid h-screen place-content-center bg-emerald-400">
      <p>picture</p>
    </div>
    <div className="grid h-screen place-content-center">
      <h1 className="text-center text-3xl my-5">{props.title}</h1>
      <div className="grid place-content-center">{props.children}</div>
    </div>
  </section>
)
export default AuthContainer;