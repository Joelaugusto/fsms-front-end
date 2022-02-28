import {useState} from 'react'


const Options = (props : {options: Array<String>, select: Function}) => {

  const [selected, setSelected] = useState(0)

  const components = props.options.map(
    (option, index) =>
     <button
      className={index === selected ? "text-indigo-700" : undefined}
      onClick={() => {
        setSelected(index)
        props.select(index)
        }
      } 
      key={index}>{option}
    </button>
    )
  return (
    <div className="flex gap-1 justify-center">{components}</div>
  );
}

export default Options;