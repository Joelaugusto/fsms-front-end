import { useState } from 'react'

const Input = (props: any) => {
  const [visited, setVisited] = useState(false)

  switch (props.type) {
    case 'text':
    case 'password':
    case 'email':
    case 'number':
    case 'tel':
    case 'url':
    case 'search': {
      return (
        <div className="my-2 grid">
          <label className="text-sm">{props.label}</label>
          <input
            {...props}
            className="my-1 rounded-md border border-emerald-400 p-2 text-sm"
            onBlur={() => setVisited(true)}
          />
          <small className="text-red-500">{props.error}</small>
        </div>
      )
    }
    case 'select': {
      return (
        <div className="my-2 grid">
          <label className="text-sm">{props.label}</label>
          <select
            {...props}
            className="my-1 rounded-md border border-emerald-400 p-2 text-sm"
            onBlur={() => setVisited(true)}
          >
            {props.options.map((option: string, index: number) => (
              <option key={index}>{option}</option>
            ))}
          </select>
            <small className="text-red-500">{props.error}</small>
        </div>
      )
    }
    case 'submit': {
      return (
        <div className="my-2 grid">
          <button
            type="submit"
            {...props}
            className="disabled:cursor-wait my-1 flex items-center justify-center gap-2 rounded-md border bg-emerald-400 p-2 text-sm text-gray-100"
          >
            {props.value}
            {props.icon}
          </button>
        </div>
      )
    }
    default: {
      return <></>
    }
  }
}

export default Input
