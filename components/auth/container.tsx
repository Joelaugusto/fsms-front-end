import Head from "next/head";
import Image from "next/image";
import pic from "../../public/pictures/auth.jpg";

const AuthContainer = (props: any) => (
  <section className="grid overflow-hidden md:grid-cols-7">
    <Head>
      <title>{props.title}</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <div className="col-span-3 hidden h-screen bg-emerald-400 md:grid">
      <Image src={pic} className="h-screen" />
    </div>
    <div className="md:col-span-4 grid h-screen md:place-content-center overflow-y-auto">
      <h1 className="my-5 text-center text-3xl">{props.title}</h1>
      <div className="grid p-4">{props.children}</div>
    </div>
  </section>
)
export default AuthContainer;