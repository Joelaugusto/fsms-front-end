import SideButton from "./SideButton";
import { FiSettings, FiUsers, FiUser, FiMapPin,FiMail } from 'react-icons/fi'

import { AiOutlineHome } from 'react-icons/ai'

const LeftSidebar = () => (
  <div>
    <SideButton icon={<AiOutlineHome size={26} />} text="Início" to="/" />
    {/* <SideButton icon={<FiInfo size={26} />} text="Anúncios" to="/" /> */}
    <SideButton
      icon={<FiMail size={26} />}
      text="Mensagens"
      to="/messages"
    />
    <SideButton
      icon={<FiMapPin size={26} />}
      text="Cadeia de suplementos"
      to="/supply-chain"
    />
    <SideButton
      icon={<FiUsers size={26} />}
      text="Grupos"
      to="/groups"
    />
    <SideButton icon={<FiUser size={26} />} text="Perfil" to="/account" />
    <SideButton
      icon={<FiSettings size={26} />}
      text="Definições"
      to="/settings"
    />
  </div>
)

export default LeftSidebar;