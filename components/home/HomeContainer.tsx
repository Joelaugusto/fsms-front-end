import LeftSidebar from "./leftSidebar";
import Navbar from "./navbar";

const HomeContainer = (props: {user: any, onSearch:Function, children:any}) => { 
    return (
    <div className="flex">
      <div className="hidden h-screen w-2/5 border-r bg-white md:flex md:w-1/4">
        <div className="mx-auto py-10">
          <h1 className="mb-10 cursor-pointer text-2xl font-bold text-emerald-400 duration-150">
            GCSA
          </h1>
          <LeftSidebar />
        </div>
      </div>
      <main className="min-h-screen w-full bg-white">
        <Navbar user={props.user} onSearch={props.onSearch} showSearchBox={true} />
        <div className="h-[calc(100vh-115px)] overflow-auto">
          {props.children}
        </div>
      </main>
    </div>
    )
}

export default HomeContainer;