import { MdDeleteForever } from "react-icons/md";
import api from "../../../utils/api";


const Ads = (props: {id: number, title: string, date: string, views: string, user: string, userImage: string }) => {


  const handleDeleteAds = (e: any ) => {
    e.preventDefault();

    api.delete('/ads/'+props.id);

  }

  return (
    <div className="h-90 rounded-md bg-gradient-to-r from-emerald-600 to-emerald-400	 px-10 pb-10 pt-5">
      <button className="flex w-full flex-row-reverse" onClick={handleDeleteAds}>
        <MdDeleteForever className="text-red-500" size={27}/>
      </button>
      <p className="cursor-pointer text-3xl font-thin text-indigo-50">
        {props.title}
      </p>

      <div className="mt-4 flex items-center space-x-4">
        <img
          className="h-10 w-10 cursor-pointer rounded-full"
          alt="User Image"
          src={props.userImage}
        />
        <div>
          <h3 className="cursor-pointer font-semibold text-indigo-50">
            {props.user}
          </h3>
          <p className="text-sm font-thin text-indigo-50">
            {props.views} • {props.date}
          </p>
        </div>
      </div>
    </div>
  )
}


export default Ads;