import Head from "next/head";

const AuthContainer = (props: any) => (
  <section className="grid md:grid-cols-2">
    <Head>
      <title>{props.title}</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <div className="hidden h-screen place-content-center bg-emerald-400 p-16 md:grid">
      <p>picture</p>
    </div>
    <div className="grid h-screen place-content-center p-4">
      <h1 className="my-5 text-center text-3xl">{props.title}</h1>
      <div className="grid place-content-center">{props.children}</div>
    </div>
  </section>
)
export default AuthContainer;