const Stepper = (props: {
  current: Number
  total: Number
  setStep: Function
}) => {
  const components = []
  for (let i = 0; i < props.total; i++) {
    if (i === props.current) {
      components.push(
        <div
          // onClick={() => props.setStep(i)}
          className="h-1.5 w-5 rounded-md bg-emerald-400"
          key={i}
        ></div>
      )
    } else {
      components.push(
        <div
          // onClick={() => props.setStep(i)}
          className="h-1.5 w-1.5 rounded-md border-none bg-emerald-200"
          key={i}
        ></div>
      )
    }
  }
  return <div className="flex gap-1 justify-center mt-10 mb-4">{components}</div>
}
export default Stepper
