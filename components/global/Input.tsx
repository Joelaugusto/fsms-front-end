import { useField } from 'formik'

const Input = ({label, ...props}: any) => {

  const [field, meta] = useField(props)
  
  switch (props.type) {
    case 'text':
    case 'password':
    case 'email':
    case 'number':
    case 'tel':
    case 'url':
    case 'search': {
      return (
        <div className="my-2 mb-4 grid">
          <label htmlFor={props.label} className="text-sm">
            {label}
          </label>
          <input
            {...field}
            {...props}
            className="my-1 rounded-md border border-emerald-400 p-2 text-sm"
          />
          {meta.touched && meta.error ? (
            <small className="h-1 text-red-500">{meta.error}</small>
          ) : (
            <small className="h-1"></small>
          )}
        </div>
      )
    }
    case 'select': {
      return (
        <div className="my-2 grid">
          <label htmlFor={label} className="text-sm">
            {label}
          </label>
          <select
            {...field}
            {...props}
            className="my-1 rounded-md border border-emerald-400 p-2 text-sm"
          >
            {props.options.map((option: string, index: number) => (
              <option key={index}>{option}</option>
            ))}
          </select>
          {meta.touched && meta.error ? (
            <small className="text-red-500">{meta.error}</small>
          ) : (
            <small></small>
          )}
        </div>
      )
    }
    case 'submit': {
      return (
        <button
          {...props}
          className="my-1 mt-4 flex h-10 w-full items-center justify-center gap-2 rounded-md border bg-emerald-400 p-2 text-sm text-gray-100"
        >
          {props.value}
          {props.icon}
        </button>
      )
    }
    case 'numberNonValidated': {
      return (
        <div className="my-2 mb-4 grid">
          <label htmlFor={props.label} className="text-sm">
            {label}
          </label>
          <input
            {...props}
            className="my-1 rounded-md border border-emerald-400 p-2 text-sm"
          />
        </div>
      )
    }
    default: {
      return <></>
    }
  }
}

export default Input
