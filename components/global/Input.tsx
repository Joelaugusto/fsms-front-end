import { useState } from "react"


const Input = (props: any) => {


  const [visited, setVisited] = useState(false)
  

  switch(props.type) {
    case 'text':
    case 'password': 
    case 'email': 
    case 'number': 
    case 'tel': 
    case 'url': 
    case 'search':{
      return (
        <div className="my-2 flex w-96 flex-col">
          <label>{props.label}</label>
          <input
            {...props}
            className="my-1 rounded-md border border-emerald-400 p-3" onBlur={()=> setVisited(true) }
          />
          {!props.validated  && visited? <small className="text-red-500">{props.error}</small> : null}
        </div>
      )
    }
    case 'submit': {
      return (
        <div className="my-2 flex w-96 flex-col">
          <button
            {...props}
            className="my-1 rounded-md border bg-emerald-400 p-3 text-gray-100 flex items-center justify-center gap-2"
          >
            {props.value}
            {props.icon}
          </button>
        </div>
      )
    }
    default: {
      return (<></>)
    }
      
    }
  }
  
export default Input;