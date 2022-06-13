import { useState } from 'react'

const Options = (props: { options: Array<String>, select: Function }) => {
  const [selected, setSelected] = useState(0)

  const components = props.options.map((option, index) => (
    <button
      className={index === selected ? 'text-emerald-700' : ''}
      onClick={(e) => {
        e.preventDefault()
        setSelected(index)
        props.select(index)
      }}
      key={index}
    >
      {option}
    </button>
  ))
  return <div className="flex justify-center gap-1">{components}</div>
}

export default Options
