import SideButton from "./SideButton";
import { FiSettings, FiUsers, FiUser, FiMapPin,FiMail } from 'react-icons/fi'

import { AiOutlineHome } from 'react-icons/ai'

const LeftSidebar = () => (
  <div>
    <SideButton icon={<AiOutlineHome size={20} />} text="Início" to="/" />
    {/* <SideButton icon={<FiInfo size={20} />} text="Anúncios" to="/" /> */}
    <SideButton
      icon={<FiMail size={20} />}
      text="Mensagens"
      to="/messages"
    />
    <SideButton
      icon={<FiMapPin size={20} />}
      text="Cadeia de suplementos"
      to="/supply-chain"
    />
    <SideButton
      icon={<FiUsers size={20} />}
      text="Grupos"
      to="/groups"
    />
    <SideButton icon={<FiUser size={20} />} text="Perfil" to="/account" />
    <SideButton
      icon={<FiSettings size={20} />}
      text="Definições"
      to="/settings"
    />
  </div>
)

export default LeftSidebar;