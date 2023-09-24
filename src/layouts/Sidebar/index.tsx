import Currency from '../Header/RightHeader/Currency';
import Language from '../Header/RightHeader/Language';
import * as Styles from './styles';

import { AiOutlineClose } from 'react-icons/ai';

const Sidebar = ({ onClose }: { onClose: () => void }) => {
  return (
    <Styles.SidebarWrapper>
      <Styles.SidebarCloseIcon onClick={onClose}>
        <AiOutlineClose></AiOutlineClose>
      </Styles.SidebarCloseIcon>
      <Styles.SidebarNav>
        <Styles.SidebarNavItem>
          <Styles.SidebarNavItemLink isactive={1}>
            Home
          </Styles.SidebarNavItemLink>
        </Styles.SidebarNavItem>
        <Styles.SidebarNavItem>
          <Styles.SidebarNavItemLink>Tour List</Styles.SidebarNavItemLink>
        </Styles.SidebarNavItem>
        <Styles.SidebarNavItem>
          <Styles.SidebarNavItemLink>Tour Search</Styles.SidebarNavItemLink>
        </Styles.SidebarNavItem>
      </Styles.SidebarNav>
      <Styles.SidebarTranferAction>
        <Currency color="white" bgColor="white"></Currency>
        <Language></Language>
      </Styles.SidebarTranferAction>
    </Styles.SidebarWrapper>
  );
};

export default Sidebar;
