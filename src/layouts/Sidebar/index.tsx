import { useLocation } from 'react-router';
import Currency from '../Header/RightHeader/Currency';
import Language from '../Header/RightHeader/Language';
import * as Styles from './styles';

import { AiOutlineClose } from 'react-icons/ai';

const Sidebar = ({ onClose }: { onClose: () => void }) => {
  const location = useLocation();

  return (
    <Styles.SidebarWrapper>
      <Styles.SidebarCloseIcon onClick={onClose}>
        <AiOutlineClose />
      </Styles.SidebarCloseIcon>
      <Styles.SidebarNav>
        <Styles.SidebarNavItem>
          <Styles.SidebarNavItemLink
            $isActive={location.pathname.split('/')[1] === ''}
            href="/"
          >
            Home
          </Styles.SidebarNavItemLink>
        </Styles.SidebarNavItem>
        <Styles.SidebarNavItem>
          <Styles.SidebarNavItemLink
            $isActive={location.pathname.split('/')[1] === 'search'}
            href="/search"
          >
            Tour Search
          </Styles.SidebarNavItemLink>
        </Styles.SidebarNavItem>
      </Styles.SidebarNav>
      <Styles.SidebarTranferAction>
        <Currency color="white" bgColor="white" />
        <Language />
      </Styles.SidebarTranferAction>
    </Styles.SidebarWrapper>
  );
};

export default Sidebar;
