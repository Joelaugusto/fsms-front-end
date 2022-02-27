const Stepper = (props: {
  current: Number
  total: Number
  setStep: Function
}) => {
  const components = []
  for (let i = 0; i < props.total; i++) {
    if (i === props.current) {
      components.push(
        <button
          onClick={() => props.setStep(i)}
          className="h-1.5 w-5 rounded-md bg-emerald-400"
        ></button>
      )
    } else {
      components.push(
        <button
          onClick={() => props.setStep(i)}
          className="h-1.5 w-1.5 rounded-md border-none bg-emerald-200"
        ></button>
      )
    }
  }

  return <div className="flex gap-5 justify-center">{components}</div>
}

export default Stepper
