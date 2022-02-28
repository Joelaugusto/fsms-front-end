import Link from 'next/link'
import { ReactElement } from 'react'

const SideButton = (props: {text: string, icon: ReactElement, to: string}) => (
  <Link href={props.to}>
    <li className="mt-10 flex cursor-pointer space-x-2 duration-150 hover:text-emerald-400">
      {props.icon}
      <span className="font-semibold">{props.text}</span>
    </li>
  </Link>
)

export default SideButton
